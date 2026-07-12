/**
 * HPOE HARDWARE CLASSIFIER
 * Pure, side-effect-free tier heuristics — extracted from components/HPOE.tsx
 * so the matrix can be unit-tested in Node without a DOM.
 *
 * Longevity strategy (designed to stay correct for the next 10-15 years):
 *  1. Model numbers are PARSED NUMERICALLY with open-ended upper bounds instead
 *     of enumerated (RTX 6090, RX 10800, Apple M12, Adreno X3, Xclipse 1040 and
 *     other future parts classify correctly without a code change).
 *  2. Every vendor family has a "masked / unrecognised model" branch that falls
 *     back to capability signals (cores, texture limits, WebGL2) — browsers
 *     increasingly scrub model numbers for privacy.
 *  3. Fully unknown vendors are scored by a CAPABILITY PROBE rather than being
 *     written off: a 2035 GPU whose brand name no regex knows still lands on
 *     the tier its measured limits deserve.
 *  4. The FPS watchdog in HPOE.tsx remains the runtime source of truth — any
 *     optimistic call made here is corrected live if real frames disagree.
 */

export type HPOETier = "high" | "mid" | "low" | "very-low";

export type GPUKind = "Discrete" | "Integrated" | "Mobile" | "Software/Virtual" | "Unknown";
export type FormFactor = "Desktop" | "Laptop" | "Mobile" | "Virtual" | "Unknown";
export type CPUClass = "Performance" | "Mainstream" | "Entry" | "Unknown";
export type GPUClassEstimate = "High-End" | "Mid-Range" | "Budget/Legacy" | "Unknown";

export interface HardwareSpecs {
  vendor: string;
  architecture: string;
  type: GPUKind;
  estimatedClass: GPUClassEstimate;
  /** Physical chassis the GPU most likely lives in (renderer-string heuristic). */
  formFactor: FormFactor;
  /** Rough CPU bracket from logical core count. */
  cpuClass: CPUClass;
}

export interface HardwareSignals {
  /** Raw WebGL renderer string (any casing, ANGLE noise allowed). */
  renderer: string;
  coreCount: number;
  /** navigator.deviceMemory in GB — Chrome caps reporting at 8; Safari/Firefox omit it (caller defaults to 4). */
  memory: number;
  maxTextureSize: number;
  webgl2: boolean;
  isMobileDevice: boolean;
}

export interface ClassificationResult {
  specs: HardwareSpecs;
  tier: HPOETier;
  normalizedRenderer: string;
}

/** Strip trademarks, PCI device ids and ANGLE noise that break rigid matching. */
export function normalizeRenderer(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/\((r|tm|c)\)/g, "")
    .replace(/\(0x[0-9a-f]+\)/g, "")
    .replace(/graphics/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

const toInt = (m: RegExpMatchArray | null, group = 1): number =>
  m && m[group] ? parseInt(m[group], 10) : 0;

/** Renderer-string hints that the part is a laptop/mobile-workstation variant. */
const LAPTOP_HINTS = /(laptop|max-q|notebook|mobility|\bmobile\b)/;
/** Trailing M/S model suffixes: GTX 970M, RX 6800S, Radeon 780M, MX550 ... */
const LAPTOP_SUFFIX = /\b\d{3,4}[ms]\b|\bmx\s*\d{3}\b/;

function classifyCPU(coreCount: number): CPUClass {
  if (coreCount >= 12) return "Performance";
  if (coreCount >= 6) return "Mainstream";
  if (coreCount >= 1) return "Entry";
  return "Unknown";
}

interface VendorVerdict {
  vendor: string;
  architecture: string;
  type: GPUKind;
  estimatedClass: GPUClassEstimate;
  tier: HPOETier;
}

// ---------------------------------------------------------
// 0. SOFTWARE RASTERIZERS & VIRTUAL MACHINES
// Blur/refraction stacks on a CPU rasterizer or a virtualized GPU are
// brutal regardless of the host silicon — always flat-render territory.
// ---------------------------------------------------------
function matchSoftwareOrVirtual(r: string): VendorVerdict | null {
  if (/(swiftshader|llvmpipe|softpipe|lavapipe|software rasterizer|microsoft basic render|virgl|virtio|vmware|svga3d|virtualbox|parallels)/.test(r)) {
    return {
      vendor: "Software / Virtual Machine",
      architecture: "CPU Rasterizer / Virtualized GPU",
      type: "Software/Virtual",
      estimatedClass: "Budget/Legacy",
      tier: "low",
    };
  }
  return null;
}

// ---------------------------------------------------------
// 1. APPLE SILICON & A-SERIES
// ---------------------------------------------------------
function matchApple(r: string, s: HardwareSignals): VendorVerdict | null {
  if (!r.includes("apple")) return null;

  const mSeries = r.match(/\bm(\d{1,3})\b/); // M1 ... M999
  if (mSeries) {
    const generation = toInt(mSeries);
    // Pro/Max/Ultra of any generation, or any M5+ base die (a 2025+ base
    // M-chip outruns the discrete cards already rated high here).
    const highEnd = /(pro|max|ultra)/.test(r) || generation >= 5;
    return {
      vendor: "Apple",
      architecture: `M${generation}-Series Silicon`,
      type: "Integrated",
      estimatedClass: highEnd ? "High-End" : "Mid-Range",
      tier: highEnd ? "high" : "mid",
    };
  }

  // A-series iPhone/iPad silicon with a visible generation number — open-ended
  // so A20/A21+ keep classifying. (Phone verdicts are capped to mid by the
  // thermal fail-safe in HPOE.tsx; the mid/low boundary is what matters here.)
  const aSeries = r.match(/\ba(\d{1,2})x?\b/);
  if (aSeries) {
    const generation = toInt(aSeries);
    const cls: GPUClassEstimate = generation >= 14 ? "High-End" : generation >= 10 ? "Mid-Range" : "Budget/Legacy";
    return {
      vendor: "Apple",
      architecture: `A${generation}-Series Silicon`,
      type: "Mobile",
      estimatedClass: cls,
      tier: generation >= 14 ? "high" : generation >= 10 ? "mid" : "low",
    };
  }

  // Fully masked "Apple GPU" (modern Safari reports nothing else — capability
  // signals are all we get).
  if (s.coreCount >= 6 && s.maxTextureSize >= 8192) {
    return { vendor: "Apple", architecture: "A-Series / Masked Apple Silicon", type: "Mobile", estimatedClass: "High-End", tier: "high" };
  }
  return { vendor: "Apple", architecture: "A-Series Silicon", type: "Mobile", estimatedClass: "Mid-Range", tier: "mid" };
}

// ---------------------------------------------------------
// 2. NVIDIA — DESKTOP, LAPTOP & DATA CENTER
// ---------------------------------------------------------
function matchNvidia(r: string): VendorVerdict | null {
  if (!/(nvidia|geforce|quadro|\btesla\b|\bnvs\b)/.test(r)) return null;
  const V = "NVIDIA";

  // Data-center / cloud-gaming silicon (VDI streams, cloud desktops): Tesla,
  // GRID and the Axx/Hxx/Lxx accelerators are modern, fast parts.
  if (/\b(tesla|grid)\b/.test(r) || /\b(t4|a10g?|a16|a40|a100|h100|h200|l4|l40s?|b100|b200|gb200)\b/.test(r)) {
    return { vendor: V, architecture: "Data Center / Cloud GPU", type: "Discrete", estimatedClass: "High-End", tier: "high" };
  }
  // RTX consumer & workstation — open-ended: 2060 ... 5090, 6090, five-digit futures.
  if (/rtx\s*\d{4,5}/.test(r) || /titan/.test(r)) {
    return { vendor: V, architecture: "RTX (Turing → Blackwell → future)", type: "Discrete", estimatedClass: "High-End", tier: "high" };
  }
  // RTX A-series pro cards: A2000+ are workstation-class, A500/A1000 are laptop entry parts.
  const rtxA = r.match(/rtx\s*a(\d{3,4})/);
  if (rtxA) {
    const highEnd = toInt(rtxA) >= 2000;
    return { vendor: V, architecture: "RTX A-Series (Professional)", type: "Discrete", estimatedClass: highEnd ? "High-End" : "Mid-Range", tier: highEnd ? "high" : "mid" };
  }
  if (/gtx\s*(?:10[6-9]\d|16[5-9]\d|9[8-9]\d)/.test(r)) {
    return { vendor: V, architecture: "GTX High/Mid", type: "Discrete", estimatedClass: "High-End", tier: "high" };
  }
  if (/gtx\s*(?:1050|970|960|950|780)/.test(r)) {
    return { vendor: V, architecture: "GTX Legacy Mid", type: "Discrete", estimatedClass: "Mid-Range", tier: "mid" };
  }
  if (/gtx\s*[4-6]\d{2}/.test(r) || /\bgt\s*\d+/.test(r) || /\b[7-9][1-4]0m\b/.test(r) || /\bmx\s*\d{3}\b/.test(r) || /\bnvs\b/.test(r)) {
    return { vendor: V, architecture: "Legacy / Low-End Mobile (GT/MX/NVS)", type: "Discrete", estimatedClass: "Budget/Legacy", tier: "low" };
  }
  // Unrecognised model (masked string, non-RTX Quadro, or a future brand rename).
  return { vendor: V, architecture: "Unknown NVIDIA", type: "Discrete", estimatedClass: "Mid-Range", tier: "mid" };
}

// ---------------------------------------------------------
// 3. AMD RADEON — DESKTOP, LAPTOP dGPU, APU & DATA CENTER
// ---------------------------------------------------------
function matchAmd(r: string, s: HardwareSignals): VendorVerdict | null {
  if (!/(amd|radeon|firepro|\bati\b)/.test(r)) return null;
  const V = "AMD";

  if (/radeon\s*pro\b/.test(r) || /\binstinct\b/.test(r)) {
    return { vendor: V, architecture: "Radeon Pro / Instinct (Professional)", type: "Discrete", estimatedClass: "High-End", tier: "high" };
  }
  // RX with a 4-5 digit model: 5000-series (RDNA) onward is high — covers
  // RX 9070 (RDNA4) and future RX 10000+ without a code change.
  // No trailing boundary: laptop suffixes attach directly (RX 7700S, RX 6800M).
  const rx4 = r.match(/\brx\s*(\d{4,5})/);
  if (rx4) {
    const highEnd = toInt(rx4) >= 5000;
    return { vendor: V, architecture: highEnd ? "RDNA (RX 5000 → future)" : "RX 4-Digit Legacy", type: "Discrete", estimatedClass: highEnd ? "High-End" : "Mid-Range", tier: highEnd ? "high" : "mid" };
  }
  if (/vega\s*(?:56|64)/.test(r)) {
    return { vendor: V, architecture: "High-End Vega", type: "Discrete", estimatedClass: "High-End", tier: "high" };
  }
  if (/\brx\s*(?:4\d{2}|5[7-9]\d)/.test(r)) {
    return { vendor: V, architecture: "Polaris", type: "Discrete", estimatedClass: "Mid-Range", tier: "mid" };
  }
  // Modern RDNA APUs: Radeon 660M-690M, 760M-780M, 860M-890M (and the same
  // pattern for future generations) — strong laptop iGPUs, solid mid tier.
  if (/\b[6-9][6-9]0m\b/.test(r)) {
    return { vendor: V, architecture: "Modern RDNA APU", type: "Integrated", estimatedClass: "Mid-Range", tier: "mid" };
  }
  // Steam Deck / console-class semi-custom silicon ("AMD Custom GPU 0405").
  if (/custom gpu/.test(r)) {
    return { vendor: V, architecture: "Semi-Custom RDNA APU (Console-Class)", type: "Integrated", estimatedClass: "Mid-Range", tier: "mid" };
  }
  // Masked modern APU: many Ryzen laptops report just "AMD Radeon" with no
  // model digits. If the platform signals are modern, that's a capable iGPU.
  if (!/\d/.test(r) && s.webgl2 && s.coreCount >= 8 && s.maxTextureSize >= 16384) {
    return { vendor: V, architecture: "Modern Ryzen APU (Masked)", type: "Integrated", estimatedClass: "Mid-Range", tier: "mid" };
  }
  return { vendor: V, architecture: "Legacy GCN or Budget APU", type: "Integrated", estimatedClass: "Budget/Legacy", tier: "low" };
}

// ---------------------------------------------------------
// 4. INTEL — ARC DISCRETE, XE iGPU & LEGACY
// Intel WebGL drivers remain unreliable under complex CSS blur stacks, so
// Arc caps at mid; the watchdog promotes nothing and demotes if needed.
// ---------------------------------------------------------
function matchIntel(r: string, s: HardwareSignals): VendorVerdict | null {
  if (!r.includes("intel")) return null;
  const V = "Intel";

  // Arc discrete — A (Alchemist), B (Battlemage) and future letter series —
  // plus Arc-branded iGPUs (130V/140V Lunar Lake) and Xe2/Xe3 marketing names.
  if (/\barc\b/.test(r) || /(battlemage|alchemist|celestial|druid|xe[2-9])/.test(r)) {
    const integrated = /arc\s*\d{2,3}v\b/.test(r) || !/arc\s*(pro\s*)?[a-z]?\d{3}/.test(r);
    return { vendor: V, architecture: "Arc / Xe-HPG", type: integrated ? "Integrated" : "Discrete", estimatedClass: "Mid-Range", tier: "mid" };
  }
  if ((r.includes("iris") && r.includes("xe")) || /iris\s*(?:plus|pro)/.test(r)) {
    return { vendor: V, architecture: "Iris Xe/Plus", type: "Integrated", estimatedClass: "Mid-Range", tier: "mid" };
  }
  // Masked modern Intel iGPU: bare "Intel" with no family token on a clearly
  // modern platform. Legacy HD/UHD strings still fall through to low.
  if (!/(\bhd\b|\buhd\b|iris|gma|\bq\d{2}\b)/.test(r) && !/\d/.test(r) && s.webgl2 && s.coreCount >= 8 && s.maxTextureSize >= 16384) {
    return { vendor: V, architecture: "Modern Intel iGPU (Masked)", type: "Integrated", estimatedClass: "Mid-Range", tier: "mid" };
  }
  return { vendor: V, architecture: "UHD / HD Legacy", type: "Integrated", estimatedClass: "Budget/Legacy", tier: "low" };
}

// ---------------------------------------------------------
// 5. QUALCOMM ADRENO / SNAPDRAGON (ANDROID & ARM PC)
// ---------------------------------------------------------
function matchQualcomm(r: string, s: HardwareSignals): VendorVerdict | null {
  if (!/(adreno|snapdragon|qualcomm)/.test(r)) return null;
  const V = "Qualcomm";
  const mobileType: GPUKind = s.isMobileDevice ? "Mobile" : "Integrated";

  // ARM PC silicon: Snapdragon X Elite/Plus (and X2+), Adreno X1/X2/X... GPUs.
  if (/snapdragon x/.test(r) || /x elite|x plus/.test(r) || /adreno\s*x\d/.test(r)) {
    return { vendor: V, architecture: "Snapdragon X Series (ARM PC)", type: "Integrated", estimatedClass: "High-End", tier: "high" };
  }
  const series = toInt(r.match(/adreno\s*(\d{3,4})/));
  if (series >= 900) {
    // 3-digit 900+ and any future 4-digit numbering.
    return { vendor: V, architecture: `Adreno ${series} (Next-Gen)`, type: mobileType, estimatedClass: "High-End", tier: "high" };
  }
  if (series >= 800 || r.includes("snapdragon 8 elite") || r.includes("elite")) {
    return { vendor: V, architecture: series ? `Adreno ${series}` : "Snapdragon 8 Elite Flagship", type: mobileType, estimatedClass: "High-End", tier: "high" };
  }
  if (series >= 730 || r.includes("snapdragon 8 gen")) {
    return { vendor: V, architecture: series ? `Adreno ${series}` : "Snapdragon 8 Gen Flagship", type: mobileType, estimatedClass: "High-End", tier: "high" };
  }
  if (series >= 650 || r.includes("snapdragon 8") || r.includes("snapdragon 7") || /snapdragon\s*6\b/.test(r)) {
    return { vendor: V, architecture: series ? `Adreno ${series}` : "Snapdragon 6/7/8 Series", type: mobileType, estimatedClass: "Mid-Range", tier: "mid" };
  }
  // Entry Snapdragon 2/4 series — must precede the generic masked branch.
  if (/snapdragon\s*[24]\b/.test(r)) {
    return { vendor: V, architecture: "Snapdragon 2/4 Series (Entry)", type: mobileType, estimatedClass: "Budget/Legacy", tier: "low" };
  }
  if ((series === 0 && s.coreCount >= 8 && s.maxTextureSize >= 8192) || r.includes("snapdragon")) {
    // Browser scrubbed the Adreno number, but 8 cores + heavy texture support
    // means a modern Snapdragon.
    return { vendor: V, architecture: "Modern Adreno/Snapdragon (Masked)", type: mobileType, estimatedClass: "Mid-Range", tier: "mid" };
  }
  return { vendor: V, architecture: `Adreno ${series || "Legacy"}`, type: mobileType, estimatedClass: "Budget/Legacy", tier: "low" };
}

// ---------------------------------------------------------
// 6. ARM MALI / IMMORTALIS (MOBILE & ARM DESKTOP)
// ---------------------------------------------------------
function matchMali(r: string, s: HardwareSignals): VendorVerdict | null {
  if (!/(mali|immortalis)/.test(r)) return null;
  const V = "ARM";
  const type: GPUKind = s.isMobileDevice ? "Mobile" : "Integrated";

  // Immortalis (any), 2025+ "G1-Ultra/Premium" naming, and Valhall flagships.
  if (/immortalis/.test(r) || /g1[\s-]?(ultra|premium)/.test(r) || /g[7-9][1-9]\d\b/.test(r) || /g7[7-9]\b/.test(r)) {
    return { vendor: V, architecture: "Mali Valhall / Immortalis Flagship", type, estimatedClass: "High-End", tier: "high" };
  }
  // Valhall mid-range: G610/G615/G625 (Dimensity 8000-class), and G57/G68
  // when configured with 4+ shader cores (MC4 and up handle mid-tier fine).
  const valhallEntryCores = toInt(r.match(/g(?:57|68)\s*mc(\d+)/));
  if (/g1[\s-]?pro\b/.test(r) || /g[7-9]\d\b/.test(r) || /\bg6[12][05]\b/.test(r) || valhallEntryCores >= 4) {
    return { vendor: V, architecture: "Mali Valhall / Bifrost Upper", type, estimatedClass: "Mid-Range", tier: "mid" };
  }
  return { vendor: V, architecture: "Legacy Mali / Budget G-Series", type, estimatedClass: "Budget/Legacy", tier: "low" };
}

// ---------------------------------------------------------
// 7. IMAGINATION POWERVR / IMG (OLDER IOS, MEDIATEK, AUTO)
// ---------------------------------------------------------
function matchPowerVR(r: string): VendorVerdict | null {
  if (!/(powervr|\bimg\s*[abd]x|bxm|bxs|bxt|axt|axm|\bdxt\b|dxt-)/.test(r)) return null;
  // AXT/BXT/DXT are Imagination's flagship lines (incl. Google Tensor G5's DXT).
  if (/\b[abd]xt\b|[abd]xt-/.test(r)) {
    return { vendor: "Imagination Technologies", architecture: "PowerVR AXT/BXT/DXT (Flagship)", type: "Mobile", estimatedClass: "Mid-Range", tier: "mid" };
  }
  return { vendor: "Imagination Technologies", architecture: "PowerVR Rogue/SGX/AXM/BXM", type: "Mobile", estimatedClass: "Budget/Legacy", tier: "low" };
}

// ---------------------------------------------------------
// 8. SAMSUNG XCLIPSE / EXYNOS
// ---------------------------------------------------------
function matchSamsung(r: string, s: HardwareSignals): VendorVerdict | null {
  if (!/(xclipse|exynos)/.test(r)) return null;
  const V = "Samsung";

  const xclipse = r.match(/xclipse\s*(\d{3,4})/);
  if (r.includes("xclipse")) {
    const series = toInt(xclipse);
    const flagship = series >= 920;
    return { vendor: V, architecture: `Xclipse ${series || ""} (RDNA${flagship ? " Flagship" : ""})`.replace("  ", " ").trim(), type: "Mobile", estimatedClass: flagship ? "High-End" : "Mid-Range", tier: flagship ? "high" : "mid" };
  }
  if (s.coreCount >= 8 && s.maxTextureSize >= 8192) {
    return { vendor: V, architecture: "Exynos Flagship", type: "Mobile", estimatedClass: "High-End", tier: "high" };
  }
  return { vendor: V, architecture: "Exynos Legacy/Masked", type: "Mobile", estimatedClass: "Budget/Legacy", tier: "low" };
}

// ---------------------------------------------------------
// 9. MEDIATEK (DIMENSITY / HELIO / GENIO)
// ---------------------------------------------------------
function matchMediaTek(r: string, s: HardwareSignals): VendorVerdict | null {
  if (!/(mediatek|dimensity|helio|genio)/.test(r)) return null;
  const V = "MediaTek";

  // Numeric parse keeps future five-digit Dimensity flagships classified.
  const dimensity = toInt(r.match(/dimensity\s*(\d{4,5})/));
  if (dimensity >= 8000 || /dimensity\s*[89]\d{3}/.test(r)) {
    return { vendor: V, architecture: "Dimensity 8000/9000+ Flagship", type: "Mobile", estimatedClass: "High-End", tier: "high" };
  }
  if (r.includes("dimensity") || /helio\s*g(9\d|1\d{2})/.test(r) || (s.coreCount >= 8 && s.maxTextureSize >= 8192)) {
    return { vendor: V, architecture: "Dimensity / High-End Helio", type: "Mobile", estimatedClass: "Mid-Range", tier: "mid" };
  }
  return { vendor: V, architecture: "Helio Legacy / Entry SoC", type: "Mobile", estimatedClass: "Budget/Legacy", tier: "low" };
}

// ---------------------------------------------------------
// 10. OTHER MOBILE / EMBEDDED / REGIONAL VENDORS
// ---------------------------------------------------------
function matchOtherVendors(r: string, s: HardwareSignals): VendorVerdict | null {
  // Huawei Kirin (Maleoon GPU since Kirin 9000s).
  if (/(maleoon|kirin)/.test(r)) {
    const modern = /maleoon/.test(r) || (s.coreCount >= 8 && s.maxTextureSize >= 8192);
    return { vendor: "Huawei", architecture: modern ? "Kirin / Maleoon (Modern)" : "Kirin Legacy", type: "Mobile", estimatedClass: modern ? "Mid-Range" : "Budget/Legacy", tier: modern ? "mid" : "low" };
  }
  // Google Tensor (only visible when the GPU string is masked to the SoC brand;
  // normally the Mali/PowerVR renderer name is reported and matched earlier).
  if (/\btensor\s*g?\d/.test(r) || /google tensor/.test(r)) {
    return { vendor: "Google", architecture: "Tensor (Pixel Flagship)", type: "Mobile", estimatedClass: "High-End", tier: "high" };
  }
  // Xiaomi XRING (2025+ in-house flagship SoC, Immortalis-class GPU).
  if (/xring/.test(r)) {
    return { vendor: "Xiaomi", architecture: "XRING Flagship", type: "Mobile", estimatedClass: "High-End", tier: "high" };
  }
  if (/(unisoc|spreadtrum|tigert)/.test(r)) {
    // Modern 5G T-series (T76x/T8xx/T9xx) are competent budget-mid silicon.
    const modernT = /\bt(7[6-9]\d|[89]\d{2})\b/.test(r);
    return { vendor: "Unisoc", architecture: modernT ? "Unisoc T-Series 5G" : "Unisoc / Spreadtrum", type: "Mobile", estimatedClass: modernT ? "Mid-Range" : "Budget/Legacy", tier: modernT ? "mid" : "low" };
  }
  // Broadcom / Raspberry Pi.
  if (/(videocore|\bv3d\b|broadcom|raspberry)/.test(r)) {
    if (/v3d\s*[4-9]/.test(r) || /videocore\s*(vi{1,2}|[4-9])/.test(r)) {
      // Pi 4/5 (and future Pi revisions) are capable but struggle with heavy blur.
      return { vendor: "Broadcom", architecture: "VideoCore VI+ (Raspberry Pi 4/5+)", type: "Integrated", estimatedClass: "Budget/Legacy", tier: "low" };
    }
    return { vendor: "Broadcom", architecture: "VideoCore IV/V (Raspberry Pi Legacy)", type: "Integrated", estimatedClass: "Budget/Legacy", tier: "very-low" };
  }
  // Chinese discrete GPUs (Moore Threads MTT S-series) — real desktop cards,
  // immature WebGL drivers: mid at best.
  if (/(moore threads|\bmtt\b)/.test(r)) {
    return { vendor: "Moore Threads", architecture: "MTT Discrete", type: "Discrete", estimatedClass: "Mid-Range", tier: "mid" };
  }
  // Embedded / regional silicon: consistently entry-level for this workload.
  if (/(vivante|verisilicon|zhaoxin|loongson|jingjia|innosilicon)/.test(r)) {
    return { vendor: "Embedded / Regional", architecture: "Embedded-Class GPU", type: "Integrated", estimatedClass: "Budget/Legacy", tier: "low" };
  }
  return null;
}

// ---------------------------------------------------------
// 11. CAPABILITY PROBE — UNKNOWN VENDOR FALLBACK
// The future-proofing backstop: score unrecognised silicon by what it can
// measurably do. A masked or brand-new GPU is not automatically "low".
// ---------------------------------------------------------
function capabilityFallback(s: HardwareSignals): VendorVerdict {
  if (s.webgl2 && s.maxTextureSize >= 16384 && s.coreCount >= 8 && s.memory >= 8) {
    return { vendor: "Unknown", architecture: "Capability-Profiled (High)", type: "Unknown", estimatedClass: "High-End", tier: "high" };
  }
  if (s.webgl2 && s.maxTextureSize >= 8192 && s.coreCount >= 6 && s.memory >= 4) {
    return { vendor: "Unknown", architecture: "Capability-Profiled (Mid)", type: "Unknown", estimatedClass: "Mid-Range", tier: "mid" };
  }
  return { vendor: "Unknown", architecture: "Unknown (Fallback)", type: "Unknown", estimatedClass: "Budget/Legacy", tier: "low" };
}

function detectFormFactor(r: string, kind: GPUKind, isMobileDevice: boolean): FormFactor {
  if (kind === "Software/Virtual") return "Virtual";
  if (isMobileDevice || kind === "Mobile") return "Mobile";
  if (LAPTOP_HINTS.test(r) || LAPTOP_SUFFIX.test(r)) return "Laptop";
  if (kind === "Discrete") return "Desktop";
  return "Unknown";
}

// ---------------------------------------------------------
// MAIN CLASSIFIER
// Matchers run in specificity order; the first hit wins. Accessibility
// overrides, memory hard-limits and the mobile thermal cap stay in HPOE.tsx.
// ---------------------------------------------------------
export function classifyHardware(signals: HardwareSignals): ClassificationResult {
  const r = normalizeRenderer(signals.renderer);

  const verdict =
    matchSoftwareOrVirtual(r) ??
    matchApple(r, signals) ??
    matchNvidia(r) ??
    matchAmd(r, signals) ??
    matchIntel(r, signals) ??
    matchQualcomm(r, signals) ??
    matchMali(r, signals) ??
    matchPowerVR(r) ??
    matchSamsung(r, signals) ??
    matchMediaTek(r, signals) ??
    matchOtherVendors(r, signals) ??
    capabilityFallback(signals);

  const specs: HardwareSpecs = {
    vendor: verdict.vendor,
    architecture: verdict.architecture,
    type: verdict.type,
    estimatedClass: verdict.estimatedClass,
    formFactor: detectFormFactor(r, verdict.type, signals.isMobileDevice),
    cpuClass: classifyCPU(signals.coreCount),
  };

  return { specs, tier: verdict.tier, normalizedRenderer: r };
}

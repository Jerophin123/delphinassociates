"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useHPOE } from "../HPOE";

type Tone = "light" | "dark";
export type ArchVariant =
  | "surveyor"
  | "crane"
  | "truss"
  | "detail"
  | "campus"
  | "contours"
  | "settingout"
  | "portal"
  | "instruments"
  | "foundation"
  | "villa"
  | "axon"
  | "siteplan"
  | "floorplan"
  | "scaffold"
  | "locus"
  | "titleblock"
  | "sunpath"
  | "approved"
  | "section";

interface ArchPlansProps {
  /** Ground the drawing sits on: "light" = ink lines on paper, "dark" = white lines on ink */
  tone?: Tone;
  variant?: ArchVariant;
  className?: string;
}

/**
 * Decorative architectural / engineering line drawings for section backgrounds.
 * Seventeen unique compositions - one per sheet, never repeated.
 * Static SVG - zero animation cost, so it renders on high, mid AND low tiers.
 * Only very-low (flat mode) skips it.
 */
export default function ArchPlans({ tone = "light", variant = "campus", className = "" }: ArchPlansProps) {
  const { tier, reducedMotion } = useHPOE();
  const ref = useRef<HTMLDivElement>(null);
  const plot = tier === "high" && !reducedMotion;

  // High tier: the plot is scrubbed by scroll - the pen follows the reader.
  // Progress 0→1 maps onto the paused CSS draw/fade timeline via --arch-p.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.92", "end 0.4"], layoutEffect: false });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (plot) ref.current?.style.setProperty("--arch-p", v.toFixed(4));
  });

  // Layered depth drift: the vignette drawings float faster than the ghosted
  // underlay, like separated tracing overlays. High = full, mid = 65%.
  const driftFactor = reducedMotion ? 0 : tier === "high" ? 1 : tier === "mid" ? 0.65 : 0;
  const underlayY = useTransform(scrollYProgress, [0, 1], [26 * driftFactor, -26 * driftFactor]);
  const vignetteY = useTransform(scrollYProgress, [0, 1], [70 * driftFactor, -70 * driftFactor]);
  // Seed the plot for sheets already in view at load (no scroll yet)
  useEffect(() => {
    if (plot) ref.current?.style.setProperty("--arch-p", scrollYProgress.get().toFixed(4));
  }, [plot, scrollYProgress]);

  if (tier === "very-low") {
    return <div ref={ref} className="hidden" aria-hidden />;
  }

  const ink = tone === "light" ? "rgba(18,18,18,0.15)" : "rgba(255,255,255,0.14)";
  const inkFaint = tone === "light" ? "rgba(18,18,18,0.09)" : "rgba(255,255,255,0.075)";
  const gold = tone === "light" ? "rgba(156,123,30,0.35)" : "rgba(212,175,55,0.32)";
  const goldFaint = tone === "light" ? "rgba(156,123,30,0.2)" : "rgba(212,175,55,0.18)";
  // Ghost strokes for the full-section master-plan underlay
  const inkGhost = tone === "light" ? "rgba(18,18,18,0.055)" : "rgba(255,255,255,0.045)";
  const goldGhost = tone === "light" ? "rgba(156,123,30,0.12)" : "rgba(212,175,55,0.10)";

  const label = {
    fontFamily: "var(--font-montserrat), monospace",
    letterSpacing: "0.2em",
    fontWeight: 700,
  } as const;

  return (
    <div
      ref={ref}
      aria-hidden
      data-arch={plot ? "scrub" : undefined}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {/* ================================================================
          MASTER-PLAN UNDERLAY - a big ghosted drawing spanning the sheet.
          Paper sheets get an architectural floor plan; ink sheets get a
          structural framing grid, so adjacent sections never repeat.
          ================================================================ */}
      <motion.div
        aria-hidden
        className="absolute -inset-16"
        style={driftFactor ? { y: underlayY, willChange: "transform" } : undefined}
      >
      {tone === "light" ? (
        <svg
          viewBox="0 0 1400 900"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          className="absolute inset-0 w-full h-full"
        >
          {/* Outer double walls */}
          <rect x="120" y="90" width="1160" height="720" stroke={inkGhost} strokeWidth="2" />
          <rect x="136" y="106" width="1128" height="688" stroke={inkGhost} strokeWidth="1" />
          {/* Column grid */}
          {[120, 410, 700, 990, 1280].map((x) => (
            <line key={x} x1={x} y1="40" x2={x} y2="860" stroke={inkGhost} strokeWidth="1" strokeDasharray="14 10" />
          ))}
          {[90, 330, 570, 810].map((y) => (
            <line key={y} x1="60" y1={y} x2="1340" y2={y} stroke={inkGhost} strokeWidth="1" strokeDasharray="14 10" />
          ))}
          {/* Axis bubbles */}
          {[120, 410, 700, 990, 1280].map((x, i) => (
            <g key={x}>
              <circle cx={x} cy="34" r="17" stroke={goldGhost} strokeWidth="1.25" />
              <text x={x} y="40" textAnchor="middle" fontSize="15" fill={goldGhost} style={label}>
                {i + 1}
              </text>
            </g>
          ))}
          {[90, 330, 570, 810].map((y, i) => (
            <g key={y}>
              <circle cx="52" cy={y} r="17" stroke={goldGhost} strokeWidth="1.25" />
              <text x="52" y={y + 6} textAnchor="middle" fontSize="15" fill={goldGhost} style={label}>
                {String.fromCharCode(65 + i)}
              </text>
            </g>
          ))}
          {/* Columns at grid intersections */}
          {[410, 700, 990].map((x) =>
            [330, 570].map((y) => (
              <rect key={`${x}-${y}`} x={x - 10} y={y - 10} width="20" height="20" stroke={inkGhost} strokeWidth="1.5" />
            ))
          )}
          {/* Partitions */}
          <line x1="410" y1="106" x2="410" y2="440" stroke={inkGhost} strokeWidth="1.5" />
          <line x1="700" y1="470" x2="700" y2="794" stroke={inkGhost} strokeWidth="1.5" />
          <line x1="136" y1="570" x2="330" y2="570" stroke={inkGhost} strokeWidth="1.5" />
          <line x1="990" y1="330" x2="1264" y2="330" stroke={inkGhost} strokeWidth="1.5" />
          {/* Door swings */}
          <path d="M 410 440 A 72 72 0 0 1 482 512" stroke={goldGhost} strokeWidth="1.25" />
          <path d="M 700 470 A 64 64 0 0 0 636 534" stroke={goldGhost} strokeWidth="1.25" />
          <path d="M 990 330 A 60 60 0 0 1 1050 390" stroke={goldGhost} strokeWidth="1.25" />
          {/* Stair block with direction arrow */}
          {[880, 904, 928, 952, 976].map((x) => (
            <line key={x} x1={x} y1="640" x2={x} y2="760" stroke={inkGhost} strokeWidth="1" />
          ))}
          <line x1="880" y1="700" x2="1000" y2="700" stroke={goldGhost} strokeWidth="1.25" />
          <path d="M 1000 700 L 988 693 M 1000 700 L 988 707" stroke={goldGhost} strokeWidth="1.25" />
          {/* Window symbols in outer walls (double line + thin center) */}
          {[500, 800, 1100].map((x) => (
            <g key={x}>
              <line x1={x} y1="90" x2={x + 80} y2="90" stroke={goldGhost} strokeWidth="2" />
              <line x1={x} y1="98" x2={x + 80} y2="98" stroke={goldGhost} strokeWidth="0.75" />
              <line x1={x} y1="106" x2={x + 80} y2="106" stroke={goldGhost} strokeWidth="2" />
            </g>
          ))}
          {[240, 470, 690].map((y) => (
            <g key={y}>
              <line x1="120" y1={y} x2="120" y2={y + 70} stroke={goldGhost} strokeWidth="2" />
              <line x1="128" y1={y} x2="128" y2={y + 70} stroke={goldGhost} strokeWidth="0.75" />
              <line x1="136" y1={y} x2="136" y2={y + 70} stroke={goldGhost} strokeWidth="2" />
            </g>
          ))}
          {/* Furniture layer */}
          {/* Bed */}
          <rect x="180" y="150" width="150" height="200" stroke={inkGhost} strokeWidth="1" />
          <rect x="192" y="162" width="55" height="40" stroke={inkGhost} strokeWidth="0.75" />
          <rect x="263" y="162" width="55" height="40" stroke={inkGhost} strokeWidth="0.75" />
          <line x1="180" y1="216" x2="330" y2="216" stroke={inkGhost} strokeWidth="0.75" />
          {/* Sofa L */}
          <path d="M 480 620 L 480 760 L 640 760 L 640 720 L 520 720 L 520 620 Z" stroke={inkGhost} strokeWidth="1" />
          <line x1="480" y1="656" x2="520" y2="656" stroke={inkGhost} strokeWidth="0.75" />
          <line x1="480" y1="692" x2="520" y2="692" stroke={inkGhost} strokeWidth="0.75" />
          <line x1="556" y1="720" x2="556" y2="760" stroke={inkGhost} strokeWidth="0.75" />
          <line x1="592" y1="720" x2="592" y2="760" stroke={inkGhost} strokeWidth="0.75" />
          {/* Dining table + chairs */}
          <rect x="770" y="180" width="150" height="80" stroke={inkGhost} strokeWidth="1" />
          {[790, 830, 870].map((x) => (
            <g key={x}>
              <circle cx={x + 10} cy="164" r="12" stroke={inkGhost} strokeWidth="0.75" />
              <circle cx={x + 10} cy="276" r="12" stroke={inkGhost} strokeWidth="0.75" />
            </g>
          ))}
          {/* Kitchen counter + sink + hob */}
          <line x1="1120" y1="106" x2="1120" y2="310" stroke={inkGhost} strokeWidth="1" />
          <line x1="1120" y1="310" x2="1264" y2="310" stroke={inkGhost} strokeWidth="1" />
          <circle cx="1160" cy="170" r="16" stroke={goldGhost} strokeWidth="1" />
          <circle cx="1160" cy="170" r="4" stroke={goldGhost} strokeWidth="0.75" />
          {[1180, 1214].map((x) => (
            <circle key={x} cx={x} cy="282" r="10" stroke={inkGhost} strokeWidth="0.75" />
          ))}
          {/* WC fixtures */}
          <rect x="170" y="640" width="44" height="26" rx="12" stroke={inkGhost} strokeWidth="0.75" />
          <circle cx="260" cy="680" r="13" stroke={inkGhost} strokeWidth="0.75" />
          {/* Room labels with sizes - CAD text layer */}
          <text x="255" y="420" textAnchor="middle" fontSize="17" fill={goldGhost} style={label}>
            BEDROOM
          </text>
          <text x="255" y="444" textAnchor="middle" fontSize="12" fill={inkGhost} style={label}>
            3.6 × 3.3
          </text>
          <text x="560" y="560" textAnchor="middle" fontSize="17" fill={goldGhost} style={label}>
            LIVING
          </text>
          <text x="560" y="584" textAnchor="middle" fontSize="12" fill={inkGhost} style={label}>
            5.2 × 4.0
          </text>
          <text x="845" y="380" textAnchor="middle" fontSize="17" fill={goldGhost} style={label}>
            DINING
          </text>
          <text x="1180" y="420" textAnchor="middle" fontSize="17" fill={goldGhost} style={label}>
            KITCHEN
          </text>
          <text x="1180" y="444" textAnchor="middle" fontSize="12" fill={inkGhost} style={label}>
            3.0 × 2.4
          </text>
          <text x="215" y="740" textAnchor="middle" fontSize="14" fill={goldGhost} style={label}>
            TOILET
          </text>
          <text x="940" y="620" textAnchor="middle" fontSize="14" fill={goldGhost} style={label}>
            UP
          </text>
          {/* Dimension chains: bottom + left */}
          <line x1="120" y1="852" x2="1280" y2="852" stroke={goldGhost} strokeWidth="1" />
          {[120, 410, 700, 990, 1280].map((x) => (
            <g key={x}>
              <line x1={x} y1="844" x2={x} y2="860" stroke={goldGhost} strokeWidth="1" />
              <line x1={x - 6} y1="858" x2={x + 6} y2="846" stroke={goldGhost} strokeWidth="1" />
            </g>
          ))}
          {[265, 555, 845, 1135].map((x) => (
            <text key={x} x={x} y="878" textAnchor="middle" fontSize="12" fill={inkGhost} style={label}>
              2.90
            </text>
          ))}
          <line x1="96" y1="90" x2="96" y2="810" stroke={goldGhost} strokeWidth="1" />
          {[90, 330, 570, 810].map((y) => (
            <g key={y}>
              <line x1="88" y1={y} x2="104" y2={y} stroke={goldGhost} strokeWidth="1" />
              <line x1="90" y1={y + 6} x2="102" y2={y - 6} stroke={goldGhost} strokeWidth="1" />
            </g>
          ))}
          {/* UCS icon */}
          <g>
            <line x1="150" y1="838" x2="196" y2="838" stroke={goldGhost} strokeWidth="1.5" />
            <path d="M 196 838 L 186 833 M 196 838 L 186 843" stroke={goldGhost} strokeWidth="1.5" />
            <line x1="150" y1="838" x2="150" y2="792" stroke={goldGhost} strokeWidth="1.5" />
            <path d="M 150 792 L 145 802 M 150 792 L 155 802" stroke={goldGhost} strokeWidth="1.5" />
            <text x="204" y="842" fontSize="11" fill={inkGhost} style={label}>
              X
            </text>
            <text x="144" y="784" fontSize="11" fill={inkGhost} style={label}>
              Y
            </text>
          </g>
        </svg>
      ) : (
        <svg
          viewBox="0 0 1400 900"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          className="absolute inset-0 w-full h-full"
        >
          {/* Structural framing grid */}
          {[160, 440, 720, 1000, 1280].map((x) => (
            <line key={x} x1={x} y1="60" x2={x} y2="840" stroke={inkGhost} strokeWidth="1" strokeDasharray="16 12" />
          ))}
          {[140, 380, 620, 860].map((y) => (
            <line key={y} x1="80" y1={y} x2="1340" y2={y} stroke={inkGhost} strokeWidth="1" strokeDasharray="16 12" />
          ))}
          {/* Primary beams (double lines) */}
          {[380, 620].map((y) => (
            <g key={y}>
              <line x1="160" y1={y - 7} x2="1280" y2={y - 7} stroke={inkGhost} strokeWidth="1.5" />
              <line x1="160" y1={y + 7} x2="1280" y2={y + 7} stroke={inkGhost} strokeWidth="1.5" />
            </g>
          ))}
          {/* Secondary beams */}
          {[300, 580, 860, 1140].map((x) => (
            <line key={x} x1={x} y1="380" x2={x} y2="620" stroke={inkGhost} strokeWidth="1" />
          ))}
          {/* Columns at intersections */}
          {[160, 440, 720, 1000, 1280].map((x) =>
            [380, 620].map((y) => (
              <g key={`${x}-${y}`}>
                <rect x={x - 11} y={y - 11} width="22" height="22" stroke={inkGhost} strokeWidth="1.5" />
                <line x1={x - 11} y1={y - 11} x2={x + 11} y2={y + 11} stroke={inkGhost} strokeWidth="0.75" />
                <line x1={x + 11} y1={y - 11} x2={x - 11} y2={y + 11} stroke={inkGhost} strokeWidth="0.75" />
              </g>
            ))
          )}
          {/* Braced bay */}
          <line x1="720" y1="380" x2="1000" y2="620" stroke={goldGhost} strokeWidth="1.25" />
          <line x1="1000" y1="380" x2="720" y2="620" stroke={goldGhost} strokeWidth="1.25" />
          {/* Axis bubbles */}
          {[160, 440, 720, 1000, 1280].map((x, i) => (
            <g key={x}>
              <circle cx={x} cy="54" r="17" stroke={goldGhost} strokeWidth="1.25" />
              <text x={x} y="60" textAnchor="middle" fontSize="15" fill={goldGhost} style={label}>
                {i + 1}
              </text>
            </g>
          ))}
          {[140, 380, 620, 860].map((y, i) => (
            <g key={y}>
              <circle cx="72" cy={y} r="17" stroke={goldGhost} strokeWidth="1.25" />
              <text x="72" y={y + 6} textAnchor="middle" fontSize="15" fill={goldGhost} style={label}>
                {String.fromCharCode(65 + i)}
              </text>
            </g>
          ))}
          {/* Beam tags - CAD annotation layer */}
          <text x="300" y="360" textAnchor="middle" fontSize="13" fill={goldGhost} style={label}>
            B1 230×450
          </text>
          <text x="860" y="360" textAnchor="middle" fontSize="13" fill={goldGhost} style={label}>
            B1 230×450
          </text>
          <text x="580" y="660" textAnchor="middle" fontSize="13" fill={goldGhost} style={label}>
            B2 230×380
          </text>
          <text x="1080" y="330" textAnchor="middle" fontSize="12" fill={inkGhost} style={label}>
            C1 300×300
          </text>
          {/* Section cut line A - A */}
          <line x1="580" y1="100" x2="580" y2="800" stroke={goldGhost} strokeWidth="1.25" strokeDasharray="26 10 6 10" />
          <circle cx="580" cy="88" r="18" stroke={goldGhost} strokeWidth="1.25" />
          <text x="580" y="94" textAnchor="middle" fontSize="14" fill={goldGhost} style={label}>
            A
          </text>
          <circle cx="580" cy="812" r="18" stroke={goldGhost} strokeWidth="1.25" />
          <text x="580" y="818" textAnchor="middle" fontSize="14" fill={goldGhost} style={label}>
            A
          </text>
          {/* Detail reference circle */}
          <circle cx="1140" cy="500" r="46" stroke={goldGhost} strokeWidth="1.25" />
          <line x1="1140" y1="454" x2="1140" y2="546" stroke={goldGhost} strokeWidth="1" />
          <text x="1140" y="490" textAnchor="middle" fontSize="12" fill={goldGhost} style={label}>
            D-04
          </text>
          <text x="1140" y="530" textAnchor="middle" fontSize="10" fill={inkGhost} style={label}>
            1:20
          </text>
        </svg>
      )}
      </motion.div>

      {/* Vignette layer - drifts faster than the underlay for stacked-tracing depth */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={driftFactor ? { y: vignetteY, willChange: "transform" } : undefined}
      >

      {/* 01 - Surveyor's theodolite sighting a leveling staff */}
      {variant === "surveyor" && (
        <svg viewBox="0 0 400 290" fill="none" className="absolute bottom-0 left-2 sm:left-10 w-[270px] sm:w-[400px]">
          {/* Tripod */}
          <line x1="110" y1="120" x2="66" y2="272" stroke={ink} strokeWidth="1.5" />
          <line x1="110" y1="120" x2="128" y2="272" stroke={ink} strokeWidth="1.5" />
          <line x1="110" y1="120" x2="160" y2="252" stroke={inkFaint} strokeWidth="1.25" />
          {/* Theodolite body */}
          <rect x="96" y="98" width="28" height="20" stroke={ink} strokeWidth="1.25" />
          <circle cx="110" cy="90" r="10" stroke={ink} strokeWidth="1.25" />
          <line x1="96" y1="90" x2="124" y2="90" stroke={ink} strokeWidth="1.5" />
          <circle cx="110" cy="90" r="3" fill={gold} stroke="none" />
          {/* Sight line to staff */}
          <line x1="124" y1="90" x2="330" y2="112" stroke={gold} strokeWidth="1" strokeDasharray="6 4" />
          {/* Leveling staff with graduations */}
          <rect x="330" y="60" width="10" height="212" stroke={ink} strokeWidth="1.25" />
          {[70, 90, 110, 130, 150, 170, 190, 210, 230, 250].map((y, i) =>
            i % 2 === 0 ? (
              <rect key={y} x="330" y={y} width="10" height="10" fill={inkFaint} stroke="none" />
            ) : (
              <line key={y} x1="330" y1={y} x2="340" y2={y} stroke={inkFaint} strokeWidth="1" />
            )
          )}
          <line x1="322" y1="112" x2="348" y2="112" stroke={gold} strokeWidth="1.25" />
          <text x="356" y="115" fontSize="8" fill={gold} style={label}>
            1.284
          </text>
          {/* Benchmark */}
          <path d="M 236 272 L 246 256 L 256 272 Z" stroke={gold} strokeWidth="1" />
          <line x1="230" y1="272" x2="262" y2="272" stroke={gold} strokeWidth="1" />
          <text x="246" y="248" textAnchor="middle" fontSize="8" fill={gold} style={label}>
            BM +100.00
          </text>
          {/* Ground */}
          <line x1="10" y1="272" x2="390" y2="272" stroke={ink} strokeWidth="1.5" />
          {Array.from({ length: 12 }, (_, i) => 24 + i * 32).map((x) => (
            <line key={x} x1={x} y1="272" x2={x - 9} y2="281" stroke={inkFaint} strokeWidth="1" />
          ))}
        </svg>
      )}

      {/* 02 - Tower crane lifting over columns under construction */}
      {variant === "crane" && (
        <svg viewBox="0 0 480 320" fill="none" className="absolute bottom-0 right-0 sm:right-6 w-[300px] sm:w-[480px]">
          {/* Mast with lattice */}
          <line x1="90" y1="310" x2="90" y2="52" stroke={ink} strokeWidth="1.5" />
          <line x1="108" y1="310" x2="108" y2="52" stroke={ink} strokeWidth="1.5" />
          {[70, 106, 142, 178, 214, 250, 286].map((y) => (
            <g key={y}>
              <line x1="90" y1={y} x2="108" y2={y + 18} stroke={inkFaint} strokeWidth="1" />
              <line x1="108" y1={y} x2="90" y2={y + 18} stroke={inkFaint} strokeWidth="1" />
            </g>
          ))}
          {/* Slewing unit + cab + apex */}
          <rect x="84" y="40" width="30" height="14" stroke={ink} strokeWidth="1.25" />
          <rect x="110" y="44" width="14" height="12" stroke={ink} strokeWidth="1" />
          <path d="M 90 40 L 99 12 L 108 40" stroke={ink} strokeWidth="1.25" />
          {/* Jib with lattice */}
          <line x1="114" y1="46" x2="420" y2="46" stroke={ink} strokeWidth="1.5" />
          <line x1="114" y1="56" x2="420" y2="52" stroke={inkFaint} strokeWidth="1" />
          {[140, 180, 220, 260, 300, 340, 380].map((x) => (
            <g key={x}>
              <line x1={x} y1="46" x2={x + 20} y2="54" stroke={inkFaint} strokeWidth="0.75" />
              <line x1={x + 20} y1="46" x2={x} y2="54" stroke={inkFaint} strokeWidth="0.75" />
            </g>
          ))}
          {/* Counter-jib + weight */}
          <line x1="84" y1="46" x2="24" y2="46" stroke={ink} strokeWidth="1.5" />
          <rect x="20" y="50" width="26" height="18" stroke={ink} strokeWidth="1.25" />
          <line x1="24" y1="56" x2="46" y2="56" stroke={inkFaint} strokeWidth="0.75" />
          <line x1="24" y1="62" x2="46" y2="62" stroke={inkFaint} strokeWidth="0.75" />
          {/* Ties */}
          <line x1="99" y1="12" x2="290" y2="44" stroke={goldFaint} strokeWidth="1" />
          <line x1="99" y1="12" x2="32" y2="44" stroke={goldFaint} strokeWidth="1" />
          {/* Trolley + hoist + hook + beam */}
          <rect x="316" y="46" width="14" height="8" fill={gold} stroke="none" />
          <line x1="323" y1="54" x2="323" y2="150" stroke={gold} strokeWidth="1" />
          <path d="M 323 150 q 10 8 0 16 q -8 -6 0 -6" stroke={gold} strokeWidth="1.25" />
          <line x1="303" y1="174" x2="343" y2="174" stroke={gold} strokeWidth="2" />
          <line x1="323" y1="166" x2="309" y2="174" stroke={goldFaint} strokeWidth="0.75" />
          <line x1="323" y1="166" x2="337" y2="174" stroke={goldFaint} strokeWidth="0.75" />
          {/* Columns going up, scaffolded */}
          <line x1="250" y1="310" x2="250" y2="228" stroke={ink} strokeWidth="1.25" />
          <line x1="310" y1="310" x2="310" y2="228" stroke={ink} strokeWidth="1.25" />
          <line x1="370" y1="310" x2="370" y2="228" stroke={ink} strokeWidth="1.25" />
          <line x1="430" y1="310" x2="430" y2="228" stroke={ink} strokeWidth="1.25" />
          <line x1="242" y1="228" x2="438" y2="228" stroke={ink} strokeWidth="1.25" />
          <line x1="242" y1="270" x2="438" y2="270" stroke={inkFaint} strokeWidth="1" />
          {[256, 286, 316, 346, 376, 406].map((x) => (
            <line key={x} x1={x} y1="228" x2={x + 24} y2="270" stroke={inkFaint} strokeWidth="0.6" />
          ))}
          {/* Rebar sprouting from columns */}
          {[250, 310, 370, 430].map((x) => (
            <g key={x}>
              <line x1={x - 3} y1="228" x2={x - 3} y2="214" stroke={goldFaint} strokeWidth="1" />
              <line x1={x + 3} y1="228" x2={x + 3} y2="214" stroke={goldFaint} strokeWidth="1" />
            </g>
          ))}
          {/* Ground */}
          <line x1="0" y1="310" x2="480" y2="310" stroke={ink} strokeWidth="1.5" />
          {Array.from({ length: 15 }, (_, i) => 18 + i * 32).map((x) => (
            <line key={x} x1={x} y1="310" x2={x - 9} y2="319" stroke={inkFaint} strokeWidth="1" />
          ))}
        </svg>
      )}

      {/* 03 - Roof truss with gusset nodes + I-beam section */}
      {variant === "truss" && (
        <>
          <svg viewBox="0 0 400 250" fill="none" className="absolute bottom-0 right-2 sm:right-10 w-[290px] sm:w-[400px]">
            <line x1="30" y1="150" x2="370" y2="150" stroke={ink} strokeWidth="1.5" />
            <line x1="30" y1="150" x2="200" y2="60" stroke={ink} strokeWidth="1.5" />
            <line x1="200" y1="60" x2="370" y2="150" stroke={ink} strokeWidth="1.5" />
            <line x1="115" y1="105" x2="115" y2="150" stroke={inkFaint} strokeWidth="1" />
            <line x1="200" y1="60" x2="200" y2="150" stroke={inkFaint} strokeWidth="1" />
            <line x1="285" y1="105" x2="285" y2="150" stroke={inkFaint} strokeWidth="1" />
            <line x1="115" y1="150" x2="200" y2="60" stroke={inkFaint} strokeWidth="1" />
            <line x1="200" y1="60" x2="285" y2="150" stroke={inkFaint} strokeWidth="1" />
            <line x1="115" y1="105" x2="200" y2="150" stroke={inkFaint} strokeWidth="1" />
            <line x1="200" y1="150" x2="285" y2="105" stroke={inkFaint} strokeWidth="1" />
            {[
              [30, 150],
              [115, 150],
              [200, 150],
              [285, 150],
              [370, 150],
              [115, 105],
              [285, 105],
            ].map(([x, y]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="3" fill={gold} stroke="none" />
            ))}
            <circle cx="200" cy="60" r="6" stroke={gold} strokeWidth="1" />
            <rect x="42" y="150" width="14" height="60" stroke={ink} strokeWidth="1.25" />
            <rect x="344" y="150" width="14" height="60" stroke={ink} strokeWidth="1.25" />
            <line x1="30" y1="210" x2="68" y2="210" stroke={ink} strokeWidth="1.5" />
            <line x1="332" y1="210" x2="370" y2="210" stroke={ink} strokeWidth="1.5" />
            {[34, 44, 54, 64].map((x) => (
              <line key={x} x1={x} y1="210" x2={x - 7} y2="220" stroke={inkFaint} strokeWidth="1" />
            ))}
            {[336, 346, 356, 366].map((x) => (
              <line key={x} x1={x} y1="210" x2={x - 7} y2="220" stroke={inkFaint} strokeWidth="1" />
            ))}
            <text x="200" y="180" textAnchor="middle" fontSize="9" fill={gold} style={label}>
              TRUSS T-01
            </text>
          </svg>
          <svg viewBox="0 0 120 140" fill="none" className="absolute top-24 left-6 sm:left-14 w-[70px] sm:w-[90px] hidden md:block">
            <line x1="30" y1="20" x2="90" y2="20" stroke={ink} strokeWidth="2" />
            <line x1="30" y1="110" x2="90" y2="110" stroke={ink} strokeWidth="2" />
            <line x1="60" y1="22" x2="60" y2="108" stroke={ink} strokeWidth="1.5" />
            <line x1="104" y1="20" x2="104" y2="110" stroke={gold} strokeWidth="1" />
            <line x1="98" y1="20" x2="110" y2="20" stroke={gold} strokeWidth="1" />
            <line x1="98" y1="110" x2="110" y2="110" stroke={gold} strokeWidth="1" />
            <text x="60" y="132" textAnchor="middle" fontSize="8" fill={gold} style={label}>
              ISMB 300
            </text>
          </svg>
        </>
      )}

      {/* 04 - Detail callout: wall junction magnified */}
      {variant === "detail" && (
        <svg viewBox="0 0 420 300" fill="none" className="absolute top-1/2 -translate-y-1/2 right-0 sm:right-8 w-[280px] sm:w-[400px]">
          {/* Source wall corner */}
          <line x1="30" y1="60" x2="30" y2="230" stroke={ink} strokeWidth="1.5" />
          <line x1="42" y1="60" x2="42" y2="230" stroke={inkFaint} strokeWidth="1" />
          <line x1="30" y1="230" x2="160" y2="230" stroke={ink} strokeWidth="1.5" />
          <line x1="30" y1="218" x2="160" y2="218" stroke={inkFaint} strokeWidth="1" />
          {/* Callout ring on junction */}
          <circle cx="40" cy="224" r="14" stroke={gold} strokeWidth="1.25" />
          {/* Leader */}
          <line x1="52" y1="216" x2="200" y2="150" stroke={gold} strokeWidth="1" strokeDasharray="5 4" />
          {/* Magnified detail bubble */}
          <circle cx="290" cy="150" r="95" stroke={gold} strokeWidth="1.25" />
          <circle cx="290" cy="150" r="101" stroke={goldFaint} strokeWidth="0.75" />
          {/* Inside: wall + slab junction with hatch */}
          <line x1="255" y1="80" x2="255" y2="220" stroke={ink} strokeWidth="1.5" />
          <line x1="277" y1="80" x2="277" y2="185" stroke={ink} strokeWidth="1.5" />
          <line x1="277" y1="185" x2="372" y2="185" stroke={ink} strokeWidth="1.5" />
          <line x1="255" y1="207" x2="372" y2="207" stroke={ink} strokeWidth="1.5" />
          {[92, 112, 132, 152, 172].map((y) => (
            <line key={y} x1="255" y1={y} x2="277" y2={y + 14} stroke={inkFaint} strokeWidth="0.75" />
          ))}
          {[288, 310, 332, 354].map((x) => (
            <line key={x} x1={x} y1="185" x2={x + 14} y2="207" stroke={inkFaint} strokeWidth="0.75" />
          ))}
          {/* Rebar dots in slab */}
          {[292, 314, 336, 358].map((x) => (
            <circle key={x} cx={x} cy="196" r="2.5" fill={gold} stroke="none" />
          ))}
          <text x="290" y="262" textAnchor="middle" fontSize="9" fill={gold} style={label}>
            DETAIL A - 1:5
          </text>
        </svg>
      )}

      {/* 05 - Campus block elevation with arched entrance */}
      {variant === "campus" && (
        <svg viewBox="0 0 380 280" fill="none" className="absolute bottom-0 right-2 sm:right-10 w-[270px] sm:w-[380px]">
          <line x1="60" y1="30" x2="270" y2="30" stroke={gold} strokeWidth="1" />
          <line x1="60" y1="24" x2="60" y2="36" stroke={gold} strokeWidth="1" />
          <line x1="270" y1="24" x2="270" y2="36" stroke={gold} strokeWidth="1" />
          <text x="165" y="20" textAnchor="middle" fontSize="9" fill={gold} style={label}>
            24.0 M
          </text>
          <rect x="60" y="50" width="210" height="220" stroke={ink} strokeWidth="1.5" />
          <line x1="54" y1="50" x2="276" y2="50" stroke={ink} strokeWidth="1.5" />
          <line x1="60" y1="105" x2="270" y2="105" stroke={inkFaint} strokeWidth="1" />
          <line x1="60" y1="160" x2="270" y2="160" stroke={inkFaint} strokeWidth="1" />
          <line x1="60" y1="215" x2="270" y2="215" stroke={inkFaint} strokeWidth="1" />
          {[65, 120, 175].map((y) =>
            [75, 125, 175, 225].map((x) => (
              <g key={`${x}-${y}`}>
                <rect x={x} y={y} width="28" height="26" stroke={ink} strokeWidth="1" />
                <line x1={x + 14} y1={y} x2={x + 14} y2={y + 26} stroke={inkFaint} strokeWidth="0.75" />
              </g>
            ))
          )}
          {/* Arched entrance */}
          <path d="M 140 270 L 140 244 A 25 25 0 0 1 190 244 L 190 270" stroke={ink} strokeWidth="1.25" />
          <line x1="165" y1="220" x2="165" y2="270" stroke={inkFaint} strokeWidth="0.75" />
          {/* Level marker */}
          <circle cx="300" cy="80" r="8" stroke={gold} strokeWidth="1" />
          <line x1="292" y1="80" x2="308" y2="80" stroke={gold} strokeWidth="1" />
          <text x="314" y="83" fontSize="8" fill={gold} style={label}>
            +12.6
          </text>
          <line x1="10" y1="270" x2="370" y2="270" stroke={ink} strokeWidth="1.5" />
          {Array.from({ length: 12 }, (_, i) => 20 + i * 31).map((x) => (
            <line key={x} x1={x} y1="270" x2={x - 9} y2="279" stroke={inkFaint} strokeWidth="1" />
          ))}
        </svg>
      )}

      {/* 06 - Topographic contours with benchmark & spot levels */}
      {variant === "contours" && (
        <svg viewBox="0 0 420 280" fill="none" className="absolute bottom-0 left-0 sm:left-6 w-[280px] sm:w-[420px]">
          <path d="M 10 250 Q 110 190 180 210 Q 280 235 410 190" stroke={ink} strokeWidth="1.25" />
          <path d="M 10 210 Q 120 150 200 170 Q 300 195 410 145" stroke={inkFaint} strokeWidth="1" />
          <path d="M 30 170 Q 140 115 220 135 Q 310 155 410 105" stroke={inkFaint} strokeWidth="1" strokeDasharray="7 5" />
          <path d="M 70 130 Q 170 85 250 100 Q 330 115 410 70" stroke={inkFaint} strokeWidth="1" strokeDasharray="7 5" />
          {/* Contour labels */}
          <text x="52" y="246" fontSize="8" fill={gold} style={label}>
            +96.0
          </text>
          <text x="70" y="204" fontSize="8" fill={gold} style={label}>
            +97.0
          </text>
          <text x="102" y="160" fontSize="8" fill={gold} style={label}>
            +98.0
          </text>
          {/* Spot levels */}
          {[
            [220, 190],
            [300, 130],
          ].map(([x, y]) => (
            <g key={`${x}-${y}`}>
              <line x1={x - 6} y1={y} x2={x + 6} y2={y} stroke={gold} strokeWidth="1" />
              <line x1={x} y1={y - 6} x2={x} y2={y + 6} stroke={gold} strokeWidth="1" />
            </g>
          ))}
          <text x="232" y="186" fontSize="8" fill={gold} style={label}>
            +96.4
          </text>
          <text x="312" y="126" fontSize="8" fill={gold} style={label}>
            +97.8
          </text>
          {/* Benchmark */}
          <circle cx="150" cy="90" r="10" stroke={gold} strokeWidth="1.25" />
          <path d="M 150 90 L 158 84 A 10 10 0 0 0 150 80 Z" fill={gold} stroke="none" />
          <path d="M 150 90 L 142 96 A 10 10 0 0 0 150 100 Z" fill={gold} stroke="none" />
          <text x="166" y="94" fontSize="8" fill={gold} style={label}>
            BM-02
          </text>
        </svg>
      )}

      {/* 07 - Setting-out grid with target coordinate */}
      {variant === "settingout" && (
        <svg viewBox="0 0 400 260" fill="none" className="absolute bottom-2 right-2 sm:right-10 w-[270px] sm:w-[390px]">
          {[60, 170, 280].map((x) => (
            <line key={x} x1={x} y1="20" x2={x} y2="240" stroke={inkFaint} strokeWidth="1" strokeDasharray="8 5" />
          ))}
          {[60, 140, 220].map((y) => (
            <line key={y} x1="20" y1={y} x2="380" y2={y} stroke={inkFaint} strokeWidth="1" strokeDasharray="8 5" />
          ))}
          {/* Intersection crosses */}
          {[60, 170, 280].map((x) =>
            [60, 140, 220].map((y) => (
              <g key={`${x}-${y}`}>
                <line x1={x - 7} y1={y} x2={x + 7} y2={y} stroke={ink} strokeWidth="1" />
                <line x1={x} y1={y - 7} x2={x} y2={y + 7} stroke={ink} strokeWidth="1" />
              </g>
            ))
          )}
          {/* Target point */}
          <circle cx="280" cy="140" r="20" stroke={gold} strokeWidth="1.25" />
          <circle cx="280" cy="140" r="10" stroke={goldFaint} strokeWidth="1" />
          <circle cx="280" cy="140" r="2.5" fill={gold} stroke="none" />
          <text x="306" y="132" fontSize="8" fill={gold} style={label}>
            E 402.50
          </text>
          <text x="306" y="146" fontSize="8" fill={gold} style={label}>
            N 118.00
          </text>
          {/* Axis tags */}
          <circle cx="60" cy="20" r="11" stroke={gold} strokeWidth="1" />
          <text x="60" y="24" textAnchor="middle" fontSize="9" fill={gold} style={label}>
            1
          </text>
          <circle cx="20" cy="60" r="11" stroke={gold} strokeWidth="1" />
          <text x="20" y="64" textAnchor="middle" fontSize="9" fill={gold} style={label}>
            A
          </text>
        </svg>
      )}

      {/* 08 - Portal frame with haunches */}
      {variant === "portal" && (
        <svg viewBox="0 0 380 260" fill="none" className="absolute bottom-0 right-2 sm:right-10 w-[270px] sm:w-[380px]">
          <line x1="50" y1="230" x2="50" y2="100" stroke={ink} strokeWidth="1.5" />
          <line x1="62" y1="230" x2="62" y2="106" stroke={inkFaint} strokeWidth="1" />
          <line x1="330" y1="230" x2="330" y2="100" stroke={ink} strokeWidth="1.5" />
          <line x1="318" y1="230" x2="318" y2="106" stroke={inkFaint} strokeWidth="1" />
          {/* Rafters */}
          <line x1="50" y1="100" x2="190" y2="55" stroke={ink} strokeWidth="1.5" />
          <line x1="190" y1="55" x2="330" y2="100" stroke={ink} strokeWidth="1.5" />
          <line x1="62" y1="106" x2="190" y2="65" stroke={inkFaint} strokeWidth="1" />
          <line x1="190" y1="65" x2="318" y2="106" stroke={inkFaint} strokeWidth="1" />
          {/* Haunches */}
          <path d="M 62 106 L 96 95 L 62 128 Z" stroke={gold} strokeWidth="1" />
          <path d="M 318 106 L 284 95 L 318 128 Z" stroke={gold} strokeWidth="1" />
          <path d="M 178 62 L 202 62 L 190 74 Z" stroke={gold} strokeWidth="1" />
          {/* Base plates + bolts */}
          <line x1="36" y1="230" x2="76" y2="230" stroke={ink} strokeWidth="1.5" />
          <line x1="304" y1="230" x2="344" y2="230" stroke={ink} strokeWidth="1.5" />
          {[42, 68, 310, 336].map((x) => (
            <circle key={x} cx={x} cy="236" r="2.5" stroke={gold} strokeWidth="1" />
          ))}
          {[40, 52, 64, 308, 320, 332].map((x) => (
            <line key={x} x1={x} y1="230" x2={x - 7} y2="240" stroke={inkFaint} strokeWidth="1" />
          ))}
          <text x="190" y="130" textAnchor="middle" fontSize="9" fill={gold} style={label}>
            PORTAL PF-02
          </text>
          {/* Eaves height dim */}
          <line x1="356" y1="100" x2="356" y2="230" stroke={goldFaint} strokeWidth="1" />
          <line x1="350" y1="100" x2="362" y2="100" stroke={gold} strokeWidth="1" />
          <line x1="350" y1="230" x2="362" y2="230" stroke={gold} strokeWidth="1" />
          <text x="368" y="168" fontSize="8" fill={gold} style={label}>
            7.5
          </text>
        </svg>
      )}

      {/* 09 - Drafting instruments: compass, protractor, set square */}
      {variant === "instruments" && (
        <svg viewBox="0 0 420 280" fill="none" className="absolute bottom-0 left-2 sm:left-10 w-[270px] sm:w-[400px]">
          {/* Protractor semicircle */}
          <path d="M 60 220 A 100 100 0 0 1 260 220" stroke={ink} strokeWidth="1.25" />
          <line x1="60" y1="220" x2="260" y2="220" stroke={ink} strokeWidth="1.25" />
          {Array.from({ length: 13 }, (_, i) => i * 15).map((deg) => {
            const rad = (Math.PI * deg) / 180;
            const x1 = 160 - 100 * Math.cos(rad);
            const y1 = 220 - 100 * Math.sin(rad);
            const x2 = 160 - 88 * Math.cos(rad);
            const y2 = 220 - 88 * Math.sin(rad);
            return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke={inkFaint} strokeWidth="1" />;
          })}
          <circle cx="160" cy="220" r="4" stroke={gold} strokeWidth="1" />
          {/* 60° ray */}
          <line x1="160" y1="220" x2="110" y2="133.4" stroke={gold} strokeWidth="1" strokeDasharray="5 4" />
          <text x="96" y="126" fontSize="8" fill={gold} style={label}>
            60°
          </text>
          {/* Compass */}
          <circle cx="300" cy="90" r="6" stroke={ink} strokeWidth="1.25" />
          <line x1="296" y1="95" x2="268" y2="200" stroke={ink} strokeWidth="1.5" />
          <line x1="304" y1="95" x2="344" y2="196" stroke={ink} strokeWidth="1.5" />
          <line x1="344" y1="196" x2="350" y2="212" stroke={gold} strokeWidth="1.25" />
          {/* Drawn arc */}
          <path d="M 244 214 A 92 92 0 0 1 356 220" stroke={gold} strokeWidth="1" strokeDasharray="6 5" />
          {/* Set square */}
          <path d="M 40 60 L 150 60 L 40 170 Z" stroke={ink} strokeWidth="1.25" />
          <path d="M 62 78 L 122 78 L 62 138 Z" stroke={inkFaint} strokeWidth="1" />
          <text x="210" y="252" textAnchor="middle" fontSize="9" fill={gold} style={label}>
            SET - 45° / 60°
          </text>
        </svg>
      )}

      {/* 10 - Isolated footing cross-section with rebar */}
      {variant === "foundation" && (
        <svg viewBox="0 0 400 280" fill="none" className="absolute bottom-0 right-2 sm:right-10 w-[280px] sm:w-[400px]">
          {/* Ground level */}
          <line x1="10" y1="80" x2="390" y2="80" stroke={ink} strokeWidth="1.25" />
          {Array.from({ length: 12 }, (_, i) => 22 + i * 32).map((x) => (
            <line key={x} x1={x} y1="80" x2={x - 9} y2="71" stroke={inkFaint} strokeWidth="1" />
          ))}
          {/* Column stub */}
          <line x1="175" y1="30" x2="175" y2="180" stroke={ink} strokeWidth="1.5" />
          <line x1="225" y1="30" x2="225" y2="180" stroke={ink} strokeWidth="1.5" />
          {/* Column bars + stirrups */}
          <line x1="185" y1="30" x2="185" y2="215" stroke={gold} strokeWidth="1" />
          <line x1="215" y1="30" x2="215" y2="215" stroke={gold} strokeWidth="1" />
          {[46, 76, 106, 136, 166].map((y) => (
            <rect key={y} x="181" y={y} width="38" height="6" stroke={goldFaint} strokeWidth="0.75" />
          ))}
          {/* Footing */}
          <path d="M 110 180 L 290 180 L 270 230 L 130 230 Z" stroke={ink} strokeWidth="1.5" />
          {/* Footing mesh bars */}
          {[132, 156, 180, 204, 228, 252, 268].map((x) => (
            <circle key={x} cx={x} cy="222" r="2.5" fill={gold} stroke="none" />
          ))}
          <line x1="126" y1="214" x2="274" y2="214" stroke={gold} strokeWidth="1" />
          <path d="M 126 214 L 126 202 M 274 214 L 274 202" stroke={gold} strokeWidth="1" />
          {/* Blinding + soil */}
          <line x1="104" y1="238" x2="296" y2="238" stroke={inkFaint} strokeWidth="1" />
          {[112, 136, 160, 184, 208, 232, 256, 280].map((x) => (
            <line key={x} x1={x} y1="238" x2={x - 8} y2="248" stroke={inkFaint} strokeWidth="0.75" />
          ))}
          {/* Depth dimension */}
          <line x1="330" y1="80" x2="330" y2="230" stroke={goldFaint} strokeWidth="1" />
          <line x1="324" y1="80" x2="336" y2="80" stroke={gold} strokeWidth="1" />
          <line x1="324" y1="230" x2="336" y2="230" stroke={gold} strokeWidth="1" />
          <text x="342" y="158" fontSize="8" fill={gold} style={label}>
            1.5
          </text>
          <text x="200" y="266" textAnchor="middle" fontSize="9" fill={gold} style={label}>
            FOOTING F-01
          </text>
        </svg>
      )}

      {/* 11 - Residential villa elevation with porch */}
      {variant === "villa" && (
        <svg viewBox="0 0 420 270" fill="none" className="absolute bottom-0 right-2 sm:right-10 w-[290px] sm:w-[420px]">
          {/* Gable roof */}
          <path d="M 60 130 L 200 50 L 340 130" stroke={ink} strokeWidth="1.5" />
          <path d="M 44 132 L 200 42 L 356 132" stroke={inkFaint} strokeWidth="1" />
          {/* Chimney */}
          <line x1="272" y1="92" x2="272" y2="56" stroke={ink} strokeWidth="1.25" />
          <line x1="290" y1="102" x2="290" y2="56" stroke={ink} strokeWidth="1.25" />
          <line x1="266" y1="56" x2="296" y2="56" stroke={ink} strokeWidth="1.25" />
          {/* Walls */}
          <rect x="70" y="130" width="260" height="120" stroke={ink} strokeWidth="1.5" />
          {/* Door */}
          <rect x="185" y="192" width="34" height="58" stroke={ink} strokeWidth="1.25" />
          <circle cx="212" cy="222" r="2" fill={gold} stroke="none" />
          {/* Windows with sills */}
          <rect x="96" y="156" width="40" height="36" stroke={ink} strokeWidth="1" />
          <line x1="116" y1="156" x2="116" y2="192" stroke={inkFaint} strokeWidth="0.75" />
          <line x1="96" y1="174" x2="136" y2="174" stroke={inkFaint} strokeWidth="0.75" />
          <line x1="90" y1="196" x2="142" y2="196" stroke={inkFaint} strokeWidth="1" />
          <rect x="264" y="156" width="40" height="36" stroke={ink} strokeWidth="1" />
          <line x1="284" y1="156" x2="284" y2="192" stroke={inkFaint} strokeWidth="0.75" />
          <line x1="264" y1="174" x2="304" y2="174" stroke={inkFaint} strokeWidth="0.75" />
          <line x1="258" y1="196" x2="310" y2="196" stroke={inkFaint} strokeWidth="1" />
          {/* Porch */}
          <line x1="330" y1="168" x2="396" y2="168" stroke={ink} strokeWidth="1.25" />
          <line x1="344" y1="168" x2="344" y2="250" stroke={ink} strokeWidth="1.25" />
          <line x1="384" y1="168" x2="384" y2="250" stroke={ink} strokeWidth="1.25" />
          <line x1="336" y1="250" x2="392" y2="250" stroke={inkFaint} strokeWidth="1" />
          {/* Roof pitch marker */}
          <path d="M 118 96 L 142 96 L 142 82" stroke={gold} strokeWidth="1" />
          <text x="150" y="94" fontSize="8" fill={gold} style={label}>
            30°
          </text>
          {/* Ground */}
          <line x1="10" y1="250" x2="410" y2="250" stroke={ink} strokeWidth="1.5" />
          {Array.from({ length: 13 }, (_, i) => 20 + i * 32).map((x) => (
            <line key={x} x1={x} y1="250" x2={x - 9} y2="259" stroke={inkFaint} strokeWidth="1" />
          ))}
          {/* Width dim */}
          <line x1="70" y1="264" x2="330" y2="264" stroke={gold} strokeWidth="1" />
          <line x1="70" y1="258" x2="70" y2="270" stroke={gold} strokeWidth="1" />
          <line x1="330" y1="258" x2="330" y2="270" stroke={gold} strokeWidth="1" />
        </svg>
      )}

      {/* 12 - Axonometric massing blocks */}
      {variant === "axon" && (
        <svg viewBox="0 0 380 300" fill="none" className="absolute bottom-0 left-2 sm:left-10 w-[250px] sm:w-[360px]">
          {/* Tall block */}
          <path d="M 120 60 L 200 90 L 200 220 L 120 190 Z" stroke={ink} strokeWidth="1.25" />
          <path d="M 120 60 L 60 85 L 60 215 L 120 190" stroke={ink} strokeWidth="1.25" />
          <path d="M 60 85 L 140 115 L 200 90" stroke={ink} strokeWidth="1.25" />
          <path d="M 140 115 L 140 245" stroke={inkFaint} strokeWidth="1" strokeDasharray="5 4" />
          {/* Low block attached */}
          <path d="M 200 150 L 300 185 L 300 255 L 200 220" stroke={ink} strokeWidth="1.25" />
          <path d="M 300 185 L 350 165 L 350 235 L 300 255" stroke={ink} strokeWidth="1.25" />
          <path d="M 200 150 L 250 130 L 350 165" stroke={ink} strokeWidth="1.25" />
          {/* Floor score lines */}
          <path d="M 120 105 L 200 135 M 120 148 L 200 178" stroke={inkFaint} strokeWidth="0.75" />
          <path d="M 60 128 L 120 105 M 60 172 L 120 148" stroke={inkFaint} strokeWidth="0.75" />
          {/* Base plane */}
          <path d="M 20 210 L 190 275 L 370 205" stroke={goldFaint} strokeWidth="1" strokeDasharray="7 5" />
          {/* Height leader */}
          <line x1="42" y1="85" x2="42" y2="215" stroke={goldFaint} strokeWidth="1" />
          <line x1="36" y1="85" x2="48" y2="85" stroke={gold} strokeWidth="1" />
          <line x1="36" y1="215" x2="48" y2="215" stroke={gold} strokeWidth="1" />
          <text x="30" y="154" fontSize="8" fill={gold} style={label} transform="rotate(-90 30 154)">
            G+3
          </text>
          <text x="255" y="290" textAnchor="middle" fontSize="9" fill={gold} style={label}>
            MASSING - OPT B
          </text>
        </svg>
      )}

      {/* 13 - Site plan: plot, setbacks, footprint, road */}
      {variant === "siteplan" && (
        <>
          <svg viewBox="0 0 420 300" fill="none" className="absolute bottom-0 right-2 sm:right-10 w-[280px] sm:w-[410px]">
            {/* Plot boundary */}
            <path d="M 40 40 L 380 60 L 360 230 L 60 240 Z" stroke={ink} strokeWidth="1.5" />
            {/* Setback */}
            <path d="M 70 68 L 350 84 L 334 208 L 86 216 Z" stroke={inkFaint} strokeWidth="1" strokeDasharray="7 5" />
            {/* Footprint hatched */}
            <rect x="140" y="105" width="150" height="80" stroke={ink} strokeWidth="1.25" />
            {[150, 175, 200, 225, 250, 275].map((x) => (
              <line key={x} x1={x} y1="105" x2={x + 22} y2="185" stroke={inkFaint} strokeWidth="0.6" />
            ))}
            {/* Trees */}
            {[
              [100, 90],
              [320, 120],
              [110, 190],
            ].map(([x, y]) => (
              <g key={`${x}-${y}`}>
                <circle cx={x} cy={y} r="13" stroke={gold} strokeWidth="1" />
                <circle cx={x} cy={y} r="2" fill={gold} stroke="none" />
              </g>
            ))}
            {/* Road */}
            <line x1="10" y1="268" x2="410" y2="262" stroke={ink} strokeWidth="1.25" />
            <line x1="10" y1="292" x2="410" y2="286" stroke={ink} strokeWidth="1.25" />
            <line x1="14" y1="280" x2="406" y2="274" stroke={goldFaint} strokeWidth="1" strokeDasharray="14 10" />
            <text x="215" y="150" textAnchor="middle" fontSize="9" fill={gold} style={label}>
              FOOTPRINT 420 M²
            </text>
          </svg>
          {/* North arrow - unique to the site plan */}
          <svg viewBox="0 0 90 110" fill="none" className="absolute top-24 left-6 sm:left-14 w-[64px] sm:w-[84px] hidden md:block">
            <circle cx="45" cy="55" r="30" stroke={ink} strokeWidth="1.25" />
            <circle cx="45" cy="55" r="24" stroke={inkFaint} strokeWidth="0.75" />
            <path d="M 45 33 L 53 62 L 45 55 L 37 62 Z" stroke={gold} strokeWidth="1" fill="none" />
            <line x1="45" y1="62" x2="45" y2="77" stroke={goldFaint} strokeWidth="1" />
            <text x="45" y="18" textAnchor="middle" fontSize="12" fill={gold} style={label}>
              N
            </text>
          </svg>
        </>
      )}

      {/* 14 - Furnished floor plan with dimension chain + scale bar */}
      {variant === "floorplan" && (
        <>
          <svg viewBox="0 0 360 250" fill="none" className="absolute -bottom-4 left-2 sm:left-10 w-[250px] sm:w-[360px]">
            <rect x="20" y="20" width="320" height="210" stroke={ink} strokeWidth="1.5" />
            <rect x="28" y="28" width="304" height="194" stroke={inkFaint} strokeWidth="1" />
            <line x1="165" y1="28" x2="165" y2="105" stroke={ink} strokeWidth="1.25" />
            <line x1="165" y1="140" x2="165" y2="222" stroke={ink} strokeWidth="1.25" />
            <line x1="28" y1="140" x2="120" y2="140" stroke={ink} strokeWidth="1.25" />
            <line x1="255" y1="140" x2="332" y2="140" stroke={ink} strokeWidth="1.25" />
            <path d="M 165 105 A 35 35 0 0 1 200 140" stroke={gold} strokeWidth="1" />
            <line x1="165" y1="105" x2="165" y2="140" stroke={goldFaint} strokeWidth="1" />
            <path d="M 120 140 A 32 32 0 0 1 152 172" stroke={gold} strokeWidth="1" />
            <line x1="120" y1="140" x2="152" y2="140" stroke={goldFaint} strokeWidth="1" strokeDasharray="3 3" />
            {[250, 262, 274, 286, 298, 310].map((x) => (
              <line key={x} x1={x} y1="40" x2={x} y2="95" stroke={inkFaint} strokeWidth="1" />
            ))}
            <line x1="250" y1="67" x2="318" y2="67" stroke={gold} strokeWidth="1" />
            <path d="M 318 67 L 310 62 M 318 67 L 310 72" stroke={gold} strokeWidth="1" />
            <rect x="45" y="165" width="34" height="20" rx="8" stroke={inkFaint} strokeWidth="1" />
            <circle cx="100" cy="196" r="9" stroke={inkFaint} strokeWidth="1" />
            <rect x="230" y="170" width="60" height="30" stroke={inkFaint} strokeWidth="1" />
            <circle cx="222" cy="185" r="6" stroke={inkFaint} strokeWidth="0.75" />
            <circle cx="298" cy="185" r="6" stroke={inkFaint} strokeWidth="0.75" />
            {[
              [20, 20],
              [332, 20],
              [20, 222],
              [332, 222],
            ].map(([x, y]) => (
              <g key={`${x}-${y}`}>
                <rect x={x - 4} y={y - 4} width="16" height="16" stroke={ink} strokeWidth="1" />
                <line x1={x - 4} y1={y - 4} x2={x + 12} y2={y + 12} stroke={inkFaint} strokeWidth="0.75" />
                <line x1={x + 12} y1={y - 4} x2={x - 4} y2={y + 12} stroke={inkFaint} strokeWidth="0.75" />
              </g>
            ))}
            <text x="52" y="70" fontSize="9" fill={gold} style={label}>
              PLAN - LVL 01
            </text>
          </svg>
          {/* Scale bar - unique to the floor plan */}
          <svg viewBox="0 0 220 40" fill="none" className="absolute bottom-10 right-6 sm:right-14 w-[150px] sm:w-[200px] hidden md:block">
            <rect x="10" y="16" width="200" height="8" stroke={ink} strokeWidth="1" />
            <rect x="10" y="16" width="40" height="8" fill={gold} stroke="none" />
            <rect x="90" y="16" width="40" height="8" fill={gold} stroke="none" />
            <rect x="170" y="16" width="40" height="8" fill={gold} stroke="none" />
            {[10, 50, 90, 130, 170, 210].map((x) => (
              <line key={x} x1={x} y1="12" x2={x} y2="28" stroke={ink} strokeWidth="1" />
            ))}
            <text x="10" y="9" textAnchor="middle" fontSize="8" fill={gold} style={label}>
              0
            </text>
            <text x="110" y="9" textAnchor="middle" fontSize="8" fill={gold} style={label}>
              5
            </text>
            <text x="210" y="9" textAnchor="middle" fontSize="8" fill={gold} style={label}>
              10M
            </text>
          </svg>
        </>
      )}

      {/* 15 - Scaffolding bay elevation */}
      {variant === "scaffold" && (
        <svg viewBox="0 0 400 290" fill="none" className="absolute bottom-0 right-2 sm:right-10 w-[270px] sm:w-[390px]">
          {/* Standards */}
          {[60, 170, 280].map((x) => (
            <line key={x} x1={x} y1="270" x2={x} y2="40" stroke={ink} strokeWidth="1.5" />
          ))}
          {/* Ledgers */}
          {[70, 125, 180, 235].map((y) => (
            <line key={y} x1="60" y1={y} x2="280" y2={y} stroke={inkFaint} strokeWidth="1" />
          ))}
          {/* Cross braces */}
          <line x1="60" y1="125" x2="170" y2="70" stroke={gold} strokeWidth="1" />
          <line x1="170" y1="125" x2="60" y2="70" stroke={gold} strokeWidth="1" />
          <line x1="170" y1="235" x2="280" y2="180" stroke={gold} strokeWidth="1" />
          <line x1="280" y1="235" x2="170" y2="180" stroke={gold} strokeWidth="1" />
          {/* Working platform planks + toe board */}
          <line x1="54" y1="125" x2="286" y2="125" stroke={ink} strokeWidth="2" />
          {[80, 110, 140, 170, 200, 230, 260].map((x) => (
            <line key={x} x1={x} y1="125" x2={x} y2="119" stroke={inkFaint} strokeWidth="1" />
          ))}
          {/* Guard rail */}
          <line x1="60" y1="98" x2="280" y2="98" stroke={goldFaint} strokeWidth="1" strokeDasharray="6 4" />
          {/* Base plates */}
          {[60, 170, 280].map((x) => (
            <line key={x} x1={x - 12} y1="270" x2={x + 12} y2="270" stroke={ink} strokeWidth="1.5" />
          ))}
          {/* Wall being served */}
          <line x1="330" y1="270" x2="330" y2="40" stroke={ink} strokeWidth="1.5" />
          <line x1="342" y1="270" x2="342" y2="40" stroke={inkFaint} strokeWidth="1" />
          {[60, 100, 140, 180, 220].map((y) => (
            <line key={y} x1="330" y1={y} x2="342" y2={y + 10} stroke={inkFaint} strokeWidth="0.6" />
          ))}
          {/* Ground */}
          <line x1="10" y1="270" x2="390" y2="270" stroke={ink} strokeWidth="1.5" />
          {Array.from({ length: 12 }, (_, i) => 22 + i * 32).map((x) => (
            <line key={x} x1={x} y1="270" x2={x - 9} y2="279" stroke={inkFaint} strokeWidth="1" />
          ))}
          <text x="170" y="34" textAnchor="middle" fontSize="9" fill={gold} style={label}>
            SCAFFOLD BAY 2.0 M
          </text>
        </svg>
      )}

      {/* 16 - Location survey: pin, rings, route */}
      {variant === "locus" && (
        <svg viewBox="0 0 380 320" fill="none" className="absolute top-1/2 -translate-y-1/2 right-0 sm:right-10 w-[250px] sm:w-[360px]">
          {/* Radiating rings */}
          <circle cx="210" cy="140" r="48" stroke={inkFaint} strokeWidth="1" strokeDasharray="6 5" />
          <circle cx="210" cy="140" r="86" stroke={inkFaint} strokeWidth="1" strokeDasharray="6 5" />
          <circle cx="210" cy="140" r="124" stroke={inkFaint} strokeWidth="0.75" strokeDasharray="6 5" />
          {/* Crosshair */}
          <line x1="210" y1="4" x2="210" y2="70" stroke={goldFaint} strokeWidth="1" />
          <line x1="210" y1="210" x2="210" y2="276" stroke={goldFaint} strokeWidth="1" />
          <line x1="74" y1="140" x2="140" y2="140" stroke={goldFaint} strokeWidth="1" />
          <line x1="280" y1="140" x2="346" y2="140" stroke={goldFaint} strokeWidth="1" />
          {/* Pin */}
          <circle cx="210" cy="128" r="24" stroke={gold} strokeWidth="1.5" />
          <circle cx="210" cy="128" r="9" stroke={gold} strokeWidth="1.25" />
          <path d="M 189 140 Q 210 186 210 186 Q 210 186 231 140" stroke={gold} strokeWidth="1.5" />
          {/* Route polyline */}
          <path d="M 20 300 L 80 260 L 120 274 L 168 226 L 196 196" stroke={ink} strokeWidth="1.25" strokeDasharray="8 5" />
          <path d="M 196 196 L 186 200 M 196 196 L 198 207" stroke={ink} strokeWidth="1.25" />
          <text x="210" y="304" textAnchor="middle" fontSize="9" fill={gold} style={label}>
            12.96° N · 80.19° E
          </text>
        </svg>
      )}

      {/* 20 - Building cross-section (SECTION A–A) - reserved for project sheets */}
      {variant === "section" && (
        <svg viewBox="0 0 420 320" fill="none" className="absolute bottom-0 left-2 sm:left-10 w-[280px] sm:w-[410px]">
          {/* Grade line + soil hatch */}
          <line x1="10" y1="250" x2="410" y2="250" stroke={ink} strokeWidth="1.5" />
          {Array.from({ length: 13 }, (_, i) => 22 + i * 32).map((x) => (
            <line key={x} x1={x} y1="250" x2={x - 9} y2="259" stroke={inkFaint} strokeWidth="1" />
          ))}
          {/* Footings below grade */}
          <path d="M 70 286 L 130 286 L 120 306 L 80 306 Z" stroke={ink} strokeWidth="1.25" />
          <path d="M 290 286 L 350 286 L 340 306 L 300 306 Z" stroke={ink} strokeWidth="1.25" />
          <line x1="94" y1="250" x2="94" y2="286" stroke={ink} strokeWidth="1.25" />
          <line x1="106" y1="250" x2="106" y2="286" stroke={ink} strokeWidth="1.25" />
          <line x1="314" y1="250" x2="314" y2="286" stroke={ink} strokeWidth="1.25" />
          <line x1="326" y1="250" x2="326" y2="286" stroke={ink} strokeWidth="1.25" />
          {/* Columns above grade */}
          <line x1="94" y1="250" x2="94" y2="60" stroke={ink} strokeWidth="1.25" />
          <line x1="106" y1="250" x2="106" y2="60" stroke={ink} strokeWidth="1.25" />
          <line x1="314" y1="250" x2="314" y2="60" stroke={ink} strokeWidth="1.25" />
          <line x1="326" y1="250" x2="326" y2="60" stroke={ink} strokeWidth="1.25" />
          {/* Floor slabs (cut, hatched) */}
          {[250, 186, 122].map((y) => (
            <g key={y}>
              <line x1="80" y1={y - 12} x2="340" y2={y - 12} stroke={ink} strokeWidth="1.5" />
              <line x1="80" y1={y} x2="340" y2={y} stroke={ink} strokeWidth="1.5" />
              {Array.from({ length: 12 }, (_, i) => 92 + i * 21).map((x) => (
                <line key={x} x1={x} y1={y - 12} x2={x - 8} y2={y} stroke={inkFaint} strokeWidth="0.75" />
              ))}
            </g>
          ))}
          {/* Roof slab + parapet */}
          <line x1="80" y1="60" x2="340" y2="60" stroke={ink} strokeWidth="1.5" />
          <line x1="80" y1="48" x2="340" y2="48" stroke={ink} strokeWidth="1.5" />
          <line x1="80" y1="48" x2="80" y2="34" stroke={ink} strokeWidth="1.25" />
          <line x1="340" y1="48" x2="340" y2="34" stroke={ink} strokeWidth="1.25" />
          {/* Stair flights between floors (right bay) */}
          <line x1="240" y1="238" x2="300" y2="198" stroke={goldFaint} strokeWidth="1.25" />
          <line x1="240" y1="174" x2="300" y2="134" stroke={goldFaint} strokeWidth="1.25" />
          {[0, 1, 2, 3].map((i) => (
            <line key={i} x1={246 + i * 14} y1={234 - i * 10} x2={246 + i * 14} y2={238 - i * 10 + 4} stroke={goldFaint} strokeWidth="1" />
          ))}
          {/* Level markers */}
          {[
            [250, "±0.00"],
            [186, "+3.20"],
            [122, "+6.40"],
            [48, "+9.60"],
          ].map(([y, lvl]) => (
            <g key={lvl as string}>
              <circle cx="368" cy={Number(y) - 6} r="7" stroke={gold} strokeWidth="1" />
              <line x1="361" y1={Number(y) - 6} x2="375" y2={Number(y) - 6} stroke={gold} strokeWidth="1" />
              <text x="382" y={Number(y) - 3} fontSize="8" fill={gold} style={label}>
                {lvl as string}
              </text>
            </g>
          ))}
          {/* Section tag */}
          <text x="210" y="300" textAnchor="middle" fontSize="9" fill={gold} style={label}>
            SECTION A–A - 1:50
          </text>
        </svg>
      )}

      {/* 19 - Inspection clipboard, approval stamp & client sign-off */}
      {variant === "approved" && (
        <svg viewBox="0 0 440 300" fill="none" className="absolute bottom-0 left-2 sm:left-10 w-[280px] sm:w-[420px]">
          {/* Clipboard */}
          <rect x="30" y="34" width="190" height="240" rx="8" stroke={ink} strokeWidth="1.5" />
          <rect x="40" y="44" width="170" height="220" rx="4" stroke={inkFaint} strokeWidth="0.75" />
          <rect x="100" y="22" width="50" height="20" rx="6" stroke={ink} strokeWidth="1.25" />
          <circle cx="125" cy="32" r="4" stroke={inkFaint} strokeWidth="1" />
          {/* Checklist rows */}
          {[72, 108, 144].map((y) => (
            <g key={y}>
              <rect x="54" y={y} width="14" height="14" stroke={ink} strokeWidth="1.25" />
              <path d={`M 57 ${y + 7} l 4 4 l 7 -9`} stroke={gold} strokeWidth="1.5" />
              <line x1="80" y1={y + 7} x2="196" y2={y + 7} stroke={inkFaint} strokeWidth="1" />
            </g>
          ))}
          <text x="54" y="188" fontSize="8" fill={goldFaint} style={label}>
            QUALITY - PASSED
          </text>
          <text x="54" y="206" fontSize="8" fill={goldFaint} style={label}>
            HANDOVER - DONE
          </text>
          {/* Snag-free note lines */}
          <line x1="54" y1="228" x2="196" y2="228" stroke={inkFaint} strokeWidth="1" />
          <line x1="54" y1="244" x2="160" y2="244" stroke={inkFaint} strokeWidth="1" />

          {/* Approval stamp - rotated double frame */}
          <g transform="rotate(-12 320 120)">
            <rect x="248" y="86" width="144" height="66" rx="8" stroke={gold} strokeWidth="1.5" />
            <rect x="255" y="93" width="130" height="52" rx="5" stroke={goldFaint} strokeWidth="1" />
            <text x="320" y="120" textAnchor="middle" fontSize="16" fill={gold} style={label}>
              APPROVED
            </text>
            <text x="320" y="136" textAnchor="middle" fontSize="7" fill={goldFaint} style={label}>
              QA / QC - SITE OK
            </text>
          </g>

          {/* Client signature */}
          <path
            d="M 258 218 C 272 196, 286 234, 302 210 S 330 196, 340 214 S 366 224, 382 204"
            stroke={ink}
            strokeWidth="1.25"
          />
          <line x1="250" y1="234" x2="392" y2="234" stroke={gold} strokeWidth="1" />
          <text x="321" y="252" textAnchor="middle" fontSize="8" fill={gold} style={label}>
            CLIENT SIGN-OFF
          </text>
        </svg>
      )}

      {/* 18 - Sun-path study over a proposed footprint */}
      {variant === "sunpath" && (
        <svg viewBox="0 0 440 260" fill="none" className="absolute bottom-0 right-2 sm:right-10 w-[290px] sm:w-[430px]">
          {/* Solar arcs */}
          <path d="M 60 210 A 160 160 0 0 1 380 210" stroke={inkFaint} strokeWidth="1" strokeDasharray="7 5" />
          <path d="M 95 210 A 125 125 0 0 1 345 210" stroke={ink} strokeWidth="1" />
          <path d="M 130 210 A 90 90 0 0 1 310 210" stroke={inkFaint} strokeWidth="1" strokeDasharray="7 5" />
          {/* Hour ticks on outer arc */}
          {[-60, -30, 0, 30, 60].map((deg) => {
            const rad = ((deg - 90) * Math.PI) / 180;
            const x1 = 220 + 160 * Math.cos(rad);
            const y1 = 210 + 160 * Math.sin(rad);
            const x2 = 220 + 168 * Math.cos(rad);
            const y2 = 210 + 168 * Math.sin(rad);
            return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke={inkFaint} strokeWidth="1" />;
          })}
          {/* Suns: morning + evening outline, noon gold with rays */}
          {[
            [110, 148],
            [330, 148],
          ].map(([x, y]) => (
            <circle key={`${x}`} cx={x} cy={y} r="7" stroke={gold} strokeWidth="1" />
          ))}
          <circle cx="220" cy="85" r="9" fill={gold} stroke="none" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            return (
              <line
                key={deg}
                x1={220 + 13 * Math.cos(rad)}
                y1={85 + 13 * Math.sin(rad)}
                x2={220 + 19 * Math.cos(rad)}
                y2={85 + 19 * Math.sin(rad)}
                stroke={gold}
                strokeWidth="1"
              />
            );
          })}
          {/* Proposed footprint + cast shadow */}
          <rect x="196" y="178" width="48" height="32" stroke={ink} strokeWidth="1.25" />
          <line x1="196" y1="178" x2="244" y2="210" stroke={inkFaint} strokeWidth="0.75" />
          {[250, 262, 274].map((x) => (
            <line key={x} x1={x} y1="210" x2={x + 16} y2="194" stroke={inkFaint} strokeWidth="0.75" />
          ))}
          {/* Horizon */}
          <line x1="30" y1="210" x2="410" y2="210" stroke={ink} strokeWidth="1.5" />
          {Array.from({ length: 12 }, (_, i) => 42 + i * 32).map((x) => (
            <line key={x} x1={x} y1="210" x2={x - 9} y2="219" stroke={inkFaint} strokeWidth="1" />
          ))}
          <text x="38" y="202" fontSize="9" fill={gold} style={label}>
            E
          </text>
          <text x="396" y="202" fontSize="9" fill={gold} style={label}>
            W
          </text>
          <text x="220" y="240" textAnchor="middle" fontSize="9" fill={gold} style={label}>
            SUN PATH - 13.0° N
          </text>
          <text x="134" y="130" fontSize="8" fill={goldFaint} style={label}>
            JUN 21
          </text>
          <text x="272" y="196" fontSize="8" fill={goldFaint} style={label}>
            DEC 21
          </text>
        </svg>
      )}

      {/* 17 - Drawing title block */}
      {variant === "titleblock" && (
        <svg viewBox="0 0 340 190" fill="none" className="absolute bottom-6 right-2 sm:right-10 w-[240px] sm:w-[330px]">
          <rect x="10" y="10" width="320" height="170" stroke={ink} strokeWidth="1.5" />
          <rect x="16" y="16" width="308" height="158" stroke={inkFaint} strokeWidth="0.75" />
          {/* Rows */}
          <line x1="10" y1="66" x2="330" y2="66" stroke={ink} strokeWidth="1" />
          <line x1="10" y1="104" x2="330" y2="104" stroke={ink} strokeWidth="1" />
          <line x1="10" y1="142" x2="330" y2="142" stroke={ink} strokeWidth="1" />
          {/* Columns on lower rows */}
          <line x1="170" y1="104" x2="170" y2="180" stroke={inkFaint} strokeWidth="1" />
          {/* Content */}
          <text x="24" y="34" fontSize="8" fill={goldFaint} style={label}>
            PROJECT
          </text>
          <text x="24" y="54" fontSize="11" fill={gold} style={label}>
            YOU DREAM - WE BUILD
          </text>
          <text x="24" y="84" fontSize="8" fill={goldFaint} style={label}>
            CLIENT
          </text>
          <text x="120" y="84" fontSize="9" fill={ink} style={label}>
            ────────────
          </text>
          <text x="24" y="122" fontSize="8" fill={goldFaint} style={label}>
            DRAWN
          </text>
          <text x="90" y="122" fontSize="9" fill={gold} style={label}>
            D.P.S.
          </text>
          <text x="184" y="122" fontSize="8" fill={goldFaint} style={label}>
            CHECKED
          </text>
          <text x="266" y="122" fontSize="9" fill={gold} style={label}>
            B.S.S.
          </text>
          <text x="24" y="162" fontSize="8" fill={goldFaint} style={label}>
            SCALE 1:100
          </text>
          <text x="184" y="162" fontSize="8" fill={goldFaint} style={label}>
            SINCE 1999
          </text>
        </svg>
      )}
      </motion.div>
    </div>
  );
}

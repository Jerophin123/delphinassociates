<div align="center">
  <img src="public/logo.jpg" alt="Delphin Associates Logo" width="250" />

  # Delphin Associates - Enterprise Commercial Website
  
  **"You Dream We Build. Building Trust Through Quality Since 1999."**

  <br />

  [![Next.js](https://img.shields.io/badge/Next.js-16.0.10-black?style=for-the-badge&logo=next.js)](#)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue?style=for-the-badge&logo=typescript)](#)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](#)
  [![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0.0-E83283?style=for-the-badge&logo=framer)](#)
  [![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=node.js)](#)
  [![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel)](#)
  [![License](https://img.shields.io/badge/License-Proprietary-red?style=for-the-badge)](#)

  <br />

  *A high-performance, SEO-optimized, and highly interactive digital platform bridging the gap between world-class civil construction engineering and modern web experiences.*

</div>

---

## 📑 Comprehensive Table of Contents

1. [Executive Summary & Business Context](#1-executive-summary--business-context)
2. [Core Philosophy & Engineering Guidelines](#2-core-philosophy--engineering-guidelines)
3. [System Architecture & Design Patterns](#3-system-architecture--design-patterns)
4. [Technology Stack Deep Dive](#4-technology-stack-deep-dive)
5. [System Requirements & Local Development](#5-system-requirements--local-development)
   - [IDE Configuration (VS Code)](#ide-configuration-vs-code)
   - [Environment Variables (Definitive Guide)](#environment-variables-definitive-guide)
6. [Detailed Folder & File Structure](#6-detailed-folder--file-structure)
7. [Comprehensive Component Documentation](#7-comprehensive-component-documentation)
   - [Floating Rule-Based Chatbot](#floating-rule-based-chatbot)
   - [Heuristic Page Optimization Engine (HPOE)](#heuristic-page-optimization-engine-hpoe)
   - [SEO Structured Data Injection](#seo-structured-data-injection)
   - [Global Layouts & Error Boundaries](#global-layouts--error-boundaries)
   - [Dynamic User Interfaces](#dynamic-user-interfaces)
8. [Extensive API Reference & Integration Details](#8-extensive-api-reference--integration-details)
   - [`POST /api/contact`](#post-apicontact)
   - [`POST /api/visitor-tracking`](#post-apivisitor-tracking)
9. [UI/UX, Styling & Design System](#9-uiux-styling--design-system)
   - [Color Palette & Typography](#color-palette--typography)
   - [Animation Protocols (Framer Motion)](#animation-protocols-framer-motion)
10. [State Management & Data Flow](#10-state-management--data-flow)
11. [Security Protocols & Data Privacy](#11-security-protocols--data-privacy)
12. [Monitoring, Observability & Analytics](#12-monitoring-observability--analytics)
13. [Deployment & CI/CD Pipelines](#13-deployment--cicd-pipelines)
14. [Developer Onboarding & Contribution Guidelines](#14-developer-onboarding--contribution-guidelines)
    - [Git Workflow Strategy](#git-workflow-strategy)
    - [Code Review Process](#code-review-process)
15. [Troubleshooting & FAQ](#15-troubleshooting--faq)
16. [Roadmap & Future Enhancements](#16-roadmap--future-enhancements)
17. [License & Legal](#17-license--legal)

---

## 1. Executive Summary & Business Context

Welcome to the **Delphin Associates** primary enterprise web application. Delphin Associates is recognized as a premier civil construction and building consultation entity headquartered in Chennai, Tamil Nadu. Established in 1999, the company holds over 25 years of impeccable industry experience, specializing in a multitude of architectural domains including:

- **Residential Construction**: Elite apartments, standalone villas, and modern flats.
- **Industrial & Commercial**: Heavy-duty manufacturing units, IT parks, and massive structural complexes like the Ford Alliance Group infrastructure.
- **Institutional Facilities**: State-of-the-art educational hubs and public sector requirements.
- **Church Buildings**: Specialized architectural capabilities for religious and community gathering spaces.

### Digital Transformation Goal
Historically, civil engineering firms operate via traditional referral networks. This application represents a massive paradigm shift for the business—acting not just as a static portfolio, but as a fully autonomous, 24/7 digital front door. The platform is intentionally engineered to capture inbound B2B and B2C leads, instantly triage customer intent via an AI-inspired heuristic chatbot, and seamlessly route high-value inquiries directly to administrative operations via integrations with Google Workspace (Gmail SMTP) and Google Cloud (Google Sheets Analytics).

---

## 2. Core Philosophy & Engineering Guidelines

This repository is governed by strict, uncompromising engineering standards designed to ensure absolute reliability, speed, and maintainability.

### The "Zero-Latency" Mandate
Construction clients value precision and speed. The web platform must reflect this. We achieve near-zero perceptual latency by heavily utilizing:
1. **React Server Components (RSC)**: Shipping zero JavaScript to the client for purely presentational layers (like the massive Hero sections or standard typography blocks).
2. **Aggressive Edge Caching**: Utilizing Next.js static generation wherever dynamic user data is not explicitly required.
3. **Optimistic UI**: All form submissions and interactive elements visually confirm action *before* the server completely resolves, preventing UI locking.

### Resiliency First
The construction sector operates non-stop; our lead pipelines must too. If a third-party service (like sending an email via Nodemailer) fails, our fallback mechanisms ensure data is still mutated and preserved securely in Google Sheets logging. If Google APIs experience an outage, fallback caching mechanisms hold data. 

### "Wow" Factor Native Design & Modern UI
We refuse to rely on heavy UI libraries (like MUI or Ant Design) which bloat bundles. Every component is painstakingly crafted using utility classes from **Tailwind CSS** and animated using **Framer Motion** spring physics. 

Recently, we've pioneered the **"Liquid Glass" UI System**—a hardware-aware styling engine that delivers premium, 60fps glassmorphism (backdrop blurs, frosted textures, and dynamic translucency) exclusively to high-performance hardware, while maintaining crisp, solid aesthetics for mobile and legacy devices.


---

## 3. System Architecture & Design Patterns

The architecture of this application firmly leverages the **Next.js App Router (v16)**. This isn't merely a framework choice; it fundamentally dictates our mental model for rendering and routing.

### Server-First Architecture
By default, every component inside the `app/` directory is a Server Component. This paradigm shift means:
- **Direct Backend Access**: Components can directly query the database or local file systems without exposing an API endpoint.
- **Improved Cumulative Layout Shift (CLS)**: The HTML is streaming directly from the server, styled and ready, obliterating "loading spinners" for static content.
- **Secure by Default**: Environment variables and secure keys embedded in these components are completely stripped from the client bundle.

### Client Boundaries (`"use client"`)
We strictly demarcate interactive zones using the `"use client"` directive. These are treated as "islands of interactivity."
- **Examples**: `FloatingChatbot.tsx`, interactive maps (`MapSection.tsx`), and the contact forms.
- **Rule of Thumb**: Push the `"use client"` directive as deep down the component tree as physically possible. Never wrap a layout or a high-level page component in `"use client"` unless unavoidable.

### Error Handling Typography
We implement granular, tiered error handling utilizing Next.js specific conventions:
- `global-error.tsx`: The ultimate catch-all. If the root layout fails, this static file guarantees the user sees a branded, apologetic UI rather than a bleak browser stack trace.
- `error.tsx`: Route-specific boundaries. If the `/projects` data fetch fails, only the projects section collapses, while the navigation and chatbot remain fully operational.
- `not-found.tsx`: A custom 404 page that strategically redirects lost users back into the sales funnel via prominent "Contact Us" or "View Services" CTA buttons.

---

## 4. Technology Stack Deep Dive

Our proprietary stack was meticulously curated. Below is the exhaustive reasoning and implementation details for each dependency listed in our `package.json`.

| Dependency | Version | Architectural Purpose & Justification |
| :--- | :--- | :--- |
| **`next`** | `^16.0.10` | The core meta-framework. chosen for SSR/SSG capabilities, Image optimization (`next/image`), and the revolutionary App Router architecture. |
| **`react`** & **`react-dom`** | `^19.2.3` | The underlying rendering engine. Version 19 supports Concurrent Features and actions natively. |
| **`tailwindcss`** | `^3.4.0` | Our exclusive styling engine. Compiles down to only the explicitly used CSS classes, guaranteeing a CSS payload usually under 10kb. |
| **`framer-motion`** | `^11.0.0` | Powers all complex animations, exit/enter transitions, and physics-based spring animations (like the Chatbot bubble bouncing). |
| **`lucide-react`** | `^0.469.0` | Highly legible, stroke-based scalable vector graphics. Exceptionally tree-shakeable. |
| **`nodemailer`** | `^8.0.3` | Server-side SMTP client. Used in our API routes to securely dispatch highly formatted HTML emails to both the business admins and end-users. |
| **`googleapis`** | `^171.4.0` | The official Google API client. We use this to establish a secure JWT Service Account connection to Google Sheets for CRM logging and telemetry tracking. |
| **`@vercel/analytics`** | `^1.5.0` | Plugar-and-play real user monitoring (RUM). Tracks Web Vitals (LCP, FID, CLS) implicitly. |
| **`clsx`** & **`tailwind-merge`**| `^2.1.0` | Utility libraries used in tandem to dynamically construct CSS strings without running into Tailwind specificity collisions. |

---

## 5. System Requirements & Local Development

This application operates in a modern Node.js ecosystem. To contribute to or deploy this application, absolute adherence to these environments is required.

### Hardware & OS Requirements
- **OS**: Windows 10/11, macOS (Intel/Apple Silicon), or Linux (Ubuntu 20.04+).
- **RAM**: Minimum 8GB (Next.js compilation pipelines can be memory intensive during hot module replacement).
- **Storage**: SSD highly recommended for fast `npm run dev` compilation times.

### Software Prerequisites
- **Node.js**: `v18.17.0` exactly, or `v20.x` LTS. Use **nvm** (Node Version Manager) to strictly police your local version.
- **Package Manager**: `npm` (v9+) or `pnpm` (v8+). 
- **Git**: v2.30+

### IDE Configuration (VS Code)
We heavily enforce code consistency. If using Visual Studio Code, ensure the following extensions are active:
1. **ESLint** (dbaeumer.vscode-eslint)
2. **Prettier - Code formatter** (esbenp.prettier-vscode)
3. **Tailwind CSS IntelliSense** (bradlc.vscode-tailwindcss)
4. **Error Lens** (usernamehw.errorlens) - Optional but highly recommended.

**Recommended `.vscode/settings.json`**:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

### Environment Variables (Definitive Guide)
Copy `.env.example` to `.env.local`. **NEVER** commit `.env.local` to version control. The `.gitignore` ensures this, but be vigilant.

#### 1. Google Cloud Platform Security Keys
To enable writing directly to the Google Sheets CRM Database, you must configure a Service Account inside the Google Cloud Console.

```env
# The email of the service account configured in GCP (e.g., something@project-id.iam.gserviceaccount.com)
GOOGLE_CLIENT_EMAIL="your-service-account-email@...iam.gserviceaccount.com"

# The literal private key string.
# CRITICAL: If using Vercel Dashboard, paste exactly as is.
# If local, ensure \n is interpreted correctly.
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_MASSIVE_ALPHANUMERIC_KEY_HERE\n-----END PRIVATE KEY-----\n"

# The specific ID in the Google Sheet URL (e.g., docs.google.com/spreadsheets/d/THIS_IS_THE_ID/edit)
GOOGLE_SHEET_ID="your_specific_google_sheet_id_here"
```

#### 2. SMTP Notification Pipeline (Gmail)
To prevent rate limiting and ensure deliverability, we utilize dedicated application-specific passwords.

```env
# The authorized outbound email address
GMAIL_USER="delphinassociates@gmail.com"

# The 16-character App Password generated via Google Account Security > 2-Step Verification
GMAIL_APP_PASSWORD="xxxx xxxx xxxx xxxx"
```

#### 3. General Next.js & Meta Configuration
```env
# Defines the absolute URL for canonical links, sitemaps, and strict CORS policies.
# Locally set to http://localhost:3000. In production, https://www.delphinassociates.com
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### Initiating the Local Environment

1. Clone the secure repository:
   ```bash
   git clone https://github.com/your-organization/delphin-associates.git
   cd delphin-associates
   ```

2. Clean install dependencies (bypassing cached artifacts if debugging):
   ```bash
   npm cache clean --force
   npm install
   ```

3. Spin up the Turbo-charged Next.js compiler:
   ```bash
   npm run dev
   ```

4. The server mounts on `http://localhost:3000`. Hot Module Replacement (HMR) allows instant feedback on saved edits.

---

## 6. Detailed Folder & File Structure

A massive codebase requires military-grade organization. Here is exactly where everything lives and why.

```text
delphin-associates/
├── .next/                         # Compiled build outputs. (Gitignored)
├── node_modules/                  # Package dependencies. (Gitignored)
├── public/                        # Static assets (Not bundled by Webpack/Turbopack)
│   ├── logo.jpg                   # Primary brand asset, used in headers & email CIDs
│   ├── favicon.png                # Standardized 512x512 maskable icon
│   ├── sitemap.xml                # Highly configured static XML mapping for Google Webmasters
│   └── robots.txt                 # SEO crawler directives
├── app/                           # The core App Router domain
│   ├── api/                       # Secure Serverless Backend Functions
│   │   ├── contact/
│   │   │   └── route.ts           # Mailing & Lead generation logic
│   │   └── visitor-tracking/
│   │       └── route.ts           # Silent telemetry collection
│   ├── about/                     # About Us feature hierarchy
│   │   └── page.tsx               # Server-rendered historical deep dive
│   ├── contact/                   # Contact infrastructure
│   │   └── page.tsx               # Renders standard forms and map injections
│   ├── projects/                  # Portfolio domain
│   │   └── page.tsx               # Heavily image-optimized masonry grid
│   ├── services/                  # Business offerings
│   │   └── page.tsx               # Detailed exposition of all 5 pillar services
│   ├── team/                      # Leadership & Hierarchy
│   │   └── page.tsx               # Profile renders
│   ├── font.ts                    # Next/Font integrations to strictly prevent layout shifts
│   ├── layout.tsx                 # THE Root Layout. Injects standard headers, footers, & analytics
│   ├── page.tsx                   # The root index homepage
│   ├── error.tsx                  # Standard React Error Boundary interceptor
│   ├── global-error.tsx           # Absolute fallback (renders pure HTML if everything burns down)
│   └── not-found.tsx              # Custom 404 hijacking
├── components/                    # The Reusable React Component Library
│   ├── ui/                        # Micro-components (Buttons, Inputs, Cards - atom level)
│   ├── contact/                   # Contact-specific client components
│   │   ├── ContactForm.tsx        # Complex state-driven controlled form with Zod validation patterns
│   │   └── MapSection.tsx         # Lazy-loaded interactive Google Maps iframe
│   ├── FloatingChatbot.tsx        # BEHEMOTH component handling rule-based AI & 'Liquid Glass' UI
│   ├── Footer.tsx                 # Standardized global footer with 12-column grid compliance
│   ├── Navigation.tsx             # Responsive header, handles scroll locking and hamburger menus
│   ├── PerformanceProvider.tsx    # Hardware-aware environment profiler & tier manager
│   ├── SEOStructuredData.tsx      # Headless component pumping dynamic JSON-LD into the <head>
│   └── services/
│       └── ServicesCTA.tsx         # Standardized 'Liquid Glass' call-to-action component

├── lib/                           # Abstracted Business Logic & Services
│   ├── email-templates.ts         # Hardcoded, table-based archaic HTML/CSS for perfect email client rendering
│   ├── google-sheets.ts           # JWT authentication and array-appending abstractions for the API
│   └── utils.ts                   # Generic helper functions (e.g., `cn` for tailwind-merge)
├── tailwind.config.ts             # Defining our proprietary design tokens (Colors, Fonts, Screen Breakpoints)
├── postcss.config.js              # PostCSS plugins wiring Tailwind
├── tsconfig.json                  # Strict TypeScript compiler definitions
└── package.json                   # The nervous system of dependencies and script orchestration
```

---

## 7. Comprehensive Component Documentation

Every component in this repository was built to be scalable, isolated, and completely idempotent. Below are deep-dives into our most complex proprietary components.

### Floating Rule-Based Chatbot (`components/FloatingChatbot.tsx`)

This is the crown jewel of our client-side interaction. Rather than paying extensive AI API costs (OpenAI/Anthropic) for a civil engineering portfolio site, we engineered a hyper-fast, heuristic-based finite state machine capable of guiding users through complex flows.

#### State Machine Flow:
The Chatbot utilizes complex React `useState` hooks to manage a "Form Flow" without ever leaving the floating widget.
- **`formStep` Type**: `"none" | "name" | "email" | "phone" | "subject" | "message" | "submitting" | "done" | "ask_anything_mode"`
- When a user clicks "Contact Us" within the bot, the bot shifts into a controlled sequence. It disables raw text input natively and forces the user to progress through sequential queries (Name -> Email -> Phone -> Message).
- At the end of the sequence, it seamlessly formats the aggregated `FormData` array and fires a `POST` request directly to `/api/contact`, acting as a miniaturized headless CMS client.

#### Rule-Based NLP:
Using a highly optimized `getAnswerFromKnowledgeBase(question: string)` regex/string-matching function, the bot dissects user queries.
If the user types "Where are your apartments?", the function catches `apartment` and instantly serves: *"We build premium residential flats with modern amenities. Our featured projects include flats in T. Nagar, West Mambalam, and Kolathur."*
This operates with **0ms latency** because the logic is bundled locally inside the client script.

#### Premium "Liquid Glass" Skins:
- **High-Tier Interface**: On flagship hardware, the bot renders with a full frosted-gold glass body, `backdrop-blur-md`, and custom translucent message bubbles.
- **Modern Scrollbar**: Features a bespoke golden-glass scrollbar logic that prevents browser default "jank" and matches the high-end aesthetic.
- **Contrast-Optimized Icons**: Dynamically swaps profile icons to black when rendered on glass to ensure WCAG-compliant readability without sacrificing the "luxury" look.
- **Mobile First Adaptation**: On viewports under `sm` (640px), we proactively hide secondary quick options ("View Services", "Projects") and exclusively render the minimal chat bubble. This guarantees the user's thumb has full access to the actual site content without a massive UI overlay blinding them.


### SEO Structured Data Injection (`components/SEOStructuredData.tsx`)

To dominate Chennai's local SEO for "Civil Construction", standard `<title>` and `<meta>` tags are insufficient. We utilize programmatic JSON-LD injection.
- **Implementation**: The component accepts a prop `type?: "Organization" | "LocalBusiness" | "WebSite"`.
- Depending on the route it is spawned in, it crafts a distinct schema.
- **`LocalBusiness` Schema**: Includes hyper-specific metadata such as `geo` coordinates (Latitude 12.958168, Longitude 80.203867), `openingHoursSpecification`, `priceRange`, and an exhaustive `hasOfferCatalog` listing our specific services. 
- **Google Knowledge Graph**: Automatically binds our social networks (Instagram, X, LinkedIn, Threads) in the `sameAs` array, ensuring Google parses Delphin Associates as a verified, multi-platform corporaton.

### Heuristic Page Optimization Engine (HPOE) (`components/PerformanceProvider.tsx`)

Because civil architecture demands an uncompromising, cinematic web presence containing heavy glassmorphism, overlapping CSS filters, and massive radial blurs (`backdrop-filter: blur(120px)`), rendering the site natively on lower-end devices would cause severe layout thrashing and scrolling lag. We engineered a highly sophisticated, real-time algorithmic workaround known as the **Heuristic Page Optimization Engine (HPOE)**.

#### Phase 1: The "Deep Scan" (Hardware Heuristics)
Unlike standard media queries, HPOE performs a multi-dimensional analysis of the device's internal specifications on every load:
- **GPU Signature Unmasking**: Using a hidden WebGL canvas, HPOE unmasks generic renderer strings to identify the raw hardware vendor and renderer (e.g., `Apple M2`, `Nvidia RTX`, `Adreno 740`).
- **Memory & Compute Density**: Queries `navigator.deviceMemory` and `navigator.hardwareConcurrency` to classify the machine’s multitasking and multi-core processing capability.
- **Regex Signature Matrix**: A massive, proprietary RegExp engine targets all major Desktop and Mobile ecosystems (Apple, NVIDIA, AMD, Intel, Qualcomm, Samsung, MediaTek, ARM Mali, PowerVR).

#### Phase 2: Tier Classification (Fidelity Mapping)
HPOE maps the hardware results into four distinct visual fidelity tiers:
- **HIGH (Flagship)**: Unlocks full cinematic interactivity including Geometric Particle Fields, 3D Tilts, and "Liquid Glass" (frosted glass blurs).
- **MID (Performance)**: Retains premium layouts but disables expensive backdrop-filters to ensure perfect 60fps scrolling on mid-range laptops and phones.
- **LOW (Balanced)**: Enforces flat, opaque aesthetics and strips heavy animations for budget/legacy devices.
- **VERY LOW (Ultra-Low Spec)**: "Rock-bottom" reliability mode using pure solid colors and zero gradients for ultra-low-spec hardware (<= 2GB RAM).

#### Phase 3: The Sustained FPS Guard (Real-Time Safety Net)
This is the "living" part of the engine. HPOE monitors the actual frame rate (FPS) during user interaction:
- **Thermal Throttling Detection**: If the device begins to overheat or background processes cause the FPS to drop below **45 FPS** for 3 consecutive seconds, HPOE triggers an **Emergency Downgrade**.
- **Mid-Session Battery Saver Detection**: Uniquely identifies when the OS or user forcefully caps the refresh rate to 30Hz. By verifying stable pacing (averaging ~30fps with `< 45ms` frame delta jitter), the engine dynamically re-calibrates downgrade thresholds (e.g., dropping the acceptable floor down to 22 FPS) rather than aggressively stripping premium animations. This ensures laptops and phones on battery saver retain the "Liquid Glass" aesthetics while honoring the OS-level frame limits.
- **Real-Time UI Adaptation**: The engine gracefully strips heavy DOM elements and filters in real-time without requiring a page refresh, ensuring the user experience remains fluid regardless of environmental changes.

#### Zero-Latency Execution
HPOE is architected to be exceptionally lightweight, executing its full hardware scan and benchmark in under 50ms upon initialization. By bypassing caching, HPOE ensures that system changes (like entering Battery Saver mode or plugging in a high-res monitor) are respected immediately upon the next visit.

#### Pseudocode Architecture
For developers needing a high-level understanding of the engine's control flow, here is the simplified pseudocode:

```text
FUNCTION Initialize_HPOE():
  1. Extract core_count = navigator.hardwareConcurrency
  2. Extract memory = navigator.deviceMemory
  3. Detect is_mobile = Regex(UserAgent)
  4. Detect is_reduced_motion = Window.matchMedia("prefers-reduced-motion")
  
  5. Try:
       canvas_context = create(WebGL_Context)
       gpu_renderer_string = canvas_context.getExtension("WEBGL_debug_renderer_info").UNMASKED_RENDERER
       max_texture_size = canvas_context.getParameter(MAX_TEXTURE_SIZE)
     Catch:
       gpu_renderer_string = "unknown"
       
  6. Calculate Hardware Tier (HIGH, MID, LOW, VERY_LOW):
       IF gpu_renderer_string MATCHES "Apple M[1-9] (Max|Pro|Ultra)": Return HIGH
       IF gpu_renderer_string MATCHES "NVIDIA RTX|GTX High": Return HIGH
       IF gpu_renderer_string MATCHES "AMD RDNA|Vega High": Return HIGH
       IF gpu_renderer_string MATCHES "Snapdragon 8|Adreno 700|Apple A-Series": Return MID
       IF gpu_renderer_string MATCHES "Intel Iris|Arc": Return MID
       
       IF IS_MOBILE AND Calculated_Tier == HIGH: 
           Calculated_Tier = MID // Hard cap for mobile thermals
           
       IF core_count <= 2 OR memory <= 2: Return VERY_LOW
       
  7. Apply Calculated Tier to Document Root (e.g., data-tier="mid")
  
  8. Start Sustained FPS Guard (Only if Tier != LOW/VERY_LOW):
       LOOP every RequestAnimationFrame:
         Calculate current_FPS and max_frame_delta
         
         IF stable 30fps pacing detected (avg=30 AND max_frame_delta < 45ms):
             Activate Battery Saver Mode -> dynamically lower threshold_FPS (e.g., from 45 to 22)
         
         IF current_FPS < threshold_FPS for N consecutive ticks:
             Trigger Emergency Downgrade (e.g., HIGH -> MID)
             Apply new Tier State (drops heavy DOM elements deferentially)
```

### Global Layouts & Error Boundaries

- **`layout.tsx`**: Wraps the entire application. Loads custom Google Fonts via `next/font/google` (zero CLS), spawns the Global Vercel Analytics provider, and ensures the `<FloatingChatbot />` and `<Footer />` surround every subsequent page.
- **`error.tsx`**: Next.js automatically passes the `error` object and a `reset` function. Our boundary renders an apologetic, branded interface capturing the error silently in the console, while offering a prominent "Try Again" or "Return Home" button.

### Dynamic User Interfaces (Forms & Maps)
- **`ContactForm.tsx`**: An expansive grid layout accommodating large inputs. Validates strictly before invoking backend fetch commands. Disables the submit button visually (`opacity-50 cursor-not-allowed`) during asynchronous fetching to prevent database duplication.
- **`MapSection.tsx`**: Since iframes are aggressively heavy on main-thread blocking, we utilize native `loading="lazy"` attributes on the Google Maps embed, ensuring it only fetches the massive Google payload when the user scrolls near the footer.

---

## 8. Extensive API Reference & Integration Details

Our backend is powered by Next.js Serverless Functions. They boot up instantly, execute logic, and kill themselves to conserve compute resources.

### `POST /api/contact`
The central nervous system for our lead generation.

#### Internal Workflow Sequence:
1. **Parses & Validates**: Extracts JSON payload. If `name`, `email`, or `message` is missing, immediately aborts with `HTTP 400 Bad Request`.
2. **SMTP Instantiation**: Connects to the Gmail relays via NodeMailer using the `GMAIL_APP_PASSWORD`.
3. **Template Compilation**: Passes the raw data to `getClientEmailHTML()` and `getAdminEmailHTML()` located in `lib/email-templates.ts`. These templates use strict inline CSS to guarantee absolute rendering conformity across Outlook, Apple Mail, and Gmail.
4. **Data Multiplexing**: 
   - Fires an email to the client: *"Thank you for contacting Delphin Associates..."*
   - Fires an email to the admin: *"URGENT: New Lead from [Name]..."*
   - Uses `Promise.all` to fire these concurrently, slashing API execution time by roughly 50%.
5. **Analytics Logging**: Even if an email bounces or Google blocks the SMTP, a `try/catch` wrapper ensures the application still fires `appendToGoogleSheet()`. This guarantees zero lead loss.

#### Request Body Schema (TypeScript):
```typescript
interface ContactData {
  name: string;
  email: string;
  phone: string;     // Must be a valid string, handles '+' logic.
  subject: string;   // Dropdown mapped or user-defined
  message: string;   // Sanitized text payload
}
```

#### Example cURL:
```bash
curl -X POST https://www.delphinassociates.com/api/contact \
     -H "Content-Type: application/json" \
     -d '{
           "name": "Jane Architect",
           "email": "jane@example.com",
           "phone": "9940306399",
           "subject": "Commercial Partnership",
           "message": "We need a massive factory built."
         }'
```

---

### `POST /api/visitor-tracking`
A silent telemetry gathering conduit.

#### Internal Workflow Sequence:
Designed to be invoked by a global `useEffect` inside a top-level component. It gathers non-PII (Personally Identifiable Information) regarding the user's session footprint.
1. Evaluates window properties (Screen resolution, User-Agent, Referrer URLs).
2. Ships a lightweight JSON payload to the edge function.
3. Authenticates immediately with `googleapis` using the Service Account JWT.
4. Locates the active targeted sheet via `GOOGLE_SHEET_ID`.
5. Appends a new row synchronously. Let's business admins track which marketing campaigns are driving the most traffic.

---

## 9. UI/UX, Styling & Design System

Building a cohesive brand identity requires strict adherence to predefined constraints. We don't guess pixel values; we use our design system.

### Tailwind Configuration (`tailwind.config.ts`)
We extended the default Tailwind palette with our exact brand hex codes:
- **`primary`**: `#0A0A0A` (Rich, deep abyss black for backgrounds, providing unbelievable contrast and premium luxury feel).
- **`primary-dark`**: `#050505` (Used for headers/footers to create depth mapping).
- **`accent`**: `#F2C94C` (An elegant, bright gold representing trust, luxury, and premium build quality).
- **`accent-light`**: `#F4D36D` (Used strictly for hover states to indicate interactability).

### Typography Rules
We enforce a premium typography system ensuring consistent, modern aesthetics that align with high-end architecture.
- **Display Typeface (`Montserrat`)**: Utilized for massive `h1`, `h2`, and structural headings. Configured with specific weights, clean geometric alignment, and strict letter-spacing to project unyielding strength and luxury.
- **Body Typeface (`Inter`)**: Highly legible, modern sans-serif used for deep paragraphs, interactive UI text, and components, ensuring flawless readability and responsive scaling across all devices.

### The "Liquid Glass" System & UI Hierarchical Split
We have pioneered a hardware-aware **Hierarchical UI Split** that ensures the aesthetic matches the device's thermal and computational budget. The style is not static; it is a spectrum of fidelity:

#### 1. High Tier: "Liquid Glass" (Flagship Performance)
Designed for modern desktops with discrete GPUs and M-Series Silicon.
- **Visuals**: Primary use of `backdrop-filter: blur(24px)` (frosted glass).
- **Insignias**: Glass-morphic icon containers with `border-top: 1px solid rgba(255,255,255,0.7)`.
- **Interactions**: Complex physics-based animations and 3D floating shadows.
- **Buttons**: Inverted glass-gold buttons (`liquid-glass-btn-accent-invert`).

#### 2. Mid Tier: "Translucent Profile" (Mainstream Efficiency)
Designed for mid-range laptops, high-end Android, and older iPhones.
- **Visuals**: Replaces blur with high-quality **alpha-translucency** (`rgba(255,255,255,0.8)`).
- **Optimization**: Disables backdrop filters entirely to prevent GPU overdraw and lag during scroll events.
- **Shadows**: Maintains standard soft shadows for depth without the computation of blurred background layers.

#### 3. Low Tier: "Opaque Profile" (Absolute Performance)
Designed for budget devices, legacy hardware, and "Reduced Motion" accessibility modes.
- **Visuals**: **Solid Opaque** backgrounds (`#FFFFFF` or `#0A0A0A`).
- **Optimization**: Strips all transparency and shadows to ensure the paint-to-pixel pipeline is as short as possible.
- **Reliability**: Guarantees a stable 60fps experience even on devices with minimal VRAM and low core counts.

#### Implementation & Context
- **Utility Classes**: Found in `globals.css` (e.g., `.liquid-glass-card-light`, `.liquid-glass-msg`).
- **Dynamic Context**: Components consume the `usePerformance()` hook to toggle between these profiles seamlessly based on real-time hardware profiling.

### Animation Protocols (Framer Motion)
Websites without motion feel static and dead. We breathe life into the site, but responsibly.
- **Scroll Revealing & Sliding**: We use `whileInView` extensively. When elements enter the viewport, they are assigned entering animations (e.g., `initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}`). Recently implemented dynamic left-to-right sliding animations for key content blocks to guide the user's eye gracefully through the funnel.
- **Micro-Interactions**: Buttons and navigational tools (like the repositioned, bottom-center Floating Scroll Button) don't just change color; they physically react. Buttons possess `whileHover={{ scale: 1.02 }}` and `whileTap={{ scale: 0.98 }}`, offering visceral, tactile feedback mimicking physical pressing.

---

## 10. State Management & Data Flow

Because we lean heavily into Next.js App Router server features, complex global state management (Redux, Zustand) is entirely unnecessary and explicitly banned from this repository.

1. **Server State**: Managed natively by Next.js fetch caching. If we request data, the framework deduplicates it and holds it in the data cache.
2. **Local Component State**: Handled strictly via React `useState`. State is aggressively lifted only to the closest common ancestor, and drilled down via props. 
3. **Context Boundaries**: Used sparingly. There is no global application context right now, keeping our Tree incredibly lean.

---

## 11. Security Protocols & Data Privacy

Security is paramount, especially when handling user emails, phone numbers, and enterprise API keys.

- **Vulnerable Data Obfuscation**: Keys like `GOOGLE_PRIVATE_KEY` and `GMAIL_APP_PASSWORD` never, under any circumstances, leak to the client. They are assessed exclusively inside the `/api/` node containers.
- **Cross-Origin Resource Sharing (CORS)**: Our Serverless functions by default only accept requests originating from the exact domain they are hosted on, nullifying external domain POST attacks.
- **Input Sanitization**: While simplistic, the Next.js `Request` parsing strips malicious binaries. Future integrations will heavily utilize `Zod` validation schemas to parse objects prior to SQL or Sheet insertions.

---

## 12. Monitoring, Observability & Analytics

Deploying code and blindly hoping it works is unacceptable.
- **Vercel Analytics**: Out of the box, our layout imports exactly one tiny script: `@vercel/analytics/react`. This feeds directly into the Vercel logging dashboard, giving us instant heatmaps on page views, unique visitors, Top referring domains, and regional geolocation data without requiring the massive overhead and cookie-banners associated with Google Analytics 4 (GA4).
- **Google Sheets as DB Logs**: The ultimate fail-safe. By utilizing API route logging, we treat our internal Google Sheets as an immutable historical ledger of every single form submission iteration.

---

## 13. Deployment & CI/CD Pipelines

Our repository natively binds to Vercel's global edge network.

### The CI/CD Pipeline
1. **Push & Build**: When code is pushed to the `main` branch on GitHub/GitLab, Vercel listens via a webhook.
2. **Linting Check**: Vercel runs `npm run lint`. If ESLint spots an unused variable or an unescaped entity, the build **fails immediately**. We do not deploy broken code.
3. **Type Checking**: TypeScript compiler executes `tsc --noEmit`. Any type errors or unknown props will halt the build pipeline.
4. **Static Optimization**: The compiler generates HTML for the Home, About, Services, and Project pages.
5. **Edge Deployment**: The optimized bundle is sharded and replicated across 30+ global server nodes ensuring a user in Chennai and a user in New York experience identical sub-100ms load times.

### Environment Promotion
- **Preview Deployments**: Push to any branch other than `main` generates a unique, isolated URL (e.g., `delphin-associates-git-feature-x-username.vercel.app`). This allows stakeholders to visually test changes before merging to production.

---

## 14. Developer Onboarding & Contribution Guidelines

Joining the engineering team? Here are the rules of engagement.

### Git Workflow Strategy
We operate a simplified trunk-based development strategy.
1. Check out the latest `main`: `git checkout main && git pull origin main`
2. Create a declarative feature branch: `git checkout -b feature/floating-chatbot-mobile-fix` or `bugfix/smtp-auth-error`
3. Commit often using Conventional Commits logic:
   - `feat: added json-ld schema to projects page`
   - `fix: constrained viewport overflow on iphone 12`
   - `chore: updated dependencies`
4. Push your branch upstream, open a Pull Request (PR).

### Code Review Process
- Your PR must clearly state **What** was changed and **Why**.
- Include screenshots in the PR description if it alters the visual UI.
- All ESLint warnings must be resolved prior to requesting a review.
- Wait for a minimum of 1 approval from a senior maintainer prior to smashing the merge button.

### Refactoring Memos
If you spot an opportunity to abstract a component (e.g., pulling a standard button out of `ContactForm.tsx` into `components/ui/PrimaryButton.tsx`), do it. We encourage aggressive refactoring towards reusable atomics, provided it does not break functionality.

---

## 15. Troubleshooting & FAQ

**Q: `npm run dev` instantly crashes with an error about Google Credentials.**
A: Ensure your `.env.local` file contains the exact `GOOGLE_PRIVATE_KEY` string. If your key has literal `\n` characters in the string from a JSON file, ensure you copy the entire thing with quotes, or format it cleanly for dotenv to parse.

**Q: The application runs but Emails are not sending via the Contact API.**
A: First, check the Node terminal for Nodemailer stack traces. Commonly, Google disables App Passwords if an account is compromised or 2FA is disabled. You must have 2FA enabled on the `delphinassociates@gmail.com` account to generate valid App Passwords.

**Q: Tailwind classes aren't applying correctly.**
A: Sometimes Webpack aggressively caches classes. Shut down the server `CTRL+C`, delete the `.next` directory (`rm -rf .next`), and restart the server `npm run dev`.

---

## 16. Roadmap & Future Enhancements

Our architecture is scalable to infinity. We plan to augment this platform with:
- [ ] **Content Management System (CMS) Integration**: Moving the static portfolio items in `/projects` into an external headless CMS (like Sanity or Strapi) to allow administrative staff to upload new construction project photos without code deployment.
- [ ] **Zod Validation Pipelines**: Upgrading our API route input validations from manual `if (!data)` checks to rigorous Zod schema parsing.
- [ ] **Dynamic Pricing Calculators**: Creating a client-side calculator where users can estimate construction costs based on square footage and material grades.
- [ ] **Client Portal**: Allowing active clients to log in and view live progress photos of their ongoing construction sites.

---

## 17. License & Legal

This entire application—including all custom UI architectures, heuristic chatbot logic, backend telemetry models, database connector philosophies, SVG aggregations, color mapping systems, linguistic knowledge bases, and architectural methodologies—is the strict proprietary property of **Delphin Associates**.

No part of this software repository, neither complete nor atomic, may be duplicated, reverse-engineered, sub-licensed, open-sourced, or distributed publicly without the express, written consent of the executive board of Delphin Associates.
**Copyright © 2026 Delphin Associates - Building Trust Through Quality. All Rights Reserved.**

---
<p align="center">
  <i>"Where unyielding civil engineering principles meet cutting-edge web performance."</i>
</p>

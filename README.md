# Toucan Payments — Premium Fintech Payment Platform Frontend

A production-grade, responsive, and strictly light-themed enterprise frontend for **Toucan Payments** (`toucanpay.in` & `toucanus.com`), built with Next.js 14, React 18, TypeScript, Tailwind CSS, Three.js (WebGL), and Lucide Icons.

---

## 1. Verified Brand & Regulatory Baseline

- **Brand Name**: Toucan Payments / ToucanOS
- **Typography**: `Space Grotesk` (geometric high-tech headings) paired with `Inter` / system-ui for dense financial data.
- **Brand Accents**: Toucan Electric Cyan (`#0284C7`), Royal Fintech Blue (`#2855C5`), Midnight Navy (`#000045`), Settlement Green (`#10B981`).
- **Verified Official Vector Assets (`public/brand/`)**:
  - `logo.svg` — Official Toucan vector mark and logotype
  - Regulatory badges: `rbi.svg` (RBI PA-CB), `bharat-connect.svg`, `bbps.svg`, `pacb.svg`
  - Security certifications: `pci-dss.svg` (PCI DSS Level 1), `pci-ssf.svg`, `iso.svg` (ISO 27001), `eta.svg`
  - Banking network partners: `yes-bank.svg`, `axis-bank.svg`, `visa.svg`, `master-card.svg`, `currencycloud.svg`
  - Verified customer case studies: `nmb-bank.svg`, `KPay.svg`, `cellPay.svg`
  - Product & orchestration iconography: `orchestration.svg`, `processor-abstraction.svg`, `settlement-coordination.svg`, `resilience.svg`, `operational-control.svg`, etc.

---

## 2. Mandatory Strict Light-Theme Design System

> [!IMPORTANT]
> **LIGHT THEME ONLY — NON-NEGOTIABLE**
> In strict accordance with the project requirements, dark mode, dark dashboard variants, and operating system theme switching are completely excluded. All marketing pages, checkout screens, dashboards, developer consoles, and dialogs remain clean, bright, and legible.

### Core Design Tokens

| Token | Hex Value | Purpose |
| :--- | :--- | :--- |
| **Page Canvas** | `#FFFFFF` / `#F8FAFD` | Main page background |
| **Card Surface** | `#FFFFFF` | Panels, cards, modal dialogs |
| **Subtle Surface** | `#F3F6FB` | Table headers, sidebars, interactive chips |
| **Primary Text** | `#172033` | Dense, legible ink for headings & amounts |
| **Secondary Text** | `#596579` | Descriptive copy, captions, timestamps |
| **Primary Accent** | `#2855C5` / `#0284C7`| Interactive buttons, active rails, focus rings |
| **Borders** | `#D9E0EB` | Inputs, cards, data dividers |

---

## 3. Creative Landing Page Directions

The primary landing page (`/`) implements **Concept A (Toucan SuperStream)** while providing an interactive switcher directly in the Hero allowing reviewers to explore all three creative directions:

- **Concept A — Toucan SuperStream (Primary Implemented)**: Technology-led experience featuring a real-time 3D WebGL payment network globe, floating glass/metallic orchestration nodes, live transaction packet particles, and millisecond latency routing indicators.
- **Concept B — One Platform, Multiple Capabilities**: Enterprise-focused experience emphasizing operational clarity across AcquireFlow (Domestic Gateway), SchoolHub (BBPS Collections), and Cross-Border PA-CB trade settlements.
- **Concept C — Payments in Motion**: Motion-driven editorial experience highlighting live stream counters, transaction velocity, and real-time switch health.

---

## 4. Application Architecture & Route Inventory

```
toucan-pay/
├── public/brand/               # 26 Verified official vector SVG assets
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout (Strict light theme, meta, nav, footer)
│   │   ├── page.tsx            # Complete production homepage
│   │   ├── checkout/page.tsx   # Hosted Customer Checkout Engine
│   │   ├── onboarding/page.tsx # 4-Step Merchant Onboarding Journey
│   │   ├── developers/page.tsx # Public Developer Hub & API Reference
│   │   ├── admin/page.tsx      # Super-Admin Operations & Provider Health
│   │   └── dashboard/
│   │       ├── layout.tsx      # Merchant Console shell (Sidebar & Topbar)
│   │       ├── page.tsx        # Overview KPI metrics & velocity chart
│   │       ├── transactions/   # Filterable ledger, audit drawer, refund modal
│   │       ├── settlements/    # Balances, bank UTRs, reconciliation reports
│   │       ├── payment-links/  # Link generator modal, QR preview
│   │       ├── billing/        # Subscriptions, line items, GST PDF invoice modal
│   │       ├── developer/      # API key management, webhook event simulator
│   │       └── risk/           # Risk scores, velocity rules, dispute evidence
│   ├── components/
│   │   ├── navigation/         # Navbar (Mega-menu, mobile drawer) & Footer
│   │   ├── hero/               # HeroSection & Hero3DCanvas (Three.js WebGL)
│   │   └── sections/           # Bento, SuperStream, Playground, Analytics, etc.
│   └── lib/                    # Mock datasets, types, currency/date formatters
```

---

## 5. Development & Build Instructions

### Prerequisites
- Node.js >= 18 (Tested on Node v24.20.0)
- npm >= 9

### Local Setup
```bash
# Navigate to project directory
cd "f:\gigglzen\toucan pay"

# Install dependencies (already installed)
npm install

# Run development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Production Build
```bash
npm run build
npm run start
```

---

## 6. Testing & Acceptance Checklist

- [x] **Strict Light Theme**: Verified zero dark mode overrides, pure `#FFFFFF` / `#F8FAFD` surfaces across all routes.
- [x] **Official Assets**: Uses authentic `logo.svg`, RBI PA-CB badge, Bharat Connect, BBPS, PCI-DSS, ISO, and partner SVGs.
- [x] **Interactive 3D WebGL Canvas**: Three.js procedural crystal core, orbital rings, live particle packet field, pointer tilt, and accessible 2D fallback for reduced-motion.
- [x] **Dynamic Routing Simulation**: SuperStream real-time switch failover test button with millisecond latency indicators.
- [x] **Interactive Product Playground**: Functional tabs for Merchant Console, Transaction Ledger, API cURL generator, and signed Webhook simulator.
- [x] **Hosted Checkout State Machine**: End-to-end checkout with order summary, UPI QR code, Card tokenization with Luhn validation, processing state, and captured receipt view.
- [x] **Merchant Onboarding Flow**: 4-step wizard covering entity profile, KYC document upload simulation, and penny-drop bank verification.
- [x] **Responsive Mobile Layout**: Tested for desktop, tablet, and mobile with accessible hamburger drawer and horizontally scrollable tables.
- [x] **Financial Ledger & Detail Drawer**: Searchable transaction table, slide-out audit trail drawer, and full/partial refund modal.
- [x] **Public Developer Reference**: Interactive code snippet viewer supporting Node.js, Python, cURL, and Go.

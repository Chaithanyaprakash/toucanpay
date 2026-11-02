export interface Product {
  id: string;
  name: string;
  category: string;
  badge?: string;
  tagline: string;
  description: string;
  features: string[];
  icon: string;
  href: string;
}

export const TOUCAN_PRODUCTS: Product[] = [
  {
    id: "acquireflow",
    name: "AcquireFlow",
    category: "Payment Gateway",
    badge: "Core Rail",
    tagline: "High-conversion payment gateway with multi-rail domestic acceptance",
    description: "Accept UPI, Cards, Netbanking, Wallets, and EMI with single-checkout orchestration, auto-retry logic, and 99.98% processing uptime.",
    features: ["Instant UPI QR & Intent", "Tokenized Card Vault (RBI Compliant)", "Dynamic Smart Fallback", "Sub-200ms Latency"],
    icon: "/brand/toucanPay-gateway-icon.svg",
    href: "/#acquireflow",
  },
  {
    id: "superstream",
    name: "SuperStream",
    category: "AI Orchestration",
    badge: "Proprietary",
    tagline: "Intelligent payment routing across multiple acquiring banks & networks",
    description: "Eliminate downtime and maximize transaction success with rule-based and predictive AI routing between major acquirers in real-time.",
    features: ["Real-time Bank Health Checks", "Cost-optimised Rail Selection", "Zero-downtime Failover", "Granular Routing Rules"],
    icon: "/brand/orchestration.svg",
    href: "/#superstream",
  },
  {
    id: "cross-border",
    name: "Cross-Border PA-CB",
    category: "Global Trade",
    badge: "RBI Authorized",
    tagline: "Regulated settlement infrastructure for Indian exporters and importers",
    description: "RBI PA-CB compliant cross-border collection and disbursement with automated FIRCs, transparent FX rates, and direct bank settlement.",
    features: ["Automated e-BRC / FIRC", "Local Currencies (USD, EUR, GBP)", "Transparent Mid-Market FX", "Full Trade Compliance"],
    icon: "/brand/cross-border-settlement-icon.svg",
    href: "/#cross-border",
  },
  {
    id: "cardforge",
    name: "CardForge",
    category: "Card Issuance",
    tagline: "Next-generation physical and virtual card issuing platform",
    description: "Issue prepaid, commercial, and expense management cards with customizable spending limits, real-time controls, and white-label branding.",
    features: ["Instant Virtual Card Creation", "Custom Spend Limits by MCC", "Co-branded Physical Cards", "PCI DSS Tokenized Core"],
    icon: "/brand/processor-abstraction.svg",
    href: "/#cardforge",
  },
  {
    id: "schoolhub",
    name: "SchoolHub & BBPS",
    category: "Bill Collections",
    badge: "Bharat Connect BOU/COU",
    tagline: "Enterprise recurring fee and utility bill collection network",
    description: "Connect institutional billers, utilities, and education providers directly into Bharat Connect (BBPS) for automated recurring collections.",
    features: ["Automated Reminders & Reconciliations", "Direct BOU & COU Integration", "Partial & Excess Payment Handling", "Instant Payment Receipts"],
    icon: "/brand/bill-collections-icon.svg",
    href: "/#schoolhub",
  },
  {
    id: "flexiswitch",
    name: "FlexiSwitch",
    category: "Core Engine",
    tagline: "Enterprise processor abstraction and payment switch",
    description: "A resilient financial switch connecting banks, switches, and clearing houses with ISO 8583 and ISO 20022 message compliance.",
    features: ["ISO 8583 / 20022 Compliant", "High-Throughput TPS", "Dual-Active Cluster Architecture", "Audited Ledger Integrity"],
    icon: "/brand/resilience.svg",
    href: "/#flexiswitch",
  },
];

export interface TrustCredential {
  name: string;
  category: "Regulatory" | "Security" | "Network Partner";
  description: string;
  logo: string;
}

export const TRUST_CREDENTIALS: TrustCredential[] = [
  {
    name: "RBI Authorized",
    category: "Regulatory",
    description: "Authorized Payment Aggregator (PA) & Cross-Border (PA-CB) by Reserve Bank of India",
    logo: "/brand/rbi.svg",
  },
  {
    name: "Bharat Connect",
    category: "Regulatory",
    description: "Certified Biller Operating Unit (BOU) & Customer Operating Unit (COU)",
    logo: "/brand/bharat-connect.svg",
  },
  {
    name: "BBPS",
    category: "Regulatory",
    description: "Direct clearing access for utility and recurring collections",
    logo: "/brand/bbps.svg",
  },
  {
    name: "PCI DSS Level 1",
    category: "Security",
    description: "Highest level of payment security certification for cardholder data protection",
    logo: "/brand/pci-dss.svg",
  },
  {
    name: "PCI SSF",
    category: "Security",
    description: "Secure Software Standard certified payment application framework",
    logo: "/brand/pci-ssf.svg",
  },
  {
    name: "ISO 27001",
    category: "Security",
    description: "Information Security Management System certified operations",
    logo: "/brand/iso.svg",
  },
  {
    name: "ETA Member",
    category: "Security",
    description: "Member of Electronic Transactions Association",
    logo: "/brand/eta.svg",
  },
];

export const BANKING_PARTNERS = [
  { name: "Yes Bank", logo: "/brand/yes-bank.svg" },
  { name: "Axis Bank", logo: "/brand/axis-bank.svg" },
  { name: "Visa", logo: "/brand/visa.svg" },
  { name: "Mastercard", logo: "/brand/master-card.svg" },
  { name: "Currencycloud", logo: "/brand/currencycloud.svg" },
];

export const CASE_STUDIES = [
  {
    client: "NMB Bank",
    badge: "Commercial Banking",
    headline: "Modernizing Enterprise Card Issuance and Processing Infrastructure",
    description: "NMB Bank partnered with Toucan to transition legacy switch pipelines into an agile, ISO-compliant processing engine, cutting latency by 68%.",
    metric: "68%",
    metricLabel: "Reduction in Authorization Latency",
    logo: "/brand/nmb-bank.svg",
  },
  {
    client: "KPay",
    badge: "Fintech & Mobile Money",
    headline: "Scaling Digital Financial Services in Senegal",
    description: "Enabled rapid issuance of virtual cards and unified merchant acquiring across mobile networks, boosting monthly transaction volume.",
    metric: "4.2x",
    metricLabel: "Growth in Digital Wallet Volume",
    logo: "/brand/KPay.svg",
  },
  {
    client: "CellPay",
    badge: "Digital Wallets",
    headline: "Transforming Nationwide Digital Payments Across Nepal",
    description: "Architected bank-linked real-time payments connecting over 15 financial institutions with zero ledger reconciliation discrepancies.",
    metric: "99.99%",
    metricLabel: "Core Processing Availability",
    logo: "/brand/cellPay.svg",
  },
];

export interface Transaction {
  id: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  currency: string;
  status: "captured" | "settled" | "pending" | "disputed" | "refunded";
  method: "UPI" | "Visa" | "Mastercard" | "Netbanking" | "Wallet";
  channel: string;
  createdAt: string;
  rrn: string;
  fee: number;
  tax: number;
  netSettlement: number;
  bankRef: string;
  timeline: { title: string; time: string; state: "done" | "current" | "pending" }[];
}

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "pay_live_08912401",
    customerName: "Aarav Sharma",
    customerEmail: "aarav.s@gmail.com",
    amount: 14850.00,
    currency: "INR",
    status: "captured",
    method: "UPI",
    channel: "AcquireFlow Hosted Checkout",
    createdAt: "2026-10-26T10:42:15Z",
    rrn: "629910482910",
    fee: 297.00,
    tax: 53.46,
    netSettlement: 14499.54,
    bankRef: "UPI/2610260482/YES",
    timeline: [
      { title: "Payment Initiated via UPI Intent", time: "10:42:15", state: "done" },
      { title: "NPCI UPI Switch Routed to HDFC Bank", time: "10:42:16", state: "done" },
      { title: "MPIN Authorization Confirmed", time: "10:42:17", state: "done" },
      { title: "Payment Captured & Ledger Credit Recorded", time: "10:42:18", state: "done" },
      { title: "Scheduled for T+1 Batch Settlement", time: "18:00:00", state: "current" },
    ],
  },
  {
    id: "pay_live_08912402",
    customerName: "Priya Venkatesh",
    customerEmail: "priya.v@techcorp.in",
    amount: 52400.00,
    currency: "INR",
    status: "settled",
    method: "Visa",
    channel: "B2B Recurring Invoicing",
    createdAt: "2026-10-26T09:15:30Z",
    rrn: "629909153011",
    fee: 1048.00,
    tax: 188.64,
    netSettlement: 51163.36,
    bankRef: "AXIS/NEFT/002931481",
    timeline: [
      { title: "Invoice Opened by Customer", time: "09:14:10", state: "done" },
      { title: "3-D Secure OTP Authenticated", time: "09:15:25", state: "done" },
      { title: "Visa Network Captured", time: "09:15:30", state: "done" },
      { title: "Settlement Disbursed via RTGS to Merchant", time: "14:30:00", state: "done" },
    ],
  },
  {
    id: "pay_live_08912403",
    customerName: "Global Exports Inc (David Miller)",
    customerEmail: "d.miller@globalexport.us",
    amount: 198000.00,
    currency: "INR",
    status: "captured",
    method: "Mastercard",
    channel: "Cross-Border PA-CB Portal",
    createdAt: "2026-10-26T08:50:12Z",
    rrn: "629908501294",
    fee: 4950.00,
    tax: 891.00,
    netSettlement: 192159.00,
    bankRef: "CB/USD2INR/9812941",
    timeline: [
      { title: "Cross-Border Payment Authorized in USD ($2,385.00)", time: "08:50:12", state: "done" },
      { title: "RBI PA-CB Trade Document Compliance Verified", time: "08:50:18", state: "done" },
      { title: "FX Conversion Locked (83.02 INR/USD)", time: "08:50:20", state: "done" },
      { title: "e-FIRC Generation Queued", time: "08:50:25", state: "current" },
    ],
  },
  {
    id: "pay_live_08912404",
    customerName: "Sunita Reddy",
    customerEmail: "sreddy@apolloenterprises.org",
    amount: 8750.00,
    currency: "INR",
    status: "pending",
    method: "Netbanking",
    channel: "SchoolHub Fee Collection",
    createdAt: "2026-10-26T10:48:00Z",
    rrn: "629910480081",
    fee: 175.00,
    tax: 31.50,
    netSettlement: 8543.50,
    bankRef: "SBI/NB/AWAIT_CHALLAN",
    timeline: [
      { title: "School Term Fee Selected", time: "10:47:50", state: "done" },
      { title: "Redirected to State Bank of India Gateway", time: "10:48:00", state: "done" },
      { title: "Awaiting Bank Server Callback / Webhook", time: "10:48:05", state: "current" },
    ],
  },
  {
    id: "pay_live_08912405",
    customerName: "Vikram Malhotra",
    customerEmail: "vikram@malhotratech.com",
    amount: 32000.00,
    currency: "INR",
    status: "settled",
    method: "UPI",
    channel: "Payment Link Generator",
    createdAt: "2026-10-25T16:20:45Z",
    rrn: "629816204592",
    fee: 640.00,
    tax: 115.20,
    netSettlement: 31244.80,
    bankRef: "UPI/2510261620/AXIS",
    timeline: [
      { title: "Link Created & Shared via WhatsApp", time: "16:15:00", state: "done" },
      { title: "Customer Paid via Google Pay UPI", time: "16:20:45", state: "done" },
      { title: "Instant Notification Sent to Merchant", time: "16:20:46", state: "done" },
      { title: "Settled in T+0 Instant Payout Batch", time: "17:00:00", state: "done" },
    ],
  },
];

export const FREQUENTLY_ASKED_QUESTIONS = [
  {
    question: "What is Toucan's regulatory status in India?",
    answer: "Toucan Payments operates as an authorized Payment Aggregator (PA) and Cross-Border Payment Aggregator (PA-CB) under Reserve Bank of India (RBI) regulations. Additionally, Toucan is a certified Bharat Connect Biller Operating Unit (BOU) and Customer Operating Unit (COU).",
  },
  {
    question: "How does SuperStream AI dynamic routing increase success rates?",
    answer: "SuperStream continuously monitors latency, network timeouts, and success trends across multiple banking rails (HDFC, ICICI, Axis, Yes Bank, and card networks). If any banking switch experiences elevated failure rates, SuperStream instantaneously routes subsequent transactions through healthy parallel acquirers with sub-50ms switching overhead.",
  },
  {
    question: "How does Toucan support Cross-Border settlements for Indian businesses?",
    answer: "Under RBI's PA-CB framework, Toucan enables Indian exporters to receive international payments in over 30 global currencies (USD, EUR, GBP, AED, SGD). Toucan handles compliance checks, locked-in mid-market FX conversion, direct domestic INR settlement, and automated electronic Foreign Inward Remittance Certificates (e-FIRC).",
  },
  {
    question: "Can we integrate Toucan alongside our existing payment processors?",
    answer: "Yes. Toucan's FlexiSwitch and SuperStream orchestration layers are designed to sit in front of or alongside your existing payment gateways. You can orchestrate payments across Toucan rails and third-party processors using a single unified API.",
  },
  {
    question: "What compliance standards does Toucan adhere to for card security?",
    answer: "Toucan is PCI DSS Level 1 certified (Version 4.0), PCI SSF (Secure Software Standard) compliant, and ISO 27001 certified. Card numbers are encrypted and tokenized in compliant hardware security modules (HSM) without raw card details touching merchant servers.",
  },
  {
    question: "What settlement cycles are supported for merchants?",
    answer: "Standard settlement is T+1 working days. For eligible enterprise merchants and verified businesses, Toucan offers T+0 Same-Day settlements and Instant On-Demand Payouts powered by direct bank clearing APIs.",
  },
];

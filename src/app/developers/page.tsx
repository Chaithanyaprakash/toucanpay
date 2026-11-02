"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Code2, 
  Terminal, 
  Copy, 
  Check, 
  ArrowRight, 
  BookOpen, 
  Key, 
  Webhook, 
  Layers, 
  ShieldCheck, 
  Search,
  ExternalLink
} from "lucide-react";

export default function DevelopersPage() {
  const [activeTab, setActiveTab] = useState<"orders" | "payments" | "refunds" | "webhooks">("orders");
  const [copied, setCopied] = useState(false);

  const copySnippet = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-24 sm:py-28 bg-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Developer Hero */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-subtle border border-line text-xs font-semibold text-brand-blue mb-4 shadow-subtle">
            <Terminal className="w-3.5 h-3.5" />
            <span>Toucan Payments API Reference v1.0</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-ink-primary tracking-tight">
            Developer Documentation & SDKs
          </h1>
          <p className="mt-4 text-base sm:text-lg text-ink-secondary leading-relaxed">
            Build modern fintech applications with Toucan&apos;s clean, predictable, idempotent REST APIs. Accept payments, automate reconciliation, and handle cross-border settlements with typed libraries.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/dashboard/developer"
              className="px-5 py-2.5 bg-brand-blue hover:bg-brand-blue/90 text-white rounded-xl text-xs font-semibold shadow-subtle flex items-center gap-2"
            >
              <Key className="w-4 h-4" />
              <span>Get Sandbox API Keys</span>
            </Link>
            <Link
              href="/checkout"
              className="px-5 py-2.5 bg-white border border-line hover:bg-surface-subtle text-ink-primary rounded-xl text-xs font-semibold shadow-subtle flex items-center gap-2"
            >
              <span>Test Hosted Checkout UI</span>
            </Link>
          </div>
        </div>

        {/* SDK Quickstart Strip */}
        <div className="bg-surface-subtle p-6 rounded-3xl border border-line">
          <h3 className="text-sm font-bold text-ink-primary mb-3">Install Official SDKs</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
            <div className="p-3 bg-white rounded-xl border border-line flex items-center justify-between">
              <span className="text-ink-secondary">npm install @toucanpay/sdk</span>
              <button type="button" onClick={() => copySnippet("npm install @toucanpay/sdk")} className="text-brand-blue hover:text-brand-cyan">
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="p-3 bg-white rounded-xl border border-line flex items-center justify-between">
              <span className="text-ink-secondary">pip install toucanpay</span>
              <button type="button" onClick={() => copySnippet("pip install toucanpay")} className="text-brand-blue hover:text-brand-cyan">
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="p-3 bg-white rounded-xl border border-line flex items-center justify-between">
              <span className="text-ink-secondary">go get github.com/toucanpay/go</span>
              <button type="button" onClick={() => copySnippet("go get github.com/toucanpay/go")} className="text-brand-blue hover:text-brand-cyan">
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* API Interactive Reference */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Navigation (4 cols) */}
          <div className="lg:col-span-4 space-y-2">
            <p className="text-xs font-bold text-ink-tertiary uppercase tracking-wider mb-2">Core API Resources</p>
            
            <button
              type="button"
              onClick={() => setActiveTab("orders")}
              className={`w-full p-3.5 rounded-2xl text-left text-xs font-semibold flex items-center justify-between border transition-all ${
                activeTab === "orders" ? "bg-white border-brand-blue text-brand-blue shadow-subtle" : "bg-surface-subtle border-line text-ink-secondary hover:bg-white"
              }`}
            >
              <div>
                <p className="font-bold">Orders API</p>
                <p className="text-[11px] font-mono text-ink-tertiary mt-0.5">POST /v1/orders</p>
              </div>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("payments")}
              className={`w-full p-3.5 rounded-2xl text-left text-xs font-semibold flex items-center justify-between border transition-all ${
                activeTab === "payments" ? "bg-white border-brand-blue text-brand-blue shadow-subtle" : "bg-surface-subtle border-line text-ink-secondary hover:bg-white"
              }`}
            >
              <div>
                <p className="font-bold">Payments Capture & Status</p>
                <p className="text-[11px] font-mono text-ink-tertiary mt-0.5">GET /v1/payments/:id</p>
              </div>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("refunds")}
              className={`w-full p-3.5 rounded-2xl text-left text-xs font-semibold flex items-center justify-between border transition-all ${
                activeTab === "refunds" ? "bg-white border-brand-blue text-brand-blue shadow-subtle" : "bg-surface-subtle border-line text-ink-secondary hover:bg-white"
              }`}
            >
              <div>
                <p className="font-bold">Refunds API</p>
                <p className="text-[11px] font-mono text-ink-tertiary mt-0.5">POST /v1/refunds</p>
              </div>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("webhooks")}
              className={`w-full p-3.5 rounded-2xl text-left text-xs font-semibold flex items-center justify-between border transition-all ${
                activeTab === "webhooks" ? "bg-white border-brand-blue text-brand-blue shadow-subtle" : "bg-surface-subtle border-line text-ink-secondary hover:bg-white"
              }`}
            >
              <div>
                <p className="font-bold">Webhooks Verification</p>
                <p className="text-[11px] font-mono text-ink-tertiary mt-0.5">HMAC-SHA256 Signatures</p>
              </div>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right API Sandbox View (8 cols) */}
          <div className="lg:col-span-8 bg-surface-subtle p-7 rounded-3xl border border-line shadow-card space-y-5">
            
            <div className="flex items-center justify-between pb-3 border-b border-line">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-brand-blue text-white text-[10px] font-mono font-bold">
                  {activeTab === "payments" ? "GET" : "POST"}
                </span>
                <span className="font-mono text-xs font-bold text-ink-primary">
                  {activeTab === "orders" && "https://api.toucanpay.in/v1/orders"}
                  {activeTab === "payments" && "https://api.toucanpay.in/v1/payments/pay_live_08912401"}
                  {activeTab === "refunds" && "https://api.toucanpay.in/v1/refunds"}
                  {activeTab === "webhooks" && "Webhook Signature Validation Helper"}
                </span>
              </div>
            </div>

            {/* Request & Response Previews */}
            <div className="bg-white p-5 rounded-2xl border border-line font-mono text-xs space-y-4">
              <p className="text-ink-secondary font-sans font-semibold">Request Payload Example:</p>
              <pre className="bg-surface-subtle p-3 rounded-xl border border-line overflow-x-auto text-ink-primary">
{activeTab === "orders" && `{
  "amount": 1485000,
  "currency": "INR",
  "receipt": "order_rcpt_102",
  "payment_capture": 1,
  "notes": {
    "organization": "Acme Global",
    "customer_segment": "enterprise"
  }
}`}
{activeTab === "payments" && `{
  "payment_id": "pay_live_08912401",
  "expand": ["customer", "settlement_batch"]
}`}
{activeTab === "refunds" && `{
  "payment_id": "pay_live_08912401",
  "amount": 1485000,
  "reverse_all": true,
  "notes": {
    "reason": "customer_cancellation"
  }
}`}
{activeTab === "webhooks" && `import crypto from 'crypto';

function verifyToucanWebhook(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}`}
              </pre>

              <p className="text-brand-success font-sans font-semibold">&#10003; Response 200 OK (Sample JSON):</p>
              <pre className="bg-surface-subtle p-3 rounded-xl border border-line overflow-x-auto text-ink-secondary">
{`{
  "status": "success",
  "code": 200,
  "data": {
    "id": "pay_live_08912401",
    "status": "captured",
    "amount": 1485000,
    "fee": 29700,
    "tax": 5346,
    "rrn": "629910482910",
    "rail": "UPI",
    "created_at": ${Math.floor(Date.now() / 1000)}
  }
}`}
              </pre>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

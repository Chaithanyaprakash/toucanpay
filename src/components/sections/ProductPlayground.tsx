"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  BarChart3, 
  Receipt, 
  Terminal, 
  Webhook, 
  Layers, 
  ArrowRight, 
  Search, 
  Filter, 
  CheckCircle, 
  Clock, 
  Copy, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  CreditCard,
  Building
} from "lucide-react";
import { MOCK_TRANSACTIONS, Transaction } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

export default function ProductPlayground() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "transactions" | "api" | "webhook">("dashboard");
  const [selectedTx, setSelectedTx] = useState<Transaction>(MOCK_TRANSACTIONS[0]);
  const [copiedCode, setCopiedCode] = useState(false);
  const [webhookFired, setWebhookFired] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTxs = MOCK_TRANSACTIONS.filter(
    (tx) =>
      tx.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.method.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const simulateWebhook = () => {
    setWebhookFired(true);
    setTimeout(() => setWebhookFired(false), 3000);
  };

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-blue">
              Interactive Product Showcase
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink-primary mt-2">
              Experience the Toucan Interface in Action
            </h2>
            <p className="mt-2 text-sm text-ink-secondary">
              Explore the merchant console, inspect the transaction ledger, test API request formats, and simulate real-time webhook events.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-surface-subtle border border-line rounded-xl">
            <button
              type="button"
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "dashboard"
                  ? "bg-white text-brand-blue shadow-subtle border border-line"
                  : "text-ink-secondary hover:text-ink-primary"
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Merchant Console</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("transactions")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "transactions"
                  ? "bg-white text-brand-blue shadow-subtle border border-line"
                  : "text-ink-secondary hover:text-ink-primary"
              }`}
            >
              <Receipt className="w-3.5 h-3.5" />
              <span>Ledger & Timeline</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("api")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "api"
                  ? "bg-white text-brand-blue shadow-subtle border border-line"
                  : "text-ink-secondary hover:text-ink-primary"
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>API Request</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("webhook")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "webhook"
                  ? "bg-white text-brand-blue shadow-subtle border border-line"
                  : "text-ink-secondary hover:text-ink-primary"
              }`}
            >
              <Webhook className="w-3.5 h-3.5" />
              <span>Webhooks</span>
            </button>
          </div>
        </div>

        {/* Playground Frame (Light theme only) */}
        <div className="bg-surface-subtle rounded-3xl border border-line shadow-card overflow-hidden">
          
          {/* Top Window Bar */}
          <div className="bg-white px-6 py-3 border-b border-line flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-amber-400" />
              <span className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="ml-2 text-xs font-mono text-ink-secondary">
                toucan-merchant-sandbox.toucanpay.in
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-brand-success bg-brand-success/10 px-2 py-0.5 rounded-full border border-brand-success/20">
                SANDBOX SIMULATION
              </span>
              <Link href="/dashboard" className="text-xs font-semibold text-brand-blue hover:underline flex items-center gap-1">
                Open Full App <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* TAB 1: MERCHANT DASHBOARD OVERVIEW */}
          {activeTab === "dashboard" && (
            <div className="p-6 sm:p-8 space-y-6">
              {/* KPI Cards Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-line shadow-subtle">
                  <div className="flex items-center justify-between text-xs text-ink-secondary">
                    <span>Total Volume (Today)</span>
                    <TrendingUp className="w-4 h-4 text-brand-success" />
                  </div>
                  <p className="text-2xl font-bold font-heading text-ink-primary mt-2">
                    ₹ 4,82,49,150
                  </p>
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-brand-success font-medium">
                    <span>+14.8% vs yesterday</span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-line shadow-subtle">
                  <div className="flex items-center justify-between text-xs text-ink-secondary">
                    <span>Processing Success Rate</span>
                    <span className="text-[10px] font-mono text-brand-blue bg-brand-blue/10 px-1.5 py-0.5 rounded">SuperStream</span>
                  </div>
                  <p className="text-2xl font-bold font-heading text-brand-blue mt-2">
                    99.98%
                  </p>
                  <p className="mt-2 text-xs text-ink-secondary">Zero failed banking switchover</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-line shadow-subtle">
                  <div className="flex items-center justify-between text-xs text-ink-secondary">
                    <span>Settled to Bank (T+1)</span>
                    <Building className="w-4 h-4 text-brand-blue" />
                  </div>
                  <p className="text-2xl font-bold font-heading text-ink-primary mt-2">
                    ₹ 4,12,05,800
                  </p>
                  <p className="mt-2 text-xs text-brand-success font-medium">Direct NEFT/RTGS Disbursed</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-line shadow-subtle">
                  <div className="flex items-center justify-between text-xs text-ink-secondary">
                    <span>Rolling Risk Reserve</span>
                    <span className="text-[10px] font-mono text-ink-secondary">RBI PA Compliant</span>
                  </div>
                  <p className="text-2xl font-bold font-heading text-ink-primary mt-2">
                    ₹ 70,43,350
                  </p>
                  <p className="mt-2 text-xs text-ink-secondary">Released next cycle</p>
                </div>
              </div>

              {/* Quick Action Shortcuts */}
              <div className="bg-white p-4 rounded-2xl border border-line flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-ink-primary">Quick Merchant Actions:</span>
                  <Link href="/dashboard/payment-links" className="px-3 py-1.5 text-xs font-medium bg-brand-blue text-white rounded-lg hover:bg-brand-blue/90">
                    + Create Payment Link
                  </Link>
                  <Link href="/checkout" className="px-3 py-1.5 text-xs font-medium bg-surface-subtle border border-line text-ink-primary rounded-lg hover:bg-white">
                    Test Checkout Flow
                  </Link>
                </div>
                <div className="text-xs text-ink-secondary">
                  Merchant ID: <span className="font-mono font-semibold text-ink-primary">mcht_live_toucan904</span>
                </div>
              </div>

              {/* Recent Activity Table Preview */}
              <div className="bg-white rounded-2xl border border-line overflow-hidden shadow-subtle">
                <div className="px-5 py-4 border-b border-line flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-ink-primary">
                    Live Stream Transactions
                  </h4>
                  <Link href="/dashboard/transactions" className="text-xs font-semibold text-brand-blue hover:underline flex items-center gap-1">
                    View Complete Ledger <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
                <div className="divide-y divide-line/60">
                  {MOCK_TRANSACTIONS.slice(0, 3).map((tx) => (
                    <div key={tx.id} className="px-5 py-3.5 flex items-center justify-between text-xs hover:bg-surface-subtle transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-surface-subtle border border-line flex items-center justify-center font-bold text-brand-blue">
                          {tx.method === "UPI" ? "UPI" : "CARD"}
                        </div>
                        <div>
                          <p className="font-bold text-ink-primary">{tx.customerName}</p>
                          <p className="text-[11px] font-mono text-ink-secondary">{tx.id}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-ink-primary">{formatCurrency(tx.amount)}</p>
                        <span className="inline-block px-2 py-0.5 text-[10px] font-semibold uppercase rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {tx.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TRANSACTIONS & TIMELINE */}
          {activeTab === "transactions" && (
            <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Transactions Table Column */}
              <div className="lg:col-span-7 bg-white rounded-2xl border border-line shadow-subtle overflow-hidden">
                <div className="p-4 border-b border-line flex items-center gap-3">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-ink-tertiary absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search transactions by customer, ID or method..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 text-xs bg-surface-subtle border border-line rounded-lg text-ink-primary focus:outline-none focus:border-brand-blue"
                    />
                  </div>
                </div>

                <div className="divide-y divide-line/60 overflow-x-auto">
                  {filteredTxs.map((tx) => (
                    <div
                      key={tx.id}
                      onClick={() => setSelectedTx(tx)}
                      className={`p-4 flex items-center justify-between text-xs cursor-pointer transition-colors ${
                        selectedTx.id === tx.id ? "bg-brand-cyan/5 border-l-4 border-l-brand-blue" : "hover:bg-surface-subtle"
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-ink-primary">{tx.customerName}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-surface-subtle border border-line text-ink-secondary font-mono">
                            {tx.method}
                          </span>
                        </div>
                        <p className="text-[11px] font-mono text-ink-secondary">{tx.id}</p>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-ink-primary">{formatCurrency(tx.amount)}</p>
                        <span className={`inline-block px-2 py-0.5 text-[10px] font-semibold uppercase rounded-full ${
                          tx.status === "captured" || tx.status === "settled"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}>
                          {tx.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detail Audit Timeline Column */}
              <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-line shadow-subtle space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-line">
                  <div>
                    <span className="text-[10px] font-mono text-ink-secondary uppercase">Transaction Details</span>
                    <h4 className="text-base font-bold text-ink-primary">{selectedTx.id}</h4>
                  </div>
                  <span className="text-lg font-bold text-ink-primary">{formatCurrency(selectedTx.amount)}</span>
                </div>

                {/* Breakdown details */}
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-ink-secondary">
                    <span>Customer Email</span>
                    <span className="font-medium text-ink-primary">{selectedTx.customerEmail}</span>
                  </div>
                  <div className="flex justify-between text-ink-secondary">
                    <span>Channel</span>
                    <span className="font-medium text-ink-primary">{selectedTx.channel}</span>
                  </div>
                  <div className="flex justify-between text-ink-secondary">
                    <span>Bank RRN Reference</span>
                    <span className="font-mono text-ink-primary">{selectedTx.rrn}</span>
                  </div>
                  <div className="flex justify-between text-ink-secondary">
                    <span>MDR Fee & GST</span>
                    <span className="font-medium text-ink-primary">{formatCurrency(selectedTx.fee + selectedTx.tax)}</span>
                  </div>
                  <div className="flex justify-between text-ink-secondary border-t border-line/60 pt-2 font-bold">
                    <span className="text-ink-primary">Net Settlement Disbursed</span>
                    <span className="text-brand-success">{formatCurrency(selectedTx.netSettlement)}</span>
                  </div>
                </div>

                {/* Audit Timeline */}
                <div className="pt-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-ink-primary mb-3">Audit Trail</p>
                  <div className="space-y-3 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-line">
                    {selectedTx.timeline.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-3 relative pl-6 text-xs">
                        <span className={`absolute left-0 top-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center bg-white ${
                          step.state === "done" ? "border-brand-success text-brand-success" : "border-brand-blue text-brand-blue"
                        }`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        </span>
                        <div className="flex-1">
                          <p className="font-semibold text-ink-primary">{step.title}</p>
                          <p className="text-[10px] font-mono text-ink-secondary">{step.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DEVELOPER API CONSOLE */}
          {activeTab === "api" && (
            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-ink-primary">Create an Order via REST API</h4>
                  <p className="text-xs text-ink-secondary">Standard idempotent payment initiation endpoint</p>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(`curl -X POST https://api.toucanpay.in/v1/orders \\
  -H "Authorization: Bearer sec_test_9041284912" \\
  -H "Content-Type: application/json" \\
  -d '{"amount": 1485000, "currency": "INR", "receipt": "rcpt_981", "notes": {"plan": "enterprise"}}'`)}
                  className="px-3 py-1.5 text-xs font-medium bg-white hover:bg-surface-subtle border border-line rounded-lg text-ink-primary flex items-center gap-1.5 shadow-subtle"
                >
                  <Copy className="w-3.5 h-3.5 text-brand-blue" />
                  <span>{copiedCode ? "Copied!" : "Copy cURL"}</span>
                </button>
              </div>

              {/* Code Display */}
              <div className="bg-white rounded-2xl p-5 border border-line font-mono text-xs overflow-x-auto text-ink-primary shadow-subtle leading-relaxed">
                <p className="text-ink-tertiary"># 1. Initialize an Order in Toucan Engine</p>
                <p className="text-brand-blue font-bold">POST <span className="text-ink-primary font-normal">https://api.toucanpay.in/v1/orders</span></p>
                <p className="text-ink-secondary mt-2">Authorization: Bearer sec_test_9041284912</p>
                <p className="text-ink-secondary">Content-Type: application/json</p>
                <pre className="mt-3 text-ink-primary bg-surface-subtle p-3 rounded-xl border border-line">
{`{
  "amount": 1485000,
  "currency": "INR",
  "receipt": "order_inv_20261026",
  "payment_capture": 1,
  "notes": {
    "organization": "Toucan Technologies",
    "customer_segment": "enterprise"
  }
}`}
                </pre>
                <p className="text-brand-success font-semibold mt-4">&#10003; Response 201 Created (142ms latency):</p>
                <pre className="mt-2 text-ink-secondary bg-surface-subtle p-3 rounded-xl border border-line">
{`{
  "id": "order_live_904812",
  "entity": "order",
  "amount": 1485000,
  "amount_paid": 0,
  "amount_due": 1485000,
  "currency": "INR",
  "status": "created",
  "attempts": 0
}`}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 4: WEBHOOK SIMULATOR */}
          {activeTab === "webhook" && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-ink-primary">Real-Time Webhook Dispatch Simulator</h4>
                  <p className="text-xs text-ink-secondary">Toucan cryptographically signs all event payloads with SHA-256 HMAC</p>
                </div>

                <button
                  type="button"
                  onClick={simulateWebhook}
                  disabled={webhookFired}
                  className="px-4 py-2 bg-brand-blue text-white rounded-xl text-xs font-semibold hover:bg-brand-blue/90 shadow-subtle flex items-center gap-2"
                >
                  <Webhook className="w-4 h-4" />
                  <span>{webhookFired ? "Event Dispatched! Check payload below" : "Simulate payment.captured Event"}</span>
                </button>
              </div>

              {/* Webhook Payload Card */}
              <div className="bg-white p-5 rounded-2xl border border-line shadow-subtle space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-line text-ink-secondary">
                  <span>Event: <strong className="text-brand-blue font-mono">payment.captured</strong></span>
                  <span>Signature: <strong className="text-ink-primary">t=17930102,v1=9f048...</strong></span>
                </div>

                <pre className="bg-surface-subtle p-4 rounded-xl border border-line text-ink-primary overflow-x-auto">
{`{
  "entity": "event",
  "account_id": "acc_toucan_live_918",
  "event": "payment.captured",
  "contains": ["payment"],
  "payload": {
    "payment": {
      "entity": {
        "id": "pay_live_08912401",
        "amount": 14850.00,
        "currency": "INR",
        "status": "captured",
        "order_id": "order_live_904812",
        "method": "upi",
        "vpa": "customer@oksbi",
        "bank": "HDFC",
        "fee": 297.00,
        "tax": 53.46,
        "created_at": ${Math.floor(Date.now() / 1000)}
      }
    }
  }
}`}
                </pre>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}

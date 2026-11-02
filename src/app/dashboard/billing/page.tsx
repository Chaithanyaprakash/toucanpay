"use client";

import React, { useState } from "react";
import { 
  FileText, 
  Plus, 
  Download, 
  CheckCircle2, 
  Clock, 
  Eye, 
  X, 
  Receipt, 
  ArrowRight,
  CreditCard 
} from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";

interface InvoiceItem {
  id: string;
  customer: string;
  amount: number;
  status: "paid" | "sent" | "overdue";
  dueDate: string;
  items: string;
}

const MOCK_INVOICES: InvoiceItem[] = [
  {
    id: "INV-2026-0891",
    customer: "Indus Logistics Pvt Ltd",
    amount: 148500.00,
    status: "paid",
    dueDate: "2026-10-25T00:00:00Z",
    items: "AcquireFlow Annual Gateway SLA + Custom Rail Setup",
  },
  {
    id: "INV-2026-0892",
    customer: "Zenith Digital Media LLP",
    amount: 52400.00,
    status: "sent",
    dueDate: "2026-11-05T00:00:00Z",
    items: "Cross-Border PA-CB Export Trade Settlement Processing",
  },
  {
    id: "INV-2026-0893",
    customer: "Global EduTech Foundation",
    amount: 87500.00,
    status: "paid",
    dueDate: "2026-10-22T00:00:00Z",
    items: "SchoolHub Institutional Biller Integration (BBPS BOU)",
  },
];

export default function BillingPage() {
  const [invoices, setInvoices] = useState<InvoiceItem[]>(MOCK_INVOICES);
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceItem | null>(null);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink-primary">Invoicing & Subscriptions</h1>
          <p className="text-xs text-ink-secondary mt-0.5">
            Create GST-compliant electronic invoices and automate recurring customer billing schedules.
          </p>
        </div>

        <button
          type="button"
          onClick={() => alert("Launching Invoice Generator...")}
          className="px-4 py-2 bg-brand-blue hover:bg-brand-blue/90 text-white rounded-xl text-xs font-semibold shadow-subtle flex items-center gap-2 w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Invoice</span>
        </button>
      </div>

      {/* Subscription Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-3xl border border-line shadow-subtle">
          <span className="text-xs font-semibold text-ink-secondary">Monthly Recurring Revenue (MRR)</span>
          <p className="text-2xl font-bold font-heading text-ink-primary mt-2">
            ₹ 24,80,000.00
          </p>
          <p className="mt-2 text-xs text-brand-success font-medium">+12.6% net expansion</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-line shadow-subtle">
          <span className="text-xs font-semibold text-ink-secondary">Active Mandates (UPI / NACH)</span>
          <p className="text-2xl font-bold font-heading text-brand-blue mt-2">
            1,420 Subscriptions
          </p>
          <p className="mt-2 text-xs text-ink-secondary">Zero renewal failure with auto-retry</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-line shadow-subtle">
          <span className="text-xs font-semibold text-ink-secondary">Receivables Awaiting Settlement</span>
          <p className="text-2xl font-bold font-heading text-ink-primary mt-2">
            ₹ 52,400.00
          </p>
          <p className="mt-2 text-xs text-amber-600 font-medium">1 invoice due in 10 days</p>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-3xl border border-line shadow-card overflow-hidden">
        <div className="px-6 py-4 border-b border-line flex items-center justify-between">
          <h3 className="text-sm font-bold text-ink-primary">Invoices Ledger</h3>
          <span className="text-xs font-mono text-ink-secondary">GST E-Invoicing Compliant</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-subtle text-ink-secondary border-b border-line">
              <tr>
                <th className="px-6 py-3.5 font-semibold">Invoice Number</th>
                <th className="px-6 py-3.5 font-semibold">Billed Customer</th>
                <th className="px-6 py-3.5 font-semibold">Line Items</th>
                <th className="px-6 py-3.5 font-semibold">Amount</th>
                <th className="px-6 py-3.5 font-semibold">Status</th>
                <th className="px-6 py-3.5 font-semibold">Due Date</th>
                <th className="px-6 py-3.5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/60">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-surface-subtle/50 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-brand-blue">{inv.id}</td>
                  <td className="px-6 py-4 font-semibold text-ink-primary">{inv.customer}</td>
                  <td className="px-6 py-4 text-ink-secondary max-w-xs truncate">{inv.items}</td>
                  <td className="px-6 py-4 font-bold text-ink-primary">{formatCurrency(inv.amount)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                      inv.status === "paid"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-blue-50 text-brand-blue border border-blue-200"
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-ink-secondary">{formatDate(inv.dueDate)}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedInvoice(inv)}
                      className="px-3 py-1.5 bg-surface-subtle hover:bg-white text-ink-primary border border-line rounded-lg text-xs font-semibold shadow-subtle flex items-center gap-1.5 ml-auto"
                    >
                      <Eye className="w-3.5 h-3.5 text-brand-blue" />
                      <span>View PDF</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PDF PREVIEW MODAL */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-ink-primary/30 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full border border-line shadow-elevated space-y-6 animate-in zoom-in-95 duration-150">
            
            <div className="flex items-center justify-between pb-4 border-b border-line">
              <div className="flex items-center gap-3">
                <img src="/brand/logo.svg" alt="Toucan" className="h-6 object-contain" />
                <span className="text-xs font-mono font-bold text-ink-secondary">TAX INVOICE</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedInvoice(null)}
                className="p-1 rounded-lg text-ink-secondary hover:bg-surface-subtle"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Simulated Invoice Document */}
            <div className="p-6 rounded-2xl bg-surface-subtle border border-line space-y-4 text-xs">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-ink-primary text-sm">Toucan Payments (India) Pvt Ltd</p>
                  <p className="text-ink-secondary mt-0.5">GSTIN: 29AABCT8921F1ZX</p>
                  <p className="text-ink-secondary">Prestige Tech Park, Outer Ring Road, Bengaluru</p>
                </div>
                <div className="text-right">
                  <p className="font-mono font-bold text-brand-blue text-sm">{selectedInvoice.id}</p>
                  <p className="text-ink-secondary mt-0.5">Date: {formatDate(new Date().toISOString())}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-line">
                <p className="font-semibold text-ink-secondary uppercase text-[10px]">Billed To:</p>
                <p className="font-bold text-ink-primary text-sm mt-0.5">{selectedInvoice.customer}</p>
              </div>

              <table className="w-full text-left pt-2 border-t border-line">
                <thead>
                  <tr className="text-ink-secondary border-b border-line pb-2">
                    <th className="py-2">Description</th>
                    <th className="py-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 font-medium text-ink-primary">{selectedInvoice.items}</td>
                    <td className="py-2 text-right font-mono font-bold">{formatCurrency(selectedInvoice.amount * 0.8474)}</td>
                  </tr>
                  <tr>
                    <td className="py-1 text-ink-secondary">CGST (9%) + SGST (9%)</td>
                    <td className="py-1 text-right font-mono text-ink-secondary">{formatCurrency(selectedInvoice.amount * 0.1526)}</td>
                  </tr>
                  <tr className="border-t border-line font-bold text-sm">
                    <td className="py-2 text-ink-primary">Total Amount Due</td>
                    <td className="py-2 text-right font-mono text-brand-blue">{formatCurrency(selectedInvoice.amount)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-brand-success font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Digitally signed with Toucan HSM certificate</span>
              </span>

              <button
                type="button"
                onClick={() => alert("Downloading PDF document...")}
                className="px-5 py-2.5 bg-brand-blue hover:bg-brand-blue/90 text-white rounded-xl text-xs font-semibold shadow-subtle flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF Invoice</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Link2, 
  Plus, 
  Copy, 
  Check, 
  QrCode, 
  Share2, 
  X, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Receipt
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import QrCodeGenerator from "@/components/ui/QrCodeGenerator";

interface PaymentLinkItem {
  id: string;
  title: string;
  amount: number;
  customerEntered: boolean;
  status: "active" | "expired" | "paid";
  paymentsCount: number;
  totalCollected: number;
  url: string;
  createdAt: string;
}

const INITIAL_LINKS: PaymentLinkItem[] = [
  {
    id: "plink_891024",
    title: "School Annual Term Fee 2026-27",
    amount: 14850.00,
    customerEntered: false,
    status: "active",
    paymentsCount: 240,
    totalCollected: 3564000.00,
    url: "https://pay.toucanpay.in/l/plink_891024",
    createdAt: "2026-10-20T08:00:00Z",
  },
  {
    id: "plink_891025",
    title: "Consulting Retainer & Discovery Sprint",
    amount: 50000.00,
    customerEntered: false,
    status: "active",
    paymentsCount: 8,
    totalCollected: 400000.00,
    url: "https://pay.toucanpay.in/l/plink_891025",
    createdAt: "2026-10-22T14:30:00Z",
  },
  {
    id: "plink_891026",
    title: "Custom Donation / Open Contribution",
    amount: 0,
    customerEntered: true,
    status: "active",
    paymentsCount: 45,
    totalCollected: 89500.00,
    url: "https://pay.toucanpay.in/l/plink_891026",
    createdAt: "2026-10-24T11:15:00Z",
  },
];

export default function PaymentLinksPage() {
  const [links, setLinks] = useState<PaymentLinkItem[]>(INITIAL_LINKS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [qrModalLink, setQrModalLink] = useState<PaymentLinkItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // New Link Form State
  const [newTitle, setNewTitle] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newCustomerEntered, setNewCustomerEntered] = useState(false);

  const copyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCreateLink = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `plink_${Math.floor(Math.random() * 899999 + 100000)}`;
    const newLink: PaymentLinkItem = {
      id,
      title: newTitle || "Quick Payment Link",
      amount: newCustomerEntered ? 0 : Number(newAmount) || 1000,
      customerEntered: newCustomerEntered,
      status: "active",
      paymentsCount: 0,
      totalCollected: 0,
      url: `https://pay.toucanpay.in/l/${id}`,
      createdAt: new Date().toISOString(),
    };

    setLinks([newLink, ...links]);
    setIsModalOpen(false);
    setNewTitle("");
    setNewAmount("");
    setNewCustomerEntered(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink-primary">Payment Links & Hosted Pages</h1>
          <p className="text-xs text-ink-secondary mt-0.5">
            Accept immediate payments via WhatsApp, SMS, or QR code with zero code integration.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-brand-blue hover:bg-brand-blue/90 text-white rounded-xl text-xs font-semibold shadow-subtle flex items-center gap-2 w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Create Payment Link</span>
        </button>
      </div>

      {/* Links Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {links.map((link) => (
          <div
            key={link.id}
            className="bg-white p-6 rounded-3xl border border-line shadow-card hover:shadow-hover hover:border-brand-blue/30 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-success" />
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-subtle border border-line text-ink-secondary">
                  {link.id}
                </span>
              </div>

              <h3 className="text-base font-bold text-ink-primary group-hover:text-brand-blue transition-colors">
                {link.title}
              </h3>

              <p className="text-2xl font-bold font-heading text-ink-primary mt-2">
                {link.customerEntered ? "Customer-Entered Amount" : formatCurrency(link.amount)}
              </p>

              <div className="mt-4 pt-3 border-t border-line space-y-1 text-xs text-ink-secondary">
                <div className="flex justify-between">
                  <span>Transactions Cleared:</span>
                  <span className="font-semibold text-ink-primary">{link.paymentsCount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Collected:</span>
                  <span className="font-mono font-bold text-brand-success">{formatCurrency(link.totalCollected)}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 pt-4 border-t border-line flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => copyUrl(link.id, link.url)}
                className="flex-1 py-2 px-3 bg-surface-subtle hover:bg-white text-ink-primary border border-line rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-subtle"
              >
                {copiedId === link.id ? <Check className="w-3.5 h-3.5 text-brand-success" /> : <Copy className="w-3.5 h-3.5 text-brand-blue" />}
                <span>{copiedId === link.id ? "Copied" : "Copy Link"}</span>
              </button>

              <button
                type="button"
                onClick={() => setQrModalLink(link)}
                className="p-2 bg-surface-subtle hover:bg-white border border-line text-ink-primary rounded-xl text-xs hover:border-brand-blue/30 shadow-subtle"
                title="View Scannable QR Code"
              >
                <QrCode className="w-4 h-4 text-brand-cyan" />
              </button>

              <Link
                href="/checkout"
                className="p-2 bg-brand-blue/10 hover:bg-brand-blue/20 text-brand-blue rounded-xl text-xs"
                title="Preview hosted checkout"
              >
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* VIEW QR CODE MODAL */}
      {qrModalLink && (
        <div className="fixed inset-0 z-50 bg-ink-primary/30 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full border border-line shadow-elevated space-y-4 text-center animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-line">
              <h3 className="text-sm font-bold text-ink-primary">Scan & Pay QR Code</h3>
              <button
                type="button"
                onClick={() => setQrModalLink(null)}
                className="p-1 rounded-lg text-ink-secondary hover:bg-surface-subtle"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <p className="text-xs font-semibold text-ink-primary">{qrModalLink.title}</p>
              <p className="text-lg font-bold font-heading text-brand-blue mt-1">
                {qrModalLink.customerEntered ? "Open Amount" : formatCurrency(qrModalLink.amount)}
              </p>
            </div>

            <div className="flex justify-center py-2">
              <QrCodeGenerator value={qrModalLink.url} size={180} />
            </div>

            <p className="text-[11px] text-ink-secondary">
              Scan with any UPI app (Google Pay, PhonePe, Paytm, BHIM)
            </p>

            <button
              type="button"
              onClick={() => setQrModalLink(null)}
              className="w-full py-2.5 bg-brand-blue text-white rounded-xl text-xs font-semibold hover:bg-brand-blue/90"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* CREATE PAYMENT LINK MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-ink-primary/30 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-line shadow-elevated space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-line">
              <div className="flex items-center gap-2">
                <Link2 className="w-5 h-5 text-brand-blue" />
                <h3 className="text-base font-bold text-ink-primary">Create New Payment Link</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-ink-secondary hover:bg-surface-subtle"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateLink} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-ink-primary mb-1">Purpose / Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Q3 Retainer or Term Fee"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-line rounded-xl text-ink-primary focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-semibold text-ink-primary">Fixed Amount (₹)</label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newCustomerEntered}
                      onChange={(e) => setNewCustomerEntered(e.target.checked)}
                      className="rounded accent-brand-blue"
                    />
                    <span className="text-[11px] text-ink-secondary">Allow customer to enter amount</span>
                  </label>
                </div>
                {!newCustomerEntered && (
                  <input
                    type="number"
                    required
                    placeholder="15000"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-line rounded-xl text-ink-primary focus:outline-none focus:border-brand-blue font-mono font-bold"
                  />
                )}
              </div>

              <div className="p-3 bg-surface-subtle rounded-xl border border-line text-[11px] text-ink-secondary">
                Payment links support dynamic UPI QR, all credit/debit cards, and generate automated GST receipts.
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-ink-secondary hover:text-ink-primary font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold rounded-xl shadow-subtle"
                >
                  Generate Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

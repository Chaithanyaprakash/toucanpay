"use client";

import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  Download, 
  X, 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  RotateCcw, 
  ShieldCheck, 
  ChevronRight,
  AlertTriangle
} from "lucide-react";
import { MOCK_TRANSACTIONS, Transaction } from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
  const [refundAmount, setRefundAmount] = useState<string>("");
  const [refundSuccess, setRefundSuccess] = useState(false);

  // Filter transactions
  const filtered = MOCK_TRANSACTIONS.filter((tx) => {
    const matchesSearch =
      tx.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.rrn.includes(searchTerm);
    const matchesStatus = statusFilter === "all" || tx.status === statusFilter;
    const matchesMethod = methodFilter === "all" || tx.method.toLowerCase() === methodFilter.toLowerCase();
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const handleOpenRefund = (tx: Transaction) => {
    setSelectedTx(tx);
    setRefundAmount(tx.amount.toString());
    setRefundSuccess(false);
    setIsRefundModalOpen(true);
  };

  const executeRefund = (e: React.FormEvent) => {
    e.preventDefault();
    setRefundSuccess(true);
    setTimeout(() => {
      setIsRefundModalOpen(false);
      setRefundSuccess(false);
    }, 1600);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink-primary">Transaction Ledger</h1>
          <p className="text-xs text-ink-secondary mt-0.5">
            Audit trail of all processed domestic, BBPS, and cross-border payment records.
          </p>
        </div>

        <button
          type="button"
          onClick={() => alert("Exporting transaction records to CSV format...")}
          className="px-3.5 py-2 bg-white hover:bg-surface-subtle text-ink-primary border border-line rounded-xl text-xs font-semibold shadow-subtle flex items-center gap-1.5 w-fit"
        >
          <Download className="w-3.5 h-3.5 text-brand-blue" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-line shadow-subtle flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-ink-tertiary absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by customer name, order ID, or bank RRN..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-surface-subtle border border-line rounded-xl text-ink-primary focus:outline-none focus:border-brand-blue"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-surface-subtle border border-line rounded-xl text-ink-primary focus:outline-none focus:border-brand-blue"
          >
            <option value="all">All Statuses</option>
            <option value="captured">Captured</option>
            <option value="settled">Settled</option>
            <option value="pending">Pending</option>
          </select>

          <select
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-surface-subtle border border-line rounded-xl text-ink-primary focus:outline-none focus:border-brand-blue"
          >
            <option value="all">All Payment Methods</option>
            <option value="upi">UPI</option>
            <option value="visa">Visa</option>
            <option value="mastercard">Mastercard</option>
            <option value="netbanking">Netbanking</option>
          </select>
        </div>

      </div>

      {/* Transactions Data Table */}
      <div className="bg-white rounded-3xl border border-line shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-subtle text-ink-secondary border-b border-line">
              <tr>
                <th className="px-6 py-3.5 font-semibold">Payment ID</th>
                <th className="px-6 py-3.5 font-semibold">Customer</th>
                <th className="px-6 py-3.5 font-semibold">Method</th>
                <th className="px-6 py-3.5 font-semibold">Gross Amount</th>
                <th className="px-6 py-3.5 font-semibold">Net Disbursed</th>
                <th className="px-6 py-3.5 font-semibold">Status</th>
                <th className="px-6 py-3.5 font-semibold">Date</th>
                <th className="px-6 py-3.5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/60">
              {filtered.map((tx) => (
                <tr key={tx.id} className="hover:bg-surface-subtle/50 transition-colors">
                  <td className="px-6 py-4 font-mono font-medium text-brand-blue">
                    <button
                      type="button"
                      onClick={() => setSelectedTx(tx)}
                      className="hover:underline font-bold"
                    >
                      {tx.id}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-ink-primary">{tx.customerName}</p>
                    <p className="text-[11px] text-ink-secondary">{tx.customerEmail}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 rounded bg-surface-subtle border border-line font-mono">
                      {tx.method}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-ink-primary">{formatCurrency(tx.amount)}</td>
                  <td className="px-6 py-4 text-brand-success font-mono font-semibold">{formatCurrency(tx.netSettlement)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                      tx.status === "captured" || tx.status === "settled"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-ink-secondary">{formatDate(tx.createdAt)}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      type="button"
                      onClick={() => setSelectedTx(tx)}
                      className="text-xs font-semibold text-brand-blue hover:underline"
                    >
                      Audit View
                    </button>
                    {(tx.status === "captured" || tx.status === "settled") && (
                      <button
                        type="button"
                        onClick={() => handleOpenRefund(tx)}
                        className="text-xs text-ink-secondary hover:text-red-600 font-medium"
                      >
                        Refund
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SLIDE-OUT TRANSACTION DETAIL DRAWER */}
      {selectedTx && !isRefundModalOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-ink-primary/20 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-white h-full shadow-elevated p-6 overflow-y-auto space-y-6 animate-in slide-in-from-right duration-200">
            
            <div className="flex items-center justify-between pb-4 border-b border-line">
              <div>
                <span className="text-[10px] font-mono text-ink-secondary uppercase">Ledger Record</span>
                <h3 className="text-lg font-bold text-ink-primary">{selectedTx.id}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTx(null)}
                className="p-1 rounded-lg text-ink-secondary hover:bg-surface-subtle"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Amount Banner */}
            <div className="p-4 rounded-2xl bg-surface-subtle border border-line flex items-center justify-between">
              <div>
                <span className="text-xs text-ink-secondary">Gross Captured</span>
                <p className="text-2xl font-bold font-heading text-ink-primary mt-0.5">
                  {formatCurrency(selectedTx.amount)}
                </p>
              </div>
              <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                {selectedTx.status.toUpperCase()}
              </span>
            </div>

            {/* Financial Reconciliation Breakdown */}
            <div className="space-y-3 text-xs">
              <p className="font-bold text-ink-primary uppercase tracking-wider text-[11px]">Settlement Breakdown</p>
              
              <div className="flex justify-between text-ink-secondary">
                <span>Gross Order Amount</span>
                <span className="font-medium text-ink-primary">{formatCurrency(selectedTx.amount)}</span>
              </div>
              <div className="flex justify-between text-ink-secondary">
                <span>Toucan MDR Processing Fee</span>
                <span className="font-medium text-ink-primary">- {formatCurrency(selectedTx.fee)}</span>
              </div>
              <div className="flex justify-between text-ink-secondary">
                <span>GST (18% on Processing Fee)</span>
                <span className="font-medium text-ink-primary">- {formatCurrency(selectedTx.tax)}</span>
              </div>
              <div className="flex justify-between font-bold pt-2 border-t border-line text-sm">
                <span className="text-ink-primary">Net Settlement to Merchant</span>
                <span className="text-brand-success">{formatCurrency(selectedTx.netSettlement)}</span>
              </div>
            </div>

            {/* Gateway & Switch Identifiers */}
            <div className="space-y-2 text-xs pt-4 border-t border-line">
              <p className="font-bold text-ink-primary uppercase tracking-wider text-[11px]">Banking References</p>
              <div className="p-3 bg-surface-subtle rounded-xl border border-line space-y-1 font-mono text-[11px]">
                <div className="flex justify-between">
                  <span className="text-ink-secondary">NPCI RRN:</span>
                  <span className="text-ink-primary font-bold">{selectedTx.rrn}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-secondary">Acquirer Switch:</span>
                  <span className="text-ink-primary">{selectedTx.bankRef}</span>
                </div>
              </div>
            </div>

            {/* Audit Trail Timeline */}
            <div className="pt-4 border-t border-line">
              <p className="font-bold text-ink-primary uppercase tracking-wider text-[11px] mb-3">Audit Timeline</p>
              <div className="space-y-3 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-line">
                {selectedTx.timeline.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 relative pl-6 text-xs">
                    <span className={`absolute left-0 top-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center bg-white ${
                      item.state === "done" ? "border-brand-success text-brand-success" : "border-brand-blue text-brand-blue"
                    }`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    </span>
                    <div>
                      <p className="font-semibold text-ink-primary">{item.title}</p>
                      <p className="text-[10px] font-mono text-ink-secondary">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleOpenRefund(selectedTx)}
                className="w-full py-2.5 px-4 bg-surface-subtle hover:bg-red-50 text-red-600 border border-line rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Initiate Refund</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* REFUND MODAL */}
      {isRefundModalOpen && selectedTx && (
        <div className="fixed inset-0 z-50 bg-ink-primary/30 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-line shadow-elevated space-y-5 animate-in zoom-in-95 duration-150">
            
            <div className="flex items-center justify-between pb-3 border-b border-line">
              <div className="flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-brand-blue" />
                <h3 className="text-base font-bold text-ink-primary">Initiate Refund</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsRefundModalOpen(false)}
                className="p-1 rounded-lg text-ink-secondary hover:bg-surface-subtle"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {refundSuccess ? (
              <div className="text-center py-6 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-brand-success mx-auto" />
                <h4 className="text-base font-bold text-ink-primary">Refund Queued for Instant Disbursal</h4>
                <p className="text-xs text-ink-secondary">
                  Customer will receive funds back to original source account within standard banking SLA.
                </p>
              </div>
            ) : (
              <form onSubmit={executeRefund} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-ink-primary mb-1">Payment ID</label>
                  <input
                    type="text"
                    disabled
                    value={selectedTx.id}
                    className="w-full px-3 py-2 bg-surface-subtle border border-line rounded-xl text-ink-secondary font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-ink-primary mb-1">Refund Amount (₹)</label>
                  <input
                    type="number"
                    max={selectedTx.amount}
                    value={refundAmount}
                    onChange={(e) => setRefundAmount(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-line rounded-xl text-ink-primary font-mono font-bold"
                  />
                  <p className="text-[11px] text-ink-secondary mt-1">
                    Maximum refundable: {formatCurrency(selectedTx.amount)}
                  </p>
                </div>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-800 text-[11px] flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                  <span>
                    Refund will be processed via original payment rail ({selectedTx.method}). This action creates an immutable ledger entry.
                  </span>
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsRefundModalOpen(false)}
                    className="px-4 py-2 text-ink-secondary hover:text-ink-primary font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-subtle"
                  >
                    Confirm & Execute Refund
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}

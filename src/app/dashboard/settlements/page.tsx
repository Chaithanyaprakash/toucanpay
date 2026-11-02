"use client";

import React, { useState } from "react";
import { 
  Landmark, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight, 
  Download, 
  Plus, 
  Building2, 
  AlertCircle 
} from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";

const MOCK_SETTLEMENTS = [
  {
    batchId: "set_batch_261026_01",
    bank: "HDFC Bank (A/C ••••8192)",
    amount: 41205800.00,
    fees: 824116.00,
    tax: 148340.88,
    netDisbursed: 40233343.12,
    status: "disbursed",
    utr: "HDFCN261026481029",
    settledAt: "2026-10-26T11:30:00Z",
    cycle: "T+1 Daily Batch",
  },
  {
    batchId: "set_batch_251026_01",
    bank: "HDFC Bank (A/C ••••8192)",
    amount: 38910400.00,
    fees: 778208.00,
    tax: 140077.44,
    netDisbursed: 37992114.56,
    status: "disbursed",
    utr: "HDFCN251025918204",
    settledAt: "2026-10-25T11:30:00Z",
    cycle: "T+1 Daily Batch",
  },
  {
    batchId: "set_batch_241026_01",
    bank: "Axis Bank (A/C ••••4910)",
    amount: 14200000.00,
    fees: 284000.00,
    tax: 51120.00,
    netDisbursed: 13864880.00,
    status: "disbursed",
    utr: "AXISN241024881029",
    settledAt: "2026-10-24T16:00:00Z",
    cycle: "T+0 Instant Batch",
  },
];

export default function SettlementsPage() {
  const [activeCycle, setActiveCycle] = useState("all");

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink-primary">Settlements & Payouts</h1>
          <p className="text-xs text-ink-secondary mt-0.5">
            Transparent breakdown of funds disbursed into your verified merchant current accounts.
          </p>
        </div>

        <button
          type="button"
          onClick={() => alert("Downloading RBI-compliant settlement reconciliation MIS sheet...")}
          className="px-3.5 py-2 bg-white hover:bg-surface-subtle text-ink-primary border border-line rounded-xl text-xs font-semibold shadow-subtle flex items-center gap-1.5 w-fit"
        >
          <Download className="w-3.5 h-3.5 text-brand-blue" />
          <span>Download MIS Report</span>
        </button>
      </div>

      {/* Balance Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        
        <div className="bg-white p-6 rounded-3xl border border-line shadow-subtle">
          <span className="text-xs font-semibold text-ink-secondary">Available for Next Payout</span>
          <p className="text-2xl font-bold font-heading text-ink-primary mt-2">
            ₹ 70,43,350.00
          </p>
          <div className="mt-2 flex items-center gap-1 text-xs text-brand-success font-medium">
            <Clock className="w-3.5 h-3.5" />
            <span>Scheduled for T+1 Disbursal (Tomorrow 11:30 AM)</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-line shadow-subtle">
          <span className="text-xs font-semibold text-ink-secondary">Total Settled (Past 30 Days)</span>
          <p className="text-2xl font-bold font-heading text-ink-primary mt-2">
            ₹ 124,19,40,000.00
          </p>
          <p className="mt-2 text-xs text-ink-secondary">Direct bank deposit via RTGS / NEFT</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-line shadow-subtle">
          <span className="text-xs font-semibold text-ink-secondary">Statutory Rolling Reserve</span>
          <p className="text-2xl font-bold font-heading text-ink-primary mt-2">
            ₹ 4,82,490.00
          </p>
          <p className="mt-2 text-xs text-ink-secondary">Held in nodal escrow for chargeback mitigation</p>
        </div>

      </div>

      {/* Settlements Table */}
      <div className="bg-white rounded-3xl border border-line shadow-card overflow-hidden">
        <div className="px-6 py-4 border-b border-line flex items-center justify-between">
          <h3 className="text-sm font-bold text-ink-primary">Settlement Batch History</h3>
          <span className="text-xs font-mono text-ink-secondary">Bank Clearing Status: Normal</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-subtle text-ink-secondary border-b border-line">
              <tr>
                <th className="px-6 py-3.5 font-semibold">Batch ID</th>
                <th className="px-6 py-3.5 font-semibold">Destination Bank Account</th>
                <th className="px-6 py-3.5 font-semibold">Gross Batch</th>
                <th className="px-6 py-3.5 font-semibold">Fees & Tax</th>
                <th className="px-6 py-3.5 font-semibold">Net Disbursed</th>
                <th className="px-6 py-3.5 font-semibold">Bank UTR Reference</th>
                <th className="px-6 py-3.5 font-semibold">Status</th>
                <th className="px-6 py-3.5 font-semibold">Settled Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/60">
              {MOCK_SETTLEMENTS.map((set) => (
                <tr key={set.batchId} className="hover:bg-surface-subtle/50 transition-colors">
                  <td className="px-6 py-4 font-mono font-medium text-brand-blue">{set.batchId}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Landmark className="w-4 h-4 text-brand-navy" />
                      <span className="font-semibold text-ink-primary">{set.bank}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-ink-primary">{formatCurrency(set.amount)}</td>
                  <td className="px-6 py-4 text-ink-secondary">
                    - {formatCurrency(set.fees + set.tax)}
                  </td>
                  <td className="px-6 py-4 font-bold text-brand-success font-mono">{formatCurrency(set.netDisbursed)}</td>
                  <td className="px-6 py-4 font-mono text-[11px] text-ink-primary">{set.utr}</td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {set.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-ink-secondary">{formatDate(set.settledAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

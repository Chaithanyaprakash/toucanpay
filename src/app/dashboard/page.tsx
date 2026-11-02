"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  TrendingUp, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  CreditCard, 
  DollarSign, 
  Download, 
  Plus, 
  Calendar,
  Layers,
  ArrowRight
} from "lucide-react";
import { MOCK_TRANSACTIONS } from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function DashboardOverviewPage() {
  const [dateFilter, setDateFilter] = useState("today");

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Title & Date Range Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink-primary">Merchant Performance Console</h1>
          <p className="text-xs text-ink-secondary mt-0.5">
            Real-time domestic UPI, Card, and Cross-Border PA-CB settlement telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center p-1 bg-white border border-line rounded-xl shadow-subtle text-xs">
            <button
              type="button"
              onClick={() => setDateFilter("today")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                dateFilter === "today" ? "bg-brand-blue text-white shadow-subtle" : "text-ink-secondary hover:text-ink-primary"
              }`}
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => setDateFilter("7d")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                dateFilter === "7d" ? "bg-brand-blue text-white shadow-subtle" : "text-ink-secondary hover:text-ink-primary"
              }`}
            >
              Last 7 Days
            </button>
            <button
              type="button"
              onClick={() => setDateFilter("30d")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                dateFilter === "30d" ? "bg-brand-blue text-white shadow-subtle" : "text-ink-secondary hover:text-ink-primary"
              }`}
            >
              30 Days
            </button>
          </div>

          <Link
            href="/dashboard/payment-links"
            className="px-3.5 py-2 bg-brand-blue hover:bg-brand-blue/90 text-white rounded-xl text-xs font-semibold shadow-subtle flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Link</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="bg-white p-6 rounded-3xl border border-line shadow-subtle">
          <div className="flex items-center justify-between text-xs text-ink-secondary">
            <span>Gross Payment Volume</span>
            <span className="text-[10px] font-mono text-brand-success bg-brand-success/10 px-1.5 py-0.5 rounded font-bold">+18.4%</span>
          </div>
          <p className="text-2xl font-bold font-heading text-ink-primary mt-2">
            ₹ 4,82,49,150.00
          </p>
          <p className="mt-2 text-xs text-ink-secondary">38,410 transactions cleared</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-line shadow-subtle">
          <div className="flex items-center justify-between text-xs text-ink-secondary">
            <span>Payment Success Rate</span>
            <span className="text-[10px] font-mono text-brand-blue bg-brand-blue/10 px-1.5 py-0.5 rounded font-bold">SuperStream</span>
          </div>
          <p className="text-2xl font-bold font-heading text-brand-blue mt-2">
            99.98%
          </p>
          <p className="mt-2 text-xs text-ink-secondary">Avg switch latency: 42ms</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-line shadow-subtle">
          <div className="flex items-center justify-between text-xs text-ink-secondary">
            <span>Settled Today (T+1 Bank)</span>
            <span className="text-[10px] font-mono text-brand-success bg-brand-success/10 px-1.5 py-0.5 rounded font-bold">NEFT Cleared</span>
          </div>
          <p className="text-2xl font-bold font-heading text-ink-primary mt-2">
            ₹ 4,12,05,800.00
          </p>
          <p className="mt-2 text-xs text-ink-secondary">Disbursed to HDFC Current A/C</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-line shadow-subtle">
          <div className="flex items-center justify-between text-xs text-ink-secondary">
            <span>Average Order Value</span>
            <span className="text-[10px] font-mono text-ink-secondary bg-surface-subtle px-1.5 py-0.5 rounded">All Channels</span>
          </div>
          <p className="text-2xl font-bold font-heading text-ink-primary mt-2">
            ₹ 1,256.00
          </p>
          <p className="mt-2 text-xs text-ink-secondary">UPI Intent represents 64%</p>
        </div>

      </div>

      {/* Chart & Channel Distribution Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Hourly Volume Chart (8 cols) */}
        <div className="lg:col-span-8 bg-white p-7 rounded-3xl border border-line shadow-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-line">
            <div>
              <h3 className="text-sm font-bold text-ink-primary">Intraday Settlement Velocity</h3>
              <p className="text-xs text-ink-secondary">Hourly transactions passing through AcquireFlow & SuperStream</p>
            </div>
            <span className="text-xs font-mono font-bold text-brand-blue">Peak: 14:00 IST (1,480 TPS)</span>
          </div>

          <div className="h-56 w-full flex items-end justify-between gap-2 pt-4">
            {[
              { time: "08:00", val: 32 },
              { time: "10:00", val: 58 },
              { time: "12:00", val: 84 },
              { time: "14:00", val: 100 },
              { time: "16:00", val: 92 },
              { time: "18:00", val: 78 },
              { time: "20:00", val: 64 },
            ].map((col, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group">
                <div
                  style={{ height: `${col.val}%`, backgroundColor: "#136FC6" }}
                  className="w-full max-w-[40px] rounded-t-lg transition-all duration-300 group-hover:opacity-90"
                />
                <span className="mt-2 text-[10px] font-mono text-ink-secondary">{col.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Insights & Actions (4 cols) */}
        <div className="lg:col-span-4 bg-white p-7 rounded-3xl border border-line shadow-card space-y-5">
          <h3 className="text-sm font-bold text-ink-primary">Acquirer Switch Health</h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-surface-subtle rounded-xl border border-line flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-success" />
                <span className="font-semibold text-ink-primary">NPCI UPI Direct</span>
              </div>
              <span className="font-mono text-brand-success font-bold">99.99%</span>
            </div>

            <div className="p-3 bg-surface-subtle rounded-xl border border-line flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-success" />
                <span className="font-semibold text-ink-primary">Visa / Mastercard 3DS</span>
              </div>
              <span className="font-mono text-brand-success font-bold">99.95%</span>
            </div>

            <div className="p-3 bg-surface-subtle rounded-xl border border-line flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-success" />
                <span className="font-semibold text-ink-primary">Bharat Connect BBPS</span>
              </div>
              <span className="font-mono text-brand-success font-bold">99.98%</span>
            </div>

            <div className="p-3 bg-surface-subtle rounded-xl border border-line flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-success" />
                <span className="font-semibold text-ink-primary">Cross-Border FX Clearing</span>
              </div>
              <span className="font-mono text-brand-success font-bold">99.92%</span>
            </div>
          </div>

          <Link
            href="/dashboard/transactions"
            className="w-full py-2.5 px-3 bg-surface-subtle hover:bg-white text-brand-blue border border-line rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-all"
          >
            <span>Open Transaction Ledger</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>

      {/* Recent Ledger Feed */}
      <div className="bg-white rounded-3xl border border-line shadow-card overflow-hidden">
        <div className="px-6 py-4 border-b border-line flex items-center justify-between">
          <h3 className="text-sm font-bold text-ink-primary">Recent Cleared Transactions</h3>
          <Link href="/dashboard/transactions" className="text-xs font-semibold text-brand-blue hover:underline">
            View All Transactions &rarr;
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-subtle text-ink-secondary border-b border-line">
              <tr>
                <th className="px-6 py-3 font-semibold">Transaction ID</th>
                <th className="px-6 py-3 font-semibold">Customer</th>
                <th className="px-6 py-3 font-semibold">Method</th>
                <th className="px-6 py-3 font-semibold">Amount</th>
                <th className="px-6 py-3 font-semibold">Status</th>
                <th className="px-6 py-3 font-semibold">Created At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/60">
              {MOCK_TRANSACTIONS.map((tx) => (
                <tr key={tx.id} className="hover:bg-surface-subtle/50 transition-colors">
                  <td className="px-6 py-4 font-mono font-medium text-brand-blue">{tx.id}</td>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

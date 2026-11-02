"use client";

import React, { useState } from "react";
import { 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  Clock, 
  UploadCloud, 
  ArrowRight,
  Sliders,
  X
} from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";

interface DisputeCase {
  id: string;
  txId: string;
  customerName: string;
  amount: number;
  reason: string;
  evidenceDeadline: string;
  status: "action_required" | "under_review" | "won";
}

const MOCK_DISPUTES: DisputeCase[] = [
  {
    id: "dsp_2026_90124",
    txId: "pay_live_08912401",
    customerName: "Vikram Malhotra",
    amount: 14850.00,
    reason: "Claim of unrecognized transaction on card network",
    evidenceDeadline: "2026-11-02T23:59:59Z",
    status: "action_required",
  },
  {
    id: "dsp_2026_90125",
    txId: "pay_live_08912402",
    customerName: "Priya Venkatesh",
    amount: 52400.00,
    reason: "Goods / services alleged not received",
    evidenceDeadline: "2026-10-30T23:59:59Z",
    status: "under_review",
  },
];

export default function RiskPage() {
  const [disputes, setDisputes] = useState<DisputeCase[]>(MOCK_DISPUTES);
  const [selectedCase, setSelectedCase] = useState<DisputeCase | null>(null);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink-primary">Risk, Fraud & Disputes</h1>
          <p className="text-xs text-ink-secondary mt-0.5">
            Automated transaction risk scoring, chargeback defense, and regulatory AML velocity controls.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-brand-success font-semibold flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
            <CheckCircle2 className="w-4 h-4" />
            <span>Fraud Rate: 0.002% (Well below 0.9% Visa Threshold)</span>
          </span>
        </div>
      </div>

      {/* Risk Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-3xl border border-line shadow-subtle">
          <span className="text-xs font-semibold text-ink-secondary">Overall Portfolio Risk Score</span>
          <p className="text-2xl font-bold font-heading text-brand-success mt-2">
            98 / 100 (Optimal)
          </p>
          <p className="mt-2 text-xs text-ink-secondary">Real-time device & card fingerprinting active</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-line shadow-subtle">
          <span className="text-xs font-semibold text-ink-secondary">Active Chargeback Disputes</span>
          <p className="text-2xl font-bold font-heading text-ink-primary mt-2">
            2 Cases Pending
          </p>
          <p className="mt-2 text-xs text-amber-600 font-medium">1 requires evidence upload within 7 days</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-line shadow-subtle">
          <span className="text-xs font-semibold text-ink-secondary">Velocity Rule Interventions</span>
          <p className="text-2xl font-bold font-heading text-brand-blue mt-2">
            18 Blocked
          </p>
          <p className="mt-2 text-xs text-ink-secondary">High-velocity card testing attacks deflected</p>
        </div>
      </div>

      {/* Disputes Queue Table */}
      <div className="bg-white rounded-3xl border border-line shadow-card overflow-hidden">
        <div className="px-6 py-4 border-b border-line flex items-center justify-between">
          <h3 className="text-sm font-bold text-ink-primary">Dispute Defense Queue</h3>
          <span className="text-xs text-ink-secondary">Evidence submitted directly to Visa / Mastercard arbitration</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-subtle text-ink-secondary border-b border-line">
              <tr>
                <th className="px-6 py-3.5 font-semibold">Case ID</th>
                <th className="px-6 py-3.5 font-semibold">Payment ID</th>
                <th className="px-6 py-3.5 font-semibold">Customer</th>
                <th className="px-6 py-3.5 font-semibold">Amount</th>
                <th className="px-6 py-3.5 font-semibold">Reason</th>
                <th className="px-6 py-3.5 font-semibold">Evidence Due</th>
                <th className="px-6 py-3.5 font-semibold">Status</th>
                <th className="px-6 py-3.5 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/60">
              {disputes.map((d) => (
                <tr key={d.id} className="hover:bg-surface-subtle/50 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-brand-blue">{d.id}</td>
                  <td className="px-6 py-4 font-mono text-ink-secondary">{d.txId}</td>
                  <td className="px-6 py-4 font-bold text-ink-primary">{d.customerName}</td>
                  <td className="px-6 py-4 font-bold text-ink-primary">{formatCurrency(d.amount)}</td>
                  <td className="px-6 py-4 text-ink-secondary max-w-xs">{d.reason}</td>
                  <td className="px-6 py-4 text-amber-600 font-medium">{formatDate(d.evidenceDeadline)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                      d.status === "action_required"
                        ? "bg-amber-100 text-amber-800 border border-amber-300"
                        : "bg-blue-50 text-brand-blue border border-blue-200"
                    }`}>
                      {d.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedCase(d)}
                      className="px-3 py-1.5 bg-brand-blue text-white rounded-lg font-semibold hover:bg-brand-blue/90 shadow-subtle"
                    >
                      Submit Evidence
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* EVIDENCE SUBMISSION MODAL */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 bg-ink-primary/30 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-line shadow-elevated space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-line">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-brand-blue" />
                <h3 className="text-base font-bold text-ink-primary">Submit Dispute Evidence</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCase(null)}
                className="p-1 rounded-lg text-ink-secondary hover:bg-surface-subtle"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 bg-surface-subtle rounded-xl border border-line text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-ink-secondary">Case:</span>
                <span className="font-mono font-bold text-ink-primary">{selectedCase.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-secondary">Disputed Amount:</span>
                <span className="font-bold text-ink-primary">{formatCurrency(selectedCase.amount)}</span>
              </div>
            </div>

            <div className="border-2 border-dashed border-brand-blue/40 rounded-2xl p-6 text-center bg-brand-blue/5 hover:bg-brand-blue/10 transition-colors cursor-pointer text-xs">
              <UploadCloud className="w-8 h-8 text-brand-blue mx-auto mb-2" />
              <p className="font-bold text-ink-primary">Upload Proof of Fulfillment / Agreement</p>
              <p className="text-[11px] text-ink-secondary mt-1">
                Accepted: Invoices, shipping tracking logs, customer IP logs, communication history.
              </p>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelectedCase(null)}
                className="px-4 py-2 text-ink-secondary hover:text-ink-primary font-semibold text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  alert("Evidence submitted to acquiring bank arbitration queue.");
                  setSelectedCase(null);
                }}
                className="px-5 py-2.5 bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold text-xs rounded-xl shadow-subtle"
              >
                Submit Evidence to Card Network
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

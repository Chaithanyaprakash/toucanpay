"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ShieldAlert, 
  Server, 
  Activity, 
  ArrowLeft, 
  CheckCircle2, 
  AlertTriangle, 
  Sliders, 
  Database,
  Lock
} from "lucide-react";

const PROVIDERS = [
  { name: "HDFC Bank Direct Switch", type: "Acquiring Rail", status: "operational", latency: "38ms", successRate: "99.98%" },
  { name: "ICICI Bank Core API", type: "Acquiring Rail", status: "operational", latency: "44ms", successRate: "99.94%" },
  { name: "Axis Bank Switch", type: "Acquiring Rail", status: "operational", latency: "41ms", successRate: "99.96%" },
  { name: "NPCI UPI 2.0 Switch", type: "National Rail", status: "operational", latency: "29ms", successRate: "99.99%" },
  { name: "Visa DPS Token Gateway", type: "Card Network", status: "operational", latency: "52ms", successRate: "99.97%" },
  { name: "Mastercard Identity Check", type: "3DS Auth", status: "operational", latency: "65ms", successRate: "99.91%" },
];

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-surface-subtle py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-success" />
              <span className="text-[10px] font-mono font-bold text-ink-secondary uppercase">
                Internal Ops • Level 4 Clearance
              </span>
            </div>
            <h1 className="text-2xl font-bold text-ink-primary">Super-Admin Operations Console</h1>
            <p className="text-xs text-ink-secondary mt-0.5">
              Live provider health, SuperStream routing topology, and platform-wide incident monitoring.
            </p>
          </div>

          <Link
            href="/"
            className="px-4 py-2 bg-white hover:bg-surface-subtle text-ink-secondary hover:text-brand-blue border border-line rounded-xl text-xs font-semibold shadow-subtle flex items-center gap-2 w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Public Website</span>
          </Link>
        </div>

        {/* Global Cluster Status */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
          <div className="bg-white p-6 rounded-3xl border border-line shadow-subtle">
            <span className="text-xs text-ink-secondary font-semibold">Active Acquirers</span>
            <p className="text-2xl font-bold font-heading text-ink-primary mt-2">6 Connected</p>
            <p className="text-xs text-brand-success mt-1">100% operational</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-line shadow-subtle">
            <span className="text-xs text-ink-secondary font-semibold">Cluster TPS Throughput</span>
            <p className="text-2xl font-bold font-heading text-brand-blue mt-2">1,840 TPS</p>
            <p className="text-xs text-ink-secondary mt-1">Dual-active cluster nodes</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-line shadow-subtle">
            <span className="text-xs text-ink-secondary font-semibold">SuperStream Failover</span>
            <p className="text-2xl font-bold font-heading text-ink-primary mt-2">0 Breaches</p>
            <p className="text-xs text-brand-success mt-1">Sub-50ms switchover</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-line shadow-subtle">
            <span className="text-xs text-ink-secondary font-semibold">RBI PA Escrow Float</span>
            <p className="text-2xl font-bold font-heading text-ink-primary mt-2">₹ 482.4 Cr</p>
            <p className="text-xs text-ink-secondary mt-1">100% nodal account backing</p>
          </div>
        </div>

        {/* Provider Health Matrix */}
        <div className="bg-white rounded-3xl border border-line shadow-card overflow-hidden">
          <div className="px-6 py-4 border-b border-line flex items-center justify-between">
            <h3 className="text-sm font-bold text-ink-primary">Acquirer Switch Health & Telemetry</h3>
            <span className="text-xs font-mono text-brand-success font-semibold">Live Heartbeat 10s</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-subtle text-ink-secondary border-b border-line">
                <tr>
                  <th className="px-6 py-3.5 font-semibold">Provider / Rail</th>
                  <th className="px-6 py-3.5 font-semibold">Category</th>
                  <th className="px-6 py-3.5 font-semibold">Latency</th>
                  <th className="px-6 py-3.5 font-semibold">Success Rate</th>
                  <th className="px-6 py-3.5 font-semibold">Health Status</th>
                  <th className="px-6 py-3.5 font-semibold text-right">Routing Priority</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                {PROVIDERS.map((p, idx) => (
                  <tr key={idx} className="hover:bg-surface-subtle/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-ink-primary">{p.name}</td>
                    <td className="px-6 py-4 text-ink-secondary">{p.type}</td>
                    <td className="px-6 py-4 font-mono font-medium text-brand-blue">{p.latency}</td>
                    <td className="px-6 py-4 font-mono font-bold text-brand-success">{p.successRate}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span>OPERATIONAL</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="px-2 py-1 bg-surface-subtle border border-line rounded-lg font-mono font-bold text-ink-primary">
                        Priority {idx + 1}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

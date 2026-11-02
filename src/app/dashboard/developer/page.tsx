"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Key, 
  Copy, 
  Check, 
  Eye, 
  EyeOff, 
  RefreshCw, 
  Webhook, 
  Terminal, 
  Plus, 
  ExternalLink,
  ShieldCheck 
} from "lucide-react";

export default function DeveloperConsolePage() {
  const [showLiveSecret, setShowLiveSecret] = useState(false);
  const [showTestSecret, setShowTestSecret] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (key: string, val: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink-primary">Developer Credentials & Webhooks</h1>
          <p className="text-xs text-ink-secondary mt-0.5">
            Manage REST API keys, configure signed webhook destinations, and inspect live request logs.
          </p>
        </div>

        <Link
          href="/developers"
          className="px-4 py-2 bg-white hover:bg-surface-subtle text-brand-blue border border-line rounded-xl text-xs font-semibold shadow-subtle flex items-center gap-2 w-fit"
        >
          <Terminal className="w-4 h-4" />
          <span>Open API Documentation</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* API Keys Management */}
      <div className="bg-white p-7 rounded-3xl border border-line shadow-card space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-line">
          <div>
            <h3 className="text-sm font-bold text-ink-primary">API Credentials</h3>
            <p className="text-xs text-ink-secondary">Never share your secret keys in public or client-side bundles.</p>
          </div>
          <button
            type="button"
            onClick={() => alert("Rotating secret credentials...")}
            className="px-3 py-1.5 text-xs font-semibold text-brand-blue hover:bg-surface-subtle border border-line rounded-lg flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Roll Keys</span>
          </button>
        </div>

        {/* Live Key Row */}
        <div className="p-4 bg-surface-subtle rounded-2xl border border-line space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-success" />
              <span className="text-xs font-bold text-ink-primary">Production Live Environment</span>
            </div>
            <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">ACTIVE</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <span className="text-ink-secondary block mb-1">Publishable Key (Client)</span>
              <div className="p-2.5 bg-white rounded-xl border border-line flex items-center justify-between">
                <span>pk_live_toucan904812049182</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard("pk_live", "pk_live_toucan904812049182")}
                  className="text-brand-blue hover:text-brand-cyan"
                >
                  {copiedKey === "pk_live" ? <Check className="w-4 h-4 text-brand-success" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <span className="text-ink-secondary block mb-1">Secret Key (Server Only)</span>
              <div className="p-2.5 bg-white rounded-xl border border-line flex items-center justify-between">
                <span>{showLiveSecret ? "sk_live_9f048291084bca81920" : "sk_live_••••••••••••••••••••"}</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowLiveSecret(!showLiveSecret)}
                    className="text-ink-secondary hover:text-ink-primary"
                  >
                    {showLiveSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => copyToClipboard("sk_live", "sk_live_9f048291084bca81920")}
                    className="text-brand-blue hover:text-brand-cyan"
                  >
                    {copiedKey === "sk_live" ? <Check className="w-4 h-4 text-brand-success" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sandbox Key Row */}
        <div className="p-4 bg-surface-subtle rounded-2xl border border-line space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-cyan" />
              <span className="text-xs font-bold text-ink-primary">Sandbox Testing Environment</span>
            </div>
            <span className="text-[10px] font-mono font-bold text-brand-blue bg-brand-blue/10 px-2 py-0.5 rounded">TEST</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <span className="text-ink-secondary block mb-1">Publishable Key (Test)</span>
              <div className="p-2.5 bg-white rounded-xl border border-line flex items-center justify-between">
                <span>pk_test_toucan881294</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard("pk_test", "pk_test_toucan881294")}
                  className="text-brand-blue hover:text-brand-cyan"
                >
                  {copiedKey === "pk_test" ? <Check className="w-4 h-4 text-brand-success" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <span className="text-ink-secondary block mb-1">Secret Key (Test)</span>
              <div className="p-2.5 bg-white rounded-xl border border-line flex items-center justify-between">
                <span>{showTestSecret ? "sk_test_demo8912908" : "sk_test_••••••••••••••••••••"}</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowTestSecret(!showTestSecret)}
                    className="text-ink-secondary hover:text-ink-primary"
                  >
                    {showTestSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => copyToClipboard("sk_test", "sk_test_demo8912908")}
                    className="text-brand-blue hover:text-brand-cyan"
                  >
                    {copiedKey === "sk_test" ? <Check className="w-4 h-4 text-brand-success" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Webhook Endpoints & Live Dispatch Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Webhooks Config */}
        <div className="bg-white p-7 rounded-3xl border border-line shadow-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-line">
            <h3 className="text-sm font-bold text-ink-primary">Registered Webhook Endpoints</h3>
            <button
              type="button"
              onClick={() => alert("Add new webhook endpoint modal")}
              className="px-2.5 py-1 text-xs font-semibold text-brand-blue hover:bg-surface-subtle border border-line rounded-lg flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Endpoint</span>
            </button>
          </div>

          <div className="p-4 bg-surface-subtle rounded-2xl border border-line space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-ink-primary">https://api.acmeglobal.io/webhooks/toucan</span>
              <span className="text-[10px] text-brand-success font-semibold">Enabled</span>
            </div>
            <p className="text-ink-secondary text-[11px]">
              Subscribed to: `payment.captured`, `payment.failed`, `refund.processed`
            </p>
            <div className="pt-2 flex justify-between text-[11px] font-mono text-ink-tertiary">
              <span>Secret: whsec_••••••••••</span>
              <span>Success Rate: 100% (200 OK)</span>
            </div>
          </div>
        </div>

        {/* Live Request Log Feed */}
        <div className="bg-white p-7 rounded-3xl border border-line shadow-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-line">
            <h3 className="text-sm font-bold text-ink-primary">Live API Request Logs</h3>
            <span className="text-xs font-mono text-brand-success font-semibold">Live Stream Active</span>
          </div>

          <div className="space-y-2 font-mono text-xs">
            <div className="p-2.5 bg-surface-subtle rounded-xl border border-line flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">200 OK</span>
                <span className="text-ink-primary">POST /v1/orders</span>
              </div>
              <span className="text-ink-secondary text-[11px]">112ms</span>
            </div>

            <div className="p-2.5 bg-surface-subtle rounded-xl border border-line flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">200 OK</span>
                <span className="text-ink-primary">POST /v1/payments/capture</span>
              </div>
              <span className="text-ink-secondary text-[11px]">148ms</span>
            </div>

            <div className="p-2.5 bg-surface-subtle rounded-xl border border-line flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">201 CREATED</span>
                <span className="text-ink-primary">POST /v1/payment_links</span>
              </div>
              <span className="text-ink-secondary text-[11px]">96ms</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

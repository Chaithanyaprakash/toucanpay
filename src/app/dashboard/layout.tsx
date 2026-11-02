"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BarChart3, 
  Receipt, 
  CreditCard, 
  Link2, 
  FileText, 
  Landmark, 
  Key, 
  ShieldAlert, 
  ArrowLeft, 
  Bell, 
  Search, 
  ChevronDown, 
  SlidersHorizontal,
  LogOut,
  ExternalLink
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Overview", href: "/dashboard", icon: BarChart3 },
  { label: "Transactions", href: "/dashboard/transactions", icon: Receipt },
  { label: "Settlements & Payouts", href: "/dashboard/settlements", icon: Landmark },
  { label: "Payment Links", href: "/dashboard/payment-links", icon: Link2 },
  { label: "Billing & Invoices", href: "/dashboard/billing", icon: FileText },
  { label: "Developer & API", href: "/dashboard/developer", icon: Key },
  { label: "Risk & Disputes", href: "/dashboard/risk", icon: ShieldAlert },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [role, setRole] = useState("Finance Admin");
  const [environment, setEnvironment] = useState<"live" | "test">("live");

  return (
    <div className="h-screen w-full bg-surface-subtle flex text-ink-primary overflow-hidden">
      
      {/* STATIC LEFT SIDEBAR (Strict Light Theme - Permanently pinned and matching reference image) */}
      <aside className="w-72 h-screen sticky top-0 bg-white border-r border-[#E5DEC9] flex flex-col justify-between shrink-0 hidden md:flex overflow-y-auto z-40 select-none">
        <div className="p-5 space-y-5">
          
          {/* Logo & LIVE Badge */}
          <div className="flex items-center justify-between pb-4 border-b border-[#E5DEC9]">
            <Link href="/" className="flex items-center gap-2">
              <img src="/brand/logo.svg" alt="Toucan Pay" className="h-6 w-auto object-contain" />
            </Link>
            <span className={`text-[11px] font-mono font-bold px-3 py-0.5 rounded-full border tracking-wider transition-colors ${
              environment === "live" 
                ? "bg-[#ECFDF5] text-[#059669] border-[#A7F3D0]" 
                : "bg-amber-50 text-amber-700 border-amber-200"
            }`}>
              {environment.toUpperCase()}
            </span>
          </div>

          {/* Account Card (Warm cream background matching reference template) */}
          <div className="p-3.5 bg-[#F2ECE4] rounded-2xl border border-[#E5DEC9]/40 flex items-center justify-between">
            <div className="text-xs">
              <p className="font-bold text-sm text-[#0F172A]">Toucan Merchant Inc</p>
              <p className="text-xs text-[#475569] font-mono mt-0.5">MID: mcht_live_904</p>
            </div>
            <button
              type="button"
              onClick={() => setEnvironment(environment === "live" ? "test" : "live")}
              className="text-xs text-[#136FC6] font-bold hover:text-[#0F52BA] transition-colors"
              title="Toggle Live / Sandbox environment"
            >
              Switch
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 pt-1">
            <p className="px-3 text-[11px] font-extrabold text-[#64748B] uppercase tracking-wider mb-2">
              MERCHANT NAVIGATION
            </p>
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = item.href === "/dashboard" 
                ? pathname === "/dashboard" 
                : (pathname === item.href || pathname?.startsWith(item.href + "/"));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm transition-all ${
                    isActive
                      ? "bg-[#136FC6] text-white shadow-md font-bold"
                      : "text-[#1E293B] hover:text-[#136FC6] hover:bg-[#F5F1E8] font-semibold group"
                  }`}
                >
                  <Icon className={`w-5 h-5 shrink-0 transition-colors ${
                    isActive ? "text-white" : "text-[#334155] group-hover:text-[#136FC6]"
                  }`} />
                  <span className={`${isActive ? "text-white font-bold" : "text-[#1E293B] group-hover:text-[#136FC6]"}`}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

        </div>

        {/* Sidebar Footer Controls */}
        <div className="p-5 border-t border-[#E5DEC9] space-y-3 bg-[#FAF7F2]">
          <Link
            href="/checkout"
            className="w-full py-2.5 px-4 bg-white border border-[#E5DEC9] hover:border-[#136FC6] rounded-2xl text-xs font-bold text-[#0C1E38] flex items-center justify-between shadow-subtle hover:shadow transition-all group"
          >
            <span>Test Checkout UI</span>
            <ExternalLink className="w-4 h-4 text-[#136FC6] transition-transform group-hover:translate-x-0.5" />
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-semibold text-[#475569] hover:text-[#136FC6] px-1 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </aside>

      {/* MAIN DASHBOARD CONTENT AREA (Scrolls independently while sidebar remains static) */}
      <div className="flex-1 h-screen flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top Header Bar */}
        <header className="h-16 bg-white border-b border-line px-6 flex items-center justify-between sticky top-0 z-30 shadow-subtle shrink-0">
          
          <div className="flex items-center gap-4">
            <div className="relative w-72 hidden sm:block">
              <Search className="w-4 h-4 text-ink-tertiary absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search orders, transactions, RRNs..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-surface-subtle border border-line rounded-lg text-ink-primary focus:outline-none focus:border-brand-blue"
              />
            </div>

            <div className="hidden lg:flex items-center gap-2 text-xs text-ink-secondary border-l border-line pl-4">
              <span className="w-2 h-2 rounded-full bg-brand-success" />
              <span>SuperStream Router: Optimal (32ms)</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="p-2 text-ink-secondary hover:text-brand-blue rounded-lg hover:bg-surface-subtle relative"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-brand-cyan absolute top-1.5 right-1.5" />
            </button>

            {/* Role indicator */}
            <div className="flex items-center gap-2 text-xs font-medium text-ink-primary bg-surface-subtle px-3 py-1.5 rounded-lg border border-line">
              <span className="w-2 h-2 rounded-full bg-brand-blue" />
              <span>{role}</span>
            </div>
          </div>

        </header>

        {/* Dynamic Nested Content */}
        <main className="p-6 sm:p-8 flex-1 overflow-y-auto">
          {children}
        </main>

      </div>

    </div>
  );
}

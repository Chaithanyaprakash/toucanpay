"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ChevronDown, 
  Menu, 
  X, 
  ArrowRight, 
  CreditCard, 
  Globe, 
  Receipt, 
  Sparkles
} from "lucide-react";
import GlassAiButton from "@/components/ui/GlassAiButton";
import { asset } from "@/lib/assets";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled 
          ? "bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E5DEC9] shadow-subtle" 
          : "bg-[#FAF7F2]/90 backdrop-blur-sm border-b border-[#EDE7DC]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* 1. Left: Toucan Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <img
              src={asset("/brand/logo.svg")}
              alt="Toucan Payments"
              className="h-7 sm:h-8 w-auto object-contain"
            />
          </Link>

          {/* 2. Middle: Navigation Links in Royal Blue / Cream Theme */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-sm font-semibold text-[#4A5B73]">
            
            {/* Products */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown("products")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                className={`inline-flex items-center gap-1.5 py-2 hover:text-[#0F52BA] transition-colors ${
                  activeDropdown === "products" ? "text-[#0F52BA] font-bold" : ""
                }`}
              >
                <span>Products</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === "products" ? "rotate-180 text-[#0F52BA]" : "opacity-60"}`} />
              </button>

              {activeDropdown === "products" && (
                <div className="absolute top-full -left-4 pt-2 w-72 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="bg-white rounded-2xl p-2.5 shadow-elevated border border-[#E5DEC9] space-y-1">
                    <Link
                      href="/#products"
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#FAF7F2] transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0F52BA] flex items-center justify-center">
                        <CreditCard className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#0C1E38] group-hover:text-[#0F52BA]">Payment Gateway</p>
                        <p className="text-[11px] text-[#7D8CA3]">Accept UPI, cards & 100+ modes</p>
                      </div>
                    </Link>

                    <Link
                      href="/#products"
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#FAF7F2] transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 text-brand-success flex items-center justify-center">
                        <Receipt className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#0C1E38] group-hover:text-[#0F52BA]">Bill Collections</p>
                        <p className="text-[11px] text-[#7D8CA3]">BBPS recurring utility collections</p>
                      </div>
                    </Link>

                    <Link
                      href="/#products"
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#FAF7F2] transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                        <Globe className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#0C1E38] group-hover:text-[#0F52BA]">Cross-Border Settlements</p>
                        <p className="text-[11px] text-[#7D8CA3]">RBI PA-CB trade remittances</p>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Solutions */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown("solutions")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                className={`inline-flex items-center gap-1.5 py-2 hover:text-[#0F52BA] transition-colors ${
                  activeDropdown === "solutions" ? "text-[#0F52BA] font-bold" : ""
                }`}
              >
                <span>Solutions</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === "solutions" ? "rotate-180 text-[#0F52BA]" : "opacity-60"}`} />
              </button>

              {activeDropdown === "solutions" && (
                <div className="absolute top-full -left-4 pt-2 w-64 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="bg-white rounded-2xl p-2.5 shadow-elevated border border-[#E5DEC9] space-y-1">
                    <Link
                      href="/#industries"
                      onClick={() => setActiveDropdown(null)}
                      className="block p-2 rounded-xl hover:bg-[#FAF7F2] text-xs font-semibold text-[#0C1E38] hover:text-[#0F52BA]"
                    >
                      Financial Services & NBFCs
                    </Link>
                    <Link
                      href="/#industries"
                      onClick={() => setActiveDropdown(null)}
                      className="block p-2 rounded-xl hover:bg-[#FAF7F2] text-xs font-semibold text-[#0C1E38] hover:text-[#0F52BA]"
                    >
                      Consumer Utilities & Telco
                    </Link>
                    <Link
                      href="/#industries"
                      onClick={() => setActiveDropdown(null)}
                      className="block p-2 rounded-xl hover:bg-[#FAF7F2] text-xs font-semibold text-[#0C1E38] hover:text-[#0F52BA]"
                    >
                      E-commerce & Marketplaces
                    </Link>
                    <Link
                      href="/#industries"
                      onClick={() => setActiveDropdown(null)}
                      className="block p-2 rounded-xl hover:bg-[#FAF7F2] text-xs font-semibold text-[#0C1E38] hover:text-[#0F52BA]"
                    >
                      B2B Corporate Collections
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Developers */}
            <Link
              href="/#developers"
              className="py-2 hover:text-[#0F52BA] transition-colors"
            >
              Developers
            </Link>

            {/* Resources */}
            <Link
              href="/#faq"
              className="py-2 hover:text-[#0F52BA] transition-colors"
            >
              Resources
            </Link>

            {/* Pricing */}
            <Link
              href="/#faq"
              className="py-2 hover:text-[#0F52BA] transition-colors"
            >
              Pricing
            </Link>
          </nav>

          {/* 3. Right: Contact Sales & 3D Glass AI Button */}
          <div className="hidden md:flex items-center gap-5">
            <Link
              href="/onboarding"
              className="text-sm font-semibold text-[#4A5B73] hover:text-[#0C1E38] transition-colors"
            >
              Contact Sales
            </Link>

            {/* 3D Glass AI Button */}
            <GlassAiButton
              href="/onboarding"
              variant="royal"
              icon="arrow"
            >
              Book a Demo
            </GlassAiButton>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#0C1E38] rounded-xl hover:bg-[#F5F1E8]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF7F2] border-b border-[#E5DEC9] px-4 pt-2 pb-6 space-y-3">
          <Link
            href="/#products"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold text-[#0C1E38] hover:text-[#0F52BA]"
          >
            Products
          </Link>
          <Link
            href="/#industries"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold text-[#0C1E38] hover:text-[#0F52BA]"
          >
            Solutions
          </Link>
          <Link
            href="/#developers"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold text-[#0C1E38] hover:text-[#0F52BA]"
          >
            Developers
          </Link>
          <Link
            href="/#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold text-[#0C1E38] hover:text-[#0F52BA]"
          >
            Resources & Pricing
          </Link>

          <div className="pt-4 border-t border-[#E5DEC9] flex flex-col gap-2.5">
            <Link
              href="/onboarding"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl border border-[#E5DEC9] text-sm font-bold text-[#0C1E38]"
            >
              Contact Sales
            </Link>
            <GlassAiButton
              href="/onboarding"
              variant="royal"
              className="w-full justify-center"
            >
              Book a Demo
            </GlassAiButton>
          </div>
        </div>
      )}
    </header>
  );
}

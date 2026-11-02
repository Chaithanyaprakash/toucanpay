"use client";

import React, { useState } from "react";
import { Building2, Globe, ShieldCheck } from "lucide-react";

export default function TrustCredentials() {
  const [activeCategory, setActiveCategory] = useState<"rails" | "banks" | "global" | "institutions">("rails");

  return (
    <section className="py-10 sm:py-12 bg-[#FAF7F2] border-y border-[#E5DEC9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
          
          {/* Left: Section Tag & Logos */}
          <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#7D8CA3] shrink-0">
              TRUSTED PAYMENT RAILS AND PARTNERS
            </span>

            {/* Authentic Brand Logos */}
            <div className="flex flex-wrap items-center justify-center gap-7 sm:gap-9">
              {/* UPI */}
              <div className="h-6 flex items-center justify-center hover:scale-105 transition-transform">
                <span className="font-extrabold tracking-tight text-lg text-[#164194] italic font-mono">
                  UPI<span className="text-[#097937]">▶</span>
                </span>
              </div>

              {/* VISA */}
              <div className="h-6 flex items-center justify-center hover:scale-105 transition-transform">
                <img
                  src="/brand/visa.svg"
                  alt="Visa"
                  className="h-5 w-auto object-contain"
                />
              </div>

              {/* RuPay */}
              <div className="h-6 flex items-center justify-center hover:scale-105 transition-transform">
                <div className="flex items-center gap-1 font-bold text-sm tracking-tight text-[#0F294A]">
                  <span>RuPay</span>
                  <span className="text-[#E9953E]">❯</span>
                </div>
              </div>

              {/* Mastercard */}
              <div className="h-6 flex items-center justify-center hover:scale-105 transition-transform">
                <img
                  src="/brand/master-card.svg"
                  alt="Mastercard"
                  className="h-6 w-auto object-contain"
                />
              </div>

              {/* NPCI */}
              <div className="h-6 flex items-center justify-center hover:scale-105 transition-transform">
                <div className="flex items-center gap-1 text-xs font-black tracking-tight text-[#0F294A] border-l-2 border-[#E9953E] pl-1.5">
                  <span>NPCI</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Category Filter Pills in Royal Blue / Light Cream */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <button
              type="button"
              onClick={() => setActiveCategory("banks")}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-bold transition-all ${
                activeCategory === "banks"
                  ? "bg-white border-[#0F52BA] text-[#0F52BA] shadow-subtle"
                  : "bg-[#F5F1E8] border-[#E5DEC9] text-[#4A5B73] hover:text-[#0C1E38] hover:bg-white"
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Banks</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveCategory("global")}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-bold transition-all ${
                activeCategory === "global"
                  ? "bg-white border-[#0F52BA] text-[#0F52BA] shadow-subtle"
                  : "bg-[#F5F1E8] border-[#E5DEC9] text-[#4A5B73] hover:text-[#0C1E38] hover:bg-white"
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Global Partners</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveCategory("institutions")}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-bold transition-all ${
                activeCategory === "institutions"
                  ? "bg-white border-[#0F52BA] text-[#0F52BA] shadow-subtle"
                  : "bg-[#F5F1E8] border-[#E5DEC9] text-[#4A5B73] hover:text-[#0C1E38] hover:bg-white"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Financial Institutions</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}

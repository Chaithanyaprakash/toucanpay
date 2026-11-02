"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does Toucan's payment gateway work?",
      a: "Toucan provides a unified payment gateway orchestration API that connects your application to 100+ payment rails in India and globally. When a customer initiates a payment, Toucan's SuperStream engine dynamically routes the transaction to the optimal banking switch to guarantee maximum success rates and lowest latency."
    },
    {
      q: "Which payment methods are supported?",
      a: "Toucan supports all major payment modes including Instant UPI (QR, Deep-linking, Intent, AutoPay), Credit & Debit cards (Visa, Mastercard, RuPay with RBI tokenization), 50+ Netbanking institutions, Bharat Connect (BBPS) bill collections, and RBI-regulated cross-border trade remittances."
    },
    {
      q: "How long does settlement take?",
      a: "Toucan supports standard T+1 settlements, with accelerated instant T+0 and real-time on-demand settlement options available for verified enterprise merchants, ensuring smooth treasury and liquidity operations."
    },
    {
      q: "Is Toucan RBI authorized?",
      a: "Yes. Toucan operates with direct authorization from the Reserve Bank of India (RBI) under the Payment Aggregator (PA) and Cross-Border Payment Aggregator (PA-CB) regulatory frameworks, fully certified with PCI DSS Level 1 and ISO compliance."
    }
  ];

  return (
    <section id="faq" className="py-16 sm:py-24 bg-[#FAF7F2] border-t border-[#E5DEC9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Headline */}
          <div className="lg:col-span-5 text-left space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-[#EBF2FC] text-[#0F52BA] border border-[#BFD7F5]">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0D1B2A] tracking-tight leading-tight">
              Got questions?<br /><span className="text-[#0F52BA]">We&apos;ve got answers.</span>
            </h2>
            <p className="text-sm text-ink-secondary leading-relaxed pt-2">
              Learn how Toucan provides enterprise-grade high-availability payment routing, regulatory compliance, and seamless cross-border settlement.
            </p>
          </div>

          {/* Right Column: 4 Clean Accordion Cards */}
          <div className="lg:col-span-7 space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl transition-all duration-300 overflow-hidden ${
                    isOpen 
                      ? "bg-white border-2 border-[#0F52BA]/40 shadow-md ring-2 ring-[#0F52BA]/10" 
                      : "bg-[#FDFBF7] border border-[#E5DEC9] hover:border-[#0F52BA]/30 hover:bg-white shadow-sm"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[#0D1B2A] hover:text-[#0F52BA] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 shrink-0 ${
                        isOpen ? "rotate-180 text-[#0F52BA]" : "text-ink-secondary"
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-ink-secondary leading-relaxed border-t border-[#E5DEC9]/60 pt-3 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}

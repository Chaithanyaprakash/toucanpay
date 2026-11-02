"use client";

import React from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  CreditCard, 
  Receipt, 
  Globe2, 
  Link2, 
  CalendarClock, 
  FileSpreadsheet 
} from "lucide-react";
import Scroll3DCard from "@/components/ui/Scroll3DCard";

export default function PlatformBento() {
  const products = [
    {
      title: "Payment Gateway",
      description: "Accept payments across multiple methods.",
      icon: CreditCard,
      iconBg: "bg-blue-50 text-[#0F52BA] border-blue-200",
      href: "/checkout"
    },
    {
      title: "Bill Collections",
      description: "Simplify and automate recurring collections.",
      icon: Receipt,
      iconBg: "bg-emerald-50 text-brand-success border-emerald-200",
      href: "/dashboard"
    },
    {
      title: "Cross-border Payments",
      description: "Global settlements with regulatory excellence.",
      icon: Globe2,
      iconBg: "bg-purple-50 text-purple-600 border-purple-200",
      href: "/dashboard"
    },
    {
      title: "Payment Links",
      description: "Create and share payment links instantly.",
      icon: Link2,
      iconBg: "bg-sky-50 text-sky-600 border-sky-200",
      href: "/dashboard/payment-links"
    },
    {
      title: "Subscriptions & Invoices",
      description: "Manage recurring revenue and customer billing.",
      icon: CalendarClock,
      iconBg: "bg-indigo-50 text-indigo-600 border-indigo-200",
      href: "/dashboard"
    },
    {
      title: "Settlements & Reports",
      description: "Real-time insights and reconciliation.",
      icon: FileSpreadsheet,
      iconBg: "bg-teal-50 text-teal-600 border-teal-200",
      href: "/dashboard/settlements"
    }
  ];

  return (
    <section id="products" className="py-16 sm:py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl text-left">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#7D8CA3]">
              OUR PRODUCTS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0C1E38] tracking-tight mt-2">
              Everything you need to<br />move money with confidence
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#4A5B73] leading-relaxed">
              From payment acceptance to settlement and reconciliation, Toucan provides a complete suite of regulated payment solutions.
            </p>
          </div>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#E5DEC9] bg-white hover:border-[#0F52BA] text-xs sm:text-sm font-bold text-[#0C1E38] transition-all self-start md:self-auto hover:bg-[#F5F1E8]"
          >
            <span>Explore All Products</span>
            <ArrowRight className="w-4 h-4 text-[#0F52BA]" />
          </Link>
        </div>

        {/* 6 Products Grid with 3D Tilt Cards (All boxes strictly identical in size) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-5 items-stretch">
          {products.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Scroll3DCard key={idx} maxTilt={7} perspective={800} scale={1.02} className="h-full flex flex-col">
                <Link
                  href={item.href}
                  className="group p-5 rounded-2xl bg-white border border-[#E5DEC9] shadow-subtle hover:shadow-card hover:border-[#0F52BA] transition-all flex flex-col justify-between h-full min-h-[235px]"
                >
                  <div className="flex-1 flex flex-col">
                    {/* Clean Rounded Square Icon */}
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-4 transition-transform group-hover:scale-105 shrink-0 ${item.iconBg}`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Standardized Title Box (Fixed height for 100% equal card sizing) */}
                    <div className="h-11 flex items-start">
                      <h3 className="text-sm font-bold text-[#0C1E38] group-hover:text-[#0F52BA] transition-colors leading-snug">
                        {item.title}
                      </h3>
                    </div>

                    {/* Standardized Description Box */}
                    <p className="mt-1 text-xs text-[#4A5B73] leading-relaxed line-clamp-3 flex-1">
                      {item.description}
                    </p>
                  </div>

                  {/* Standardized Bottom Learn More Bar */}
                  <div className="mt-4 pt-3 border-t border-[#EDE7DC] flex items-center text-[11px] font-bold text-[#0F52BA] opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                    <span>Learn more</span>
                    <ArrowRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Link>
              </Scroll3DCard>
            );
          })}
        </div>

      </div>
    </section>
  );
}

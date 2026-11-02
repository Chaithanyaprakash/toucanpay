"use client";

import React from "react";
import Link from "next/link";
import { asset } from "@/lib/assets";
import { 
  Linkedin, 
  Twitter, 
  Youtube, 
  Instagram 
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#FAF7F2] border-t border-[#E5DEC9] pt-14 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Row: Logo & Social Media Icons */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-10 border-b border-[#E5DEC9] gap-4">
          <Link href="/" className="flex items-center gap-2">
            <img
              src={asset("/brand/logo.svg")}
              alt="Toucan Payments"
              className="h-8 w-auto object-contain"
            />
          </Link>

          {/* Social Icons with Royal Blue hover */}
          <div className="flex items-center gap-3 text-ink-secondary">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-full bg-white border border-[#E5DEC9] flex items-center justify-center hover:text-[#0F52BA] hover:border-[#0F52BA] hover:shadow-sm transition-all"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="w-9 h-9 rounded-full bg-white border border-[#E5DEC9] flex items-center justify-center hover:text-[#0F52BA] hover:border-[#0F52BA] hover:shadow-sm transition-all"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-9 h-9 rounded-full bg-white border border-[#E5DEC9] flex items-center justify-center hover:text-[#0F52BA] hover:border-[#0F52BA] hover:shadow-sm transition-all"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full bg-white border border-[#E5DEC9] flex items-center justify-center hover:text-[#0F52BA] hover:border-[#0F52BA] hover:shadow-sm transition-all"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* 5-Column Navigation Grid matching reference template */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-10 text-xs">
          
          {/* Col 1: Products */}
          <div>
            <h4 className="font-bold text-[#0D1B2A] text-sm mb-3.5">Products</h4>
            <ul className="space-y-2.5 text-ink-secondary">
              <li><Link href="/checkout" className="hover:text-[#0F52BA] transition-colors">Payment Gateway</Link></li>
              <li><Link href="/dashboard" className="hover:text-[#0F52BA] transition-colors">Bill Collections</Link></li>
              <li><Link href="/dashboard" className="hover:text-[#0F52BA] transition-colors">Cross-border Payments</Link></li>
              <li><Link href="/dashboard/payment-links" className="hover:text-[#0F52BA] transition-colors">Payment Links</Link></li>
              <li><Link href="/dashboard" className="hover:text-[#0F52BA] transition-colors">Subscriptions</Link></li>
            </ul>
          </div>

          {/* Col 2: Solutions */}
          <div>
            <h4 className="font-bold text-[#0D1B2A] text-sm mb-3.5">Solutions</h4>
            <ul className="space-y-2.5 text-ink-secondary">
              <li><Link href="/#industries" className="hover:text-[#0F52BA] transition-colors">Financial Services</Link></li>
              <li><Link href="/#industries" className="hover:text-[#0F52BA] transition-colors">Consumer Utilities</Link></li>
              <li><Link href="/#industries" className="hover:text-[#0F52BA] transition-colors">E-commerce</Link></li>
              <li><Link href="/#industries" className="hover:text-[#0F52BA] transition-colors">B2B Collections</Link></li>
              <li><Link href="/#industries" className="hover:text-[#0F52BA] transition-colors">More Industries</Link></li>
            </ul>
          </div>

          {/* Col 3: Developers */}
          <div>
            <h4 className="font-bold text-[#0D1B2A] text-sm mb-3.5">Developers</h4>
            <ul className="space-y-2.5 text-ink-secondary">
              <li><Link href="/#developers" className="hover:text-[#0F52BA] transition-colors">API Reference</Link></li>
              <li><Link href="/#developers" className="hover:text-[#0F52BA] transition-colors">SDKs</Link></li>
              <li><Link href="/#developers" className="hover:text-[#0F52BA] transition-colors">Webhooks</Link></li>
              <li><Link href="/dashboard" className="hover:text-[#0F52BA] transition-colors">Sandbox</Link></li>
              <li><Link href="/#developers" className="hover:text-[#0F52BA] transition-colors">Documentation</Link></li>
            </ul>
          </div>

          {/* Col 4: Resources */}
          <div>
            <h4 className="font-bold text-[#0D1B2A] text-sm mb-3.5">Resources</h4>
            <ul className="space-y-2.5 text-ink-secondary">
              <li><Link href="/#faq" className="hover:text-[#0F52BA] transition-colors">Blog</Link></li>
              <li><Link href="/#faq" className="hover:text-[#0F52BA] transition-colors">Case Studies</Link></li>
              <li><Link href="/#faq" className="hover:text-[#0F52BA] transition-colors">Help Center</Link></li>
              <li><Link href="/#superstream" className="hover:text-[#0F52BA] transition-colors">Status</Link></li>
              <li><Link href="/onboarding" className="hover:text-[#0F52BA] transition-colors">Contact Sales</Link></li>
            </ul>
          </div>

          {/* Col 5: Company */}
          <div>
            <h4 className="font-bold text-[#0D1B2A] text-sm mb-3.5">Company</h4>
            <ul className="space-y-2.5 text-ink-secondary">
              <li><Link href="/onboarding" className="hover:text-[#0F52BA] transition-colors">About Us</Link></li>
              <li><Link href="/onboarding" className="hover:text-[#0F52BA] transition-colors">Careers</Link></li>
              <li><Link href="/onboarding" className="hover:text-[#0F52BA] transition-colors">Newsroom</Link></li>
              <li><Link href="/onboarding" className="hover:text-[#0F52BA] transition-colors">Privacy</Link></li>
              <li><Link href="/onboarding" className="hover:text-[#0F52BA] transition-colors">Terms</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-[#E5DEC9] flex flex-col sm:flex-row items-center justify-between text-xs text-ink-tertiary gap-2">
          <span>© 2026 Toucan Payments India Pvt Ltd. Authorized by Reserve Bank of India (RBI).</span>
          <span className="text-[#0F52BA] font-medium">PCI DSS Level 1 Certified • ISO 27001</span>
        </div>

      </div>
    </footer>
  );
}

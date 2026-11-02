"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FullscreenVideoIntro from "@/components/ui/FullscreenVideoIntro";

export default function NavigationWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboardOrAdmin = pathname.startsWith("/dashboard") || pathname.startsWith("/admin");

  return (
    <>
      {/* 
        Fullscreen Intro Animation:
        Decoupled from page-routing lifecycle so it never remounts when changing routes,
        clicking the browser back arrow, or traversing history.
      */}
      <FullscreenVideoIntro />
      {!isDashboardOrAdmin && <Navbar />}
      <main className="flex-1">{children}</main>
      {!isDashboardOrAdmin && <Footer />}
    </>
  );
}

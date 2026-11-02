"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import ToucanLogoReveal from "@/components/3d/ToucanLogoReveal";
import { shouldShowIntro, markIntroCompletedInSession } from "@/lib/introState";

export default function FullscreenVideoIntro() {
  const [isVisible, setIsVisible] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return shouldShowIntro();
  });

  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const completedRef = useRef<boolean>(false);

  // Complete and dismiss intro
  const handleComplete = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;

    // Record session completion in sessionStorage
    markIntroCompletedInSession();

    setIsFadingOut(true);
    setTimeout(() => {
      setIsVisible(false);
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
      }
    }, 400);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
    }

    // Exact 5-second intro duration timer (4.6s animation + 0.4s smooth fade-out = exactly 5.0s)
    const timer = setTimeout(() => {
      handleComplete();
    }, 4600);

    // Browser back/forward button clicked while intro is active
    const handlePopState = () => {
      handleComplete();
    };

    // Back-Forward Cache (bfcache) restoration
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        handleComplete();
      }
    };

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("pageshow", handlePageShow);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("pageshow", handlePageShow);
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
      }
    };
  }, [isVisible, handleComplete]);

  if (!isVisible) return null;

  return (
    <div
      data-toucan-intro="active"
      aria-label="ToucanPay 5-Second Cinematic Brand Intro"
      className={`fixed inset-0 z-[99999] w-screen h-screen w-[100vw] h-[100vh] h-[100dvh] overflow-hidden bg-white select-none m-0 p-0 transition-opacity duration-400 ease-out flex items-center justify-center ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <ToucanLogoReveal
        fullscreen={true}
        duration={5.0}
        showControls={false}
        autoPlay={true}
        onComplete={handleComplete}
      />
    </div>
  );
}

"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import ToucanLogoReveal from "@/components/3d/ToucanLogoReveal";
import { shouldShowIntro, hasIntroCompletedInSession, markIntroCompletedInSession } from "@/lib/introState";
import "./LogoAnimation.css";

interface LogoAnimationProps {
  videoSrc?: string;
  onComplete?: () => void;
  children?: React.ReactNode;
}

/**
 * LogoAnimation Component
 * 
 * Scene Sequence:
 * 1. A debit card flies in from the top left corner (0.0s – 1.8s)
 * 2. Expanding to fill the entire screen for 5 seconds (1.8s – 5.0s)
 * 3. Moves smoothly to the center and starts disappearing into a burst of twinkling stars (5.0s – 6.2s)
 * 4. Smooth fade-in of a sleek custom logo with cinematic lighting and holographic sheen (6.2s – 7.4s)
 * 5. Brand identity hold and transition into landing page (7.4s – 8.0s)
 * 
 * Session Intelligence:
 * - Plays on initial session visit and explicit page refresh.
 * - Does NOT replay when user clicks the browser back button or navigates between pages.
 */
export default function LogoAnimation({
  videoSrc = "/your-generated-video.mp4",
  onComplete,
  children,
}: LogoAnimationProps) {
  const [isAnimationFinished, setIsAnimationFinished] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return !shouldShowIntro();
  });
  const [hasCustomVideo, setHasCustomVideo] = useState<boolean>(false);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const completedRef = useRef<boolean>(false);

  const handleAnimationEnd = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;

    markIntroCompletedInSession();
    setIsFadingOut(true);
    setTimeout(() => {
      setIsAnimationFinished(true);
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
      }
      if (onComplete) onComplete();
    }, 500);
  }, [onComplete]);

  useEffect(() => {
    // If intro should not show, skip immediately
    if (!shouldShowIntro()) {
      setIsAnimationFinished(true);
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
      }
      return;
    }

    // Lock body scrolling during the intro
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Browser back/forward button listeners
    const handlePopState = () => {
      handleAnimationEnd();
    };
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted || hasIntroCompletedInSession()) {
        handleAnimationEnd();
      }
    };
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("pageshow", handlePageShow);

    // Check if custom video file exists and can load
    if (videoSrc) {
      const probe = document.createElement("video");
      probe.src = videoSrc;
      probe.onloadeddata = () => setHasCustomVideo(true);
      probe.onerror = () => setHasCustomVideo(false);
    }

    // Fallback timer for 5 seconds
    const timer = setTimeout(() => {
      handleAnimationEnd();
    }, 5000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("pageshow", handlePageShow);
      document.body.style.overflow = originalOverflow;
    };
  }, [handleAnimationEnd, videoSrc]);

  const handleVideoEnded = () => {
    handleAnimationEnd();
  };

  return (
    <div className="app-container">
      {!isAnimationFinished ? (
        <div 
          className={`intro-animation transition-opacity duration-500 ease-out ${
            isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          {hasCustomVideo ? (
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              onEnded={handleVideoEnded}
              className="logo-video"
            >
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <ToucanLogoReveal
              fullscreen={true}
              duration={5.0}
              showControls={false}
              autoPlay={true}
              onComplete={handleAnimationEnd}
            />
          )}
        </div>
      ) : (
        <div className="landing-page">
          {children ? (
            children
          ) : (
            <header className="landing-header">
              <h1 className="text-3xl font-bold text-[#0C1E38]">ToucanPay Platform</h1>
              <p className="text-sm text-[#4A5B73] mt-2">Next-generation enterprise payment infrastructure.</p>
            </header>
          )}
        </div>
      )}
    </div>
  );
}

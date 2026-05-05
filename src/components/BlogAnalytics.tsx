"use client";

import { useEffect, useCallback } from "react";

interface AnalyticsProps {
  slug: string;
  ctaId?: string;
}

export default function BlogAnalytics({ slug, ctaId }: AnalyticsProps) {
  const trackEvent = useCallback((eventName: string, data?: Record<string, unknown>) => {
    // In production, this hits our tracking API
    fetch('/api/blog/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        event: eventName, 
        slug, 
        data: {
          ...data,
          isNewVisitor: !sessionStorage.getItem(`visited_${slug}`)
        } 
      }),
    }).catch(err => console.error("Analytics error:", err));

    if (eventName === "page_view") {
      sessionStorage.setItem(`visited_${slug}`, "true");
    }
  }, [slug]);

  useEffect(() => {
    // Track Page View
    trackEvent("page_view");

    // Track Scroll Depth
    let maxScroll = 0;
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        if (maxScroll % 25 === 0) { // Log every 25%
          trackEvent("scroll_depth", { depth: maxScroll });
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [trackEvent]);

  useEffect(() => {
    // Track Time on Page (every 30 seconds)
    let seconds = 0;
    const interval = setInterval(() => {
      seconds += 30;
      trackEvent("time_update", { seconds });
    }, 30000);

    return () => clearInterval(interval);
  }, [trackEvent]);

  useEffect(() => {
    // Track CTA Clicks if ID is provided
    if (ctaId) {
      const cta = document.getElementById(ctaId);
      if (cta) {
        const handleClick = () => trackEvent("cta_click");
        cta.addEventListener("click", handleClick);
        return () => cta.removeEventListener("click", handleClick);
      }
    }
  }, [ctaId, trackEvent]);

  return null; // This component doesn't render anything
}

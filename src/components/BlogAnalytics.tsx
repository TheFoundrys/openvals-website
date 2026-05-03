"use client";

import { useEffect, useCallback } from "react";

interface AnalyticsProps {
  slug: string;
  ctaId?: string;
}

export default function BlogAnalytics({ slug, ctaId }: AnalyticsProps) {
  const trackEvent = useCallback((eventName: string, data?: any) => {
    // For now, we log to console. 
    // In production, this would hit /api/blog/track
    console.log(`[Analytics] ${eventName}:`, { slug, ...data });
    
    // Example of how you would hit your own API:
    /*
    fetch('/api/blog/track', {
      method: 'POST',
      body: JSON.stringify({ event: eventName, slug, data }),
    });
    */
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

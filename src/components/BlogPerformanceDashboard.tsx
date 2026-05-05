"use client";

import { useState } from "react";
import styles from "./ui.module.css";

interface Props {
  slug: string;
  analytics: any;
}

export default function BlogPerformanceDashboard({ slug, analytics }: Props) {
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      const res = await fetch('/api/blog/sync', {
        method: 'POST',
        body: JSON.stringify({ slug }),
      });
      const data = await res.json();
      if (data.success) {
        alert('Successfully logged to Google Sheet!');
      } else {
        alert('Sync failed: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      alert('Sync error: ' + err);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div id="performance-dashboard" style={{ marginTop: "80px", padding: "32px", background: "rgba(0,0,0,0.03)", borderRadius: "24px", border: "1px solid var(--border)", display: "none" }}>
      <h3 style={{ fontSize: "18px", marginBottom: "20px", color: "var(--accent)" }}>Post Performance (Internal)</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "20px" }}>
        <div>
          <div style={{ fontSize: "12px", color: "var(--text-muted)", textTransform: "uppercase" }}>Views</div>
          <div style={{ fontSize: "20px", fontWeight: 700 }}>{analytics.pageViews || 0}</div>
        </div>
        <div>
          <div style={{ fontSize: "12px", color: "var(--text-muted)", textTransform: "uppercase" }}>Visitors</div>
          <div style={{ fontSize: "20px", fontWeight: 700 }}>{analytics.uniqueVisitors || 0}</div>
        </div>
        <div>
          <div style={{ fontSize: "12px", color: "var(--text-muted)", textTransform: "uppercase" }}>CTA Clicks</div>
          <div style={{ fontSize: "20px", fontWeight: 700 }}>{analytics.ctaClicks || 0}</div>
        </div>
        <div>
          <div style={{ fontSize: "12px", color: "var(--text-muted)", textTransform: "uppercase" }}>Conv. Rate</div>
          <div style={{ fontSize: "20px", fontWeight: 700 }}>{analytics.conversionRate || 0}%</div>
        </div>
      </div>
      <div style={{ marginTop: "24px", borderTop: "1px solid rgba(0,0,0,0.1)", paddingTop: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: "12px", color: "var(--text-muted)", textTransform: "uppercase" }}>Next Action</div>
          <div style={{ fontSize: "16px", fontWeight: 600 }}>{analytics.nextAction || "None"}</div>
        </div>
        <button 
          onClick={handleSync}
          disabled={isSyncing}
          style={{ 
            background: "var(--accent)", 
            color: "#fff", 
            border: "none", 
            padding: "8px 16px", 
            borderRadius: "8px", 
            cursor: isSyncing ? "not-allowed" : "pointer", 
            fontWeight: 600, 
            fontSize: "14px",
            opacity: isSyncing ? 0.7 : 1
          }}
        >
          {isSyncing ? 'Syncing...' : 'Log to Google Sheet'}
        </button>
      </div>
      <script dangerouslySetInnerHTML={{ __html: `
        (function() {
          const params = new URLSearchParams(window.location.search);
          const statsParam = params.get('stats');
          const secret = "${process.env.STATS_SECRET || 'true'}";
          
          if (statsParam === secret) {
            document.getElementById('performance-dashboard').style.display = 'block';
          }
        })();
      `}} />
    </div>
  );
}

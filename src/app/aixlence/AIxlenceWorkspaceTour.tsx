"use client";

import Image from "next/image";
import styles from "./aixlence.module.css";

const WORKSPACE_VIEWS = [
  {
    id: "assessment",
    navLabel: "Assessment",
    image: "/aixlence/screenshots/assessment.png",
    url: "openvalidations.com/assessment",
  },
  {
    id: "pillar-summary",
    navLabel: "Pillar Summary",
    image: "/aixlence/screenshots/pillar-summary.png",
    url: "openvalidations.com/aixlence/pillar-summary",
  },
  {
    id: "roadmap",
    navLabel: "Roadmap",
    image: "/aixlence/screenshots/roadmap.png",
    url: "openvalidations.com/aixlence/roadmap",
  },
  {
    id: "investment-simulator",
    navLabel: "Investment Simulator",
    image: "/aixlence/screenshots/investment-simulator.png",
    url: "openvalidations.com/aixlence/investment-simulator",
  },
  {
    id: "service-mapping",
    navLabel: "Service Mapping",
    image: "/aixlence/screenshots/service-mapping.png",
    url: "openvalidations.com/aixlence/service-mapping",
  },
] as const;

export type AIxlenceWorkspaceViewId = (typeof WORKSPACE_VIEWS)[number]["id"];

type Props = {
  activeId: AIxlenceWorkspaceViewId;
  onSelect: (id: AIxlenceWorkspaceViewId) => void;
};

export default function AIxlenceWorkspaceTour({ activeId, onSelect }: Props) {
  const active = WORKSPACE_VIEWS.find((v) => v.id === activeId) ?? WORKSPACE_VIEWS[0];

  return (
    <div className={styles.workspaceTour} data-variant="hero">
      <div className={styles.workspaceHeroTabs} role="tablist" aria-label="Product preview">
        {WORKSPACE_VIEWS.map((view) => {
          const selected = view.id === activeId;
          return (
            <button
              key={view.id}
              type="button"
              role="tab"
              aria-selected={selected}
              className={styles.workspaceHeroTab}
              data-active={selected ? "" : undefined}
              onClick={() => onSelect(view.id)}
            >
              {view.navLabel}
            </button>
          );
        })}
      </div>

      <div className={styles.workspaceBrowser}>
        <div className={styles.workspaceBrowserChrome}>
          <div className={styles.workspaceBrowserDots} aria-hidden>
            <span className={styles.workspaceDotRed} />
            <span className={styles.workspaceDotYellow} />
            <span className={styles.workspaceDotGreen} />
          </div>
          <div className={styles.workspaceBrowserUrl}>{active.url}</div>
        </div>
        <div className={styles.workspaceBrowserViewport}>
          <div key={active.id} className={styles.workspaceBrowserImageWrap}>
            <Image
              src={active.image}
              alt={`AIxLence ${active.navLabel} workspace`}
              fill
              className={styles.workspaceBrowserImage}
              sizes="(min-width: 1024px) 44vw, 100vw"
              priority={activeId === "assessment"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

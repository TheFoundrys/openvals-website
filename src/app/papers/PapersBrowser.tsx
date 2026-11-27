"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import type { Paper } from "./papersData";
import { formatLongDay, periodKey, periodLabel, periodTitle, type Period } from "./papersDates";
import styles from "./papers.module.css";

const TABS: { value: Period; label: string }[] = [
  { value: "day", label: "Daily" },
  { value: "week", label: "Weekly" },
  { value: "month", label: "Monthly" },
];

const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

type Props = {
  papers: Paper[];
  period: Period;
  currentKey: string | null;
  olderHref: string | null;
  newerHref: string | null;
  tabHrefs: Record<Period, string>;
};

export default function PapersBrowser({ papers, period, currentKey, olderHref, newerHref, tabHrefs }: Props) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const visible = useMemo(() => {
    if (q) {
      // Search covers every paper, not just the current period
      return papers.filter((p) =>
        [p.title, p.abstract ?? "", p.authors.join(" "), p.tags.join(" "), p.source]
          .join(" ")
          .toLowerCase()
          .includes(q),
      );
    }
    if (!currentKey) return [];
    return papers.filter((p) => periodKey(p.day, period) === currentKey);
  }, [papers, q, currentKey, period]);

  return (
    <>
      {/* ── HEADER ROW: title · search · tabs + date ── */}
      <div className={styles.headerRow}>
        <div className={styles.titleBlock}>
          <h1 className={styles.pageTitle}>Daily Papers</h1>
          <p className={styles.byline}>
            by
            <span className={styles.bylineMark} aria-hidden="true">
              OV
            </span>
            <span className={styles.bylineName}>OpenVals</span> and the research team
          </p>
        </div>

        <div className={styles.searchCell}>
          <label className={styles.searchBox}>
            <Search size={16} className={styles.searchIcon} aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search any paper"
              maxLength={250}
              className={styles.searchInput}
              aria-label="Search papers by title, author, abstract or tag"
            />
            {query && (
              <button type="button" className={styles.searchClear} onClick={() => setQuery("")} aria-label="Clear search">
                <X size={14} aria-hidden="true" />
              </button>
            )}
          </label>
        </div>

        <div className={styles.navCell}>
          <ul className={styles.tabs} aria-label="Group papers by">
            {TABS.map((tab) => (
              <li key={tab.value}>
                <Link
                  href={tabHrefs[tab.value]}
                  className={`${styles.tab} ${period === tab.value ? styles.tabActive : ""}`}
                  aria-current={period === tab.value ? "page" : undefined}
                >
                  {tab.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className={styles.dateNav}>
            {olderHref ? (
              <Link href={olderHref} className={styles.dateNavBtn} aria-label="Previous">
                <ChevronLeft size={14} strokeWidth={2.5} aria-hidden="true" />
              </Link>
            ) : (
              <span className={`${styles.dateNavBtn} ${styles.dateNavBtnOff}`} aria-hidden="true">
                <ChevronLeft size={14} strokeWidth={2.5} />
              </span>
            )}
            <div className={styles.dateLabel} title={currentKey ? periodTitle(currentKey, period) : undefined}>
              {currentKey ? periodLabel(currentKey, period) : "—"}
            </div>
            {newerHref ? (
              <Link href={newerHref} className={styles.dateNavBtn} aria-label="Next">
                <ChevronRight size={14} strokeWidth={2.5} aria-hidden="true" />
              </Link>
            ) : (
              <span className={`${styles.dateNavBtn} ${styles.dateNavBtnOff}`} aria-hidden="true">
                <ChevronRight size={14} strokeWidth={2.5} />
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── CARD GRID: 1 / 2 / 3 columns ── */}
      {visible.length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.emptyText}>
            {q
              ? `No papers match “${query.trim()}”.`
              : currentKey
                ? `No papers for ${periodTitle(currentKey, period)}.`
                : "No papers yet."}
          </p>
          {(q || olderHref) && (
            <div className={styles.emptyActions}>
              {q && (
                <button type="button" className={styles.emptyBtn} onClick={() => setQuery("")}>
                  Clear search
                </button>
              )}
              {!q && olderHref && (
                <Link href={olderHref} className={styles.emptyBtn}>
                  Previous papers
                </Link>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className={styles.grid}>
          {visible.map((paper) => (
            <PaperCard key={paper.id} paper={paper} />
          ))}
        </div>
      )}
    </>
  );
}

function PaperCard({ paper }: { paper: Paper }) {
  const linkProps = paper.external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  const [, month, day] = paper.day.split("-").map(Number);
  const author = paper.authors[0];

  return (
    <article className={styles.card}>
      <Link href={paper.href} className={styles.thumb} tabIndex={-1} aria-hidden="true" {...linkProps}>
        {paper.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={paper.imageUrl} alt="" loading="lazy" decoding="async" className={styles.thumbImg} />
        ) : (
          <span className={styles.thumbFallback}>{paper.title}</span>
        )}
      </Link>

      {author && (
        <div className={styles.byPill}>
          by
          <span className={styles.byPillAvatar} aria-hidden="true">
            {initials(author)}
          </span>
          {paper.authors.length > 1 ? `${author} +${paper.authors.length - 1}` : author}
        </div>
      )}

      <div className={styles.cardBody}>
        <div className={styles.cardInner}>
          {/* Date tile sits where Hugging Face shows its upvote box */}
          <time dateTime={paper.publishedAt} className={styles.dateTile} title={formatLongDay(paper.day)}>
            <span className={styles.dateTileMonth}>{MONTHS_SHORT[month - 1]}</span>
            <span className={styles.dateTileDay}>{day}</span>
          </time>

          <div className={styles.cardText}>
            <h3 className={styles.cardTitle}>
              <Link href={paper.href} className={styles.cardTitleLink} {...linkProps}>
                {paper.title}
              </Link>
            </h3>
            <div className={styles.cardMeta}>
              <span className={styles.sourceChip}>
                <span className={styles.sourceChipMark} aria-hidden="true">
                  {paper.source === "LinkedIn" ? "in" : paper.source === "OpenVals Blog" ? "OV" : paper.source.slice(0, 1)}
                </span>
                <span className={styles.sourceChipText}>{paper.source}</span>
              </span>
              {paper.tags.length > 0 && (
                <div className={styles.cardTags}>
                  {paper.tags.map((tag) => (
                    <span key={tag} className={styles.cardTag}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

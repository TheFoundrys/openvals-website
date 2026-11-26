import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import styles from "./MethodologyView.module.css";
import { DATA_SUMMARY, LIFECYCLE_STAGES, METRIC_STATS, type MetricStats } from "@/lib/methodologyStats";
import { REPORTS_FEED, REPORTS_FEED_META, type ReportFeedEntry } from "./reportsFeedData";

/** Evaluations from the most recent evaluation date — regenerated on every tracker sync */
const LATEST_REPORTS = REPORTS_FEED.filter((e) => e.date === REPORTS_FEED_META.latestDate);

const SECTIONS = [
  { id: "latest", label: "Latest reports" },
  { id: "pipeline", label: "How an evaluation works" },
  { id: "metrics", label: "What we measure" },
  { id: "drs", label: "DRS Trust Score" },
  { id: "ranking", label: "Ranking rules" },
  { id: "lifecycle", label: "Lifecycle stages" },
  { id: "freshness", label: "Data and updates" },
  { id: "limits", label: "What is not measured yet" },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const formatDate = (iso: string | null) => {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
};

function formatValue(metric: MetricStats, value: number) {
  if (metric.unit === "ms") return value < 1000 ? `${Math.round(value)} ms` : `${(value / 1000).toFixed(1)} s`;
  return value.toFixed(2);
}

const PIPELINE = [
  {
    title: "Run the model",
    body: "Each evaluation run gives the model the OpenVals task set and records every response along with its latency.",
  },
  {
    title: "Score the run",
    body: "Responses are scored for accuracy, semantic match, factuality, hallucination risk, safety and reliability.",
  },
  {
    title: "Combine into DRS",
    body: "The signals are combined into one Decision Reliability Score (DRS) for the run, from 0 to 1.",
  },
  {
    title: "Rank the model",
    body: `A model's runs are averaged. With ${DATA_SUMMARY.minRuns} or more runs it gets a leaderboard rank.`,
  },
];

const RANKING_RULES = [
  {
    title: `${DATA_SUMMARY.minRuns}+ runs to be ranked`,
    body: `A single run can be lucky or unlucky. Models with fewer than ${DATA_SUMMARY.minRuns} runs are listed as preliminary in the model registry and are not ranked.`,
  },
  {
    title: "Ranked by mean DRS",
    body: "The leaderboard score is the average DRS across all of a model's runs, shown on a 0–100 scale.",
  },
  {
    title: "95% confidence interval",
    body: "The ± next to a score is the 95% confidence interval of that average (Student's t), so you can see how much the runs varied.",
  },
  {
    title: "Ties share a rank",
    body: "Models with the same score at one decimal share a rank, shown as “=”. Within a tie, the faster model is listed first.",
  },
  {
    title: "Versioned snapshots",
    body: "Each data date is a leaderboard version (for example v2026.11.23). Rank changes (▲ ▼) compare a model with the previous version.",
  },
];

const NOT_MEASURED = [
  {
    title: "Domain scores",
    body: "Results are not yet broken down by domain (finance, healthcare, legal, cybersecurity, math, reasoning, developer or enterprise operations). The leaderboard is one overall ranking.",
  },
  {
    title: "Cost",
    body: "Price per task is not measured, so the leaderboard does not compare cost.",
  },
];

function ReportStatus({ entry }: { entry: ReportFeedEntry }) {
  if (entry.becameRanked) return <span className={`${styles.tag} ${styles.tagRanked}`}>Newly ranked</span>;
  if (entry.isNewModel) return <span className={`${styles.tag} ${styles.tagNew}`}>New model</span>;
  return <span className={`${styles.tag} ${styles.tagRerun}`}>Re-evaluated</span>;
}

function ReportDrs({ entry }: { entry: ReportFeedEntry }) {
  if (entry.drsBefore === null) return <span className={styles.drsAfter}>{entry.drsAfter.toFixed(1)}</span>;
  const delta = Math.round((entry.drsAfter - entry.drsBefore) * 10) / 10;
  return (
    <span className={styles.drsChange}>
      <span className={styles.drsBefore}>{entry.drsBefore.toFixed(1)}</span>
      <span aria-label="to"> → </span>
      <span className={styles.drsAfter}>{entry.drsAfter.toFixed(1)}</span>
      <span className={delta > 0 ? styles.deltaUp : styles.deltaFlat}>
        {" "}
        {delta > 0 ? "+" : delta < 0 ? "−" : "±"}
        {Math.abs(delta).toFixed(1)}
      </span>
    </span>
  );
}

function CorrelationBar({ value }: { value: number }) {
  const width = `${Math.min(100, Math.abs(value) * 100)}%`;
  return (
    <span className={styles.corr}>
      <span className={styles.corrTrack} aria-hidden="true">
        <span className={value >= 0 ? styles.corrFillPos : styles.corrFillNeg} style={{ width }} />
      </span>
      <span className={styles.corrValue}>
        {value > 0 ? "+" : value < 0 ? "−" : ""}
        {Math.abs(value).toFixed(2)}
      </span>
    </span>
  );
}

export default function MethodologyView() {
  const signals = METRIC_STATS.filter((m) => m.key !== "drs" && m.drsCorrelation !== null).sort(
    (a, b) => Math.abs(b.drsCorrelation!) - Math.abs(a.drsCorrelation!)
  );
  const safety = METRIC_STATS.find((m) => m.key === "safety");

  return (
    <div className={styles.page}>
      {/* HERO */}
      <header className={styles.hero}>
        <p className={styles.kicker}>Methodology</p>
        <h1 className={styles.title}>How OpenVals evaluates and ranks AI models</h1>
        <p className={styles.lead}>
          Every score on OpenVals comes from our own evaluation runs. This page explains what each run
          measures, what the Decision Reliability Score (DRS) is, and the rules behind the leaderboard.
        </p>
        <dl className={styles.heroStats}>
          <div>
            <dt>Evaluation runs</dt>
            <dd>{DATA_SUMMARY.runs.toLocaleString("en-US")}</dd>
          </div>
          <div>
            <dt>Models evaluated</dt>
            <dd>{DATA_SUMMARY.models}</dd>
          </div>
          <div>
            <dt>Ranked models</dt>
            <dd>{DATA_SUMMARY.ranked}</dd>
          </div>
          <div>
            <dt>Latest run</dt>
            <dd>{formatDate(DATA_SUMMARY.lastDate)}</dd>
          </div>
        </dl>
      </header>

      <div className={styles.layout}>
        {/* ON THIS PAGE */}
        <nav className={styles.toc} aria-label="On this page">
          <p className={styles.tocTitle}>On this page</p>
          <ol>
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>{s.label}</a>
              </li>
            ))}
          </ol>
        </nav>

        <div className={styles.content}>
          {/* 0. LATEST REPORTS — the most recent evaluation date */}
          <section id="latest" className={styles.section}>
            <div className={styles.latestHeader}>
              <h2>Latest reports</h2>
              <span className={styles.latestDate}>
                <time dateTime={REPORTS_FEED_META.latestDate ?? undefined}>
                  {formatDate(REPORTS_FEED_META.latestDate)}
                </time>
              </span>
            </div>
            <p>
              Models evaluated on the most recent evaluation date. This list updates automatically with every
              tracker sync. DRS is the model&apos;s mean across all its runs, before → after that day.
            </p>
            {LATEST_REPORTS.length === 0 ? (
              <p className={styles.note}>No evaluations recorded yet.</p>
            ) : (
              <div className={styles.tableWrap}>
                <table className={`${styles.table} ${styles.reportsTable}`}>
                  <thead>
                    <tr>
                      <th scope="col">Model</th>
                      <th scope="col">Lab</th>
                      <th scope="col" className={styles.num}>
                        Runs
                      </th>
                      <th scope="col" className={styles.num}>
                        DRS
                      </th>
                      <th scope="col" className={styles.num}>
                        Rank now
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {LATEST_REPORTS.map((entry) => (
                      <tr key={entry.key}>
                        <th scope="row">
                          <span className={styles.reportModel}>
                            <Link
                              href={`/models?model=${encodeURIComponent(entry.modelId)}`}
                              className={styles.reportLink}
                            >
                              {entry.name}
                            </Link>
                            {entry.params && <span className={styles.params}>{entry.params}</span>}
                            <ReportStatus entry={entry} />
                          </span>
                        </th>
                        <td className={styles.reportLab}>{entry.lab}</td>
                        <td className={styles.num} data-label="Runs">
                          {entry.isNewModel ? entry.runsAdded : `+${entry.runsAdded}`}
                          <span className={styles.muted}> · {entry.runsAfter} total</span>
                        </td>
                        <td className={styles.num} data-label="DRS">
                          <ReportDrs entry={entry} />
                        </td>
                        <td className={styles.num} data-label="Rank now">
                          {entry.rankNow !== null ? (
                            <span className={styles.rankNow}>#{entry.rankNow}</span>
                          ) : (
                            <span className={styles.muted}>
                              Prelim. {entry.runsNow}/{REPORTS_FEED_META.minRuns}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <p className={styles.note}>
              {LATEST_REPORTS.reduce((a, e) => a + e.runsAdded, 0)} runs across {LATEST_REPORTS.length}{" "}
              {LATEST_REPORTS.length === 1 ? "model" : "models"} on this date ·{" "}
              <Link href="/#latest-reports" className={styles.textLink}>
                All reports
              </Link>
            </p>
          </section>

          {/* 1. PIPELINE */}
          <section id="pipeline" className={styles.section}>
            <h2>How an evaluation works</h2>
            <ol className={styles.pipeline}>
              {PIPELINE.map((step, i) => (
                <li key={step.title} className={styles.step}>
                  <span className={styles.stepNumber}>{i + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* 2. METRICS */}
          <section id="metrics" className={styles.section}>
            <h2>What we measure</h2>
            <p>
              Each run is scored on the signals below. Scores run from 0 to 1. The median and observed range
              show the spread across all {DATA_SUMMARY.runs.toLocaleString("en-US")} runs so far.
            </p>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th scope="col">Signal</th>
                    <th scope="col">Better</th>
                    <th scope="col" className={styles.measuresCol}>
                      What it measures
                    </th>
                    <th scope="col" className={styles.num}>
                      Median
                    </th>
                    <th scope="col" className={styles.num}>
                      Observed range
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {METRIC_STATS.map((m) => (
                    <tr key={m.key} className={m.key === "drs" ? styles.drsRow : undefined}>
                      <th scope="row">{m.name}</th>
                      <td>
                        <span className={m.better === "Higher" ? styles.betterHigh : styles.betterLow}>
                          {m.better === "Higher" ? "↑ Higher" : "↓ Lower"}
                        </span>
                      </td>
                      <td className={styles.measuresCol}>{m.measures}</td>
                      <td className={styles.num} data-label="Median">
                        {formatValue(m, m.median)}
                      </td>
                      <td className={styles.num} data-label="Range">
                        {formatValue(m, m.min)} – {formatValue(m, m.max)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 3. DRS */}
          <section id="drs" className={styles.section}>
            <h2>DRS Trust Score</h2>
            <p>
              Accuracy tells you which model scored highest. DRS asks a different question: can this model be
              trusted to make decisions in production? It is a weighted combination of the run&apos;s signals:
            </p>
            <div
              className={styles.formula}
              role="math"
              aria-label="DRS equals the sum over signals of weight times signal score"
            >
              DRS = Σ <i>w</i>
              <sub>i</sub> × <i>m</i>
              <sub>i</sub>
            </div>
            <p className={styles.note}>
              <i>m</i>
              <sub>i</sub> is a signal score and <i>w</i>
              <sub>i</sub> is its weight.
            </p>

            <h3 className={styles.subheading}>How DRS tracks each signal</h3>
            <p>
              Correlation with DRS across all runs. +1 means the two always rise together, −1 means one rises
              as the other falls, and 0 means no relationship.
            </p>
            <ul className={styles.corrList}>
              {signals.map((m) => (
                <li key={m.key}>
                  <span className={styles.corrName}>{m.name}</span>
                  <CorrelationBar value={m.drsCorrelation!} />
                </li>
              ))}
            </ul>
            {safety && (
              <p className={styles.note}>
                Safety barely moves with DRS because the median run already scores {safety.median.toFixed(2)} on
                it, so it rarely separates one model from another.
              </p>
            )}
            <Link href="/openvals-docs/drs" className={styles.textLink}>
              DRS in the OpenVals docs <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </section>

          {/* 4. RANKING */}
          <section id="ranking" className={styles.section}>
            <h2>Ranking rules</h2>
            <p>
              The same rules feed every ranking on the site: the home page leaderboard, the OpenVals Index and
              the model registry.
            </p>
            <div className={styles.ruleGrid}>
              {RANKING_RULES.map((rule) => (
                <div key={rule.title} className={styles.rule}>
                  <h3>{rule.title}</h3>
                  <p>{rule.body}</p>
                </div>
              ))}
            </div>
            <p className={styles.note}>
              Today: {DATA_SUMMARY.ranked} ranked models and {DATA_SUMMARY.preliminary} preliminary, leaderboard
              version {DATA_SUMMARY.version}.
            </p>
          </section>

          {/* 5. LIFECYCLE */}
          <section id="lifecycle" className={styles.section}>
            <h2>Lifecycle stages</h2>
            <p>
              The model registry places every model in a lifecycle stage based on its mean DRS, so teams can see
              at a glance which models are ready for production review.
            </p>
            <div className={styles.stageGrid}>
              {LIFECYCLE_STAGES.map((stage, i) => (
                <div key={stage.name} className={`${styles.stage} ${styles[`stage${i}`]}`}>
                  <span className={styles.stageRule}>{stage.rule}</span>
                  <h3>{stage.name}</h3>
                  <p>
                    {stage.models} {stage.models === 1 ? "model" : "models"} today
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 6. FRESHNESS */}
          <section id="freshness" className={styles.section}>
            <h2>Data and updates</h2>
            <ul className={styles.factList}>
              <li>
                Results come from the OpenVals evaluation tracker, which is synced to this site twice a day
                (09:00 and 19:00 IST) and on demand when it changes.
              </li>
              <li>
                Each sync rebuilds the model registry, the leaderboard and the OpenVals Index from the same data,
                so they always agree.
              </li>
              <li>Runs with missing or invalid metric values are left out rather than estimated.</li>
              <li>
                Current data covers {DATA_SUMMARY.runs.toLocaleString("en-US")} runs of {DATA_SUMMARY.models}{" "}
                models from {DATA_SUMMARY.labs} labs, evaluated between {formatDate(DATA_SUMMARY.firstDate)} and{" "}
                {formatDate(DATA_SUMMARY.lastDate)}.
              </li>
            </ul>
          </section>

          {/* 7. LIMITS */}
          <section id="limits" className={styles.section}>
            <h2>What is not measured yet</h2>
            <div className={styles.ruleGrid}>
              {NOT_MEASURED.map((item) => (
                <div key={item.title} className={styles.rule}>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* NEXT */}
          <nav className={styles.nextLinks} aria-label="Explore the results">
            <Link href="/openvals-index" className={styles.nextCard}>
              <span>
                <strong>OpenVals Index</strong>
                <span>The full leaderboard and frontier chart</span>
              </span>
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link href="/models" className={styles.nextCard}>
              <span>
                <strong>Model registry</strong>
                <span>All {DATA_SUMMARY.models} evaluated models, including preliminary ones</span>
              </span>
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}

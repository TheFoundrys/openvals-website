"use client";

import { useState } from "react";
import styles from "./ui.module.css";

type DocsLine =
  | { muted: string }
  | { prompt: string; code: string }
  | { code: string }
  | { space: true };

const docsTabs: { label: string; lines: DocsLine[] }[] = [
  {
    label: "Install",
    lines: [
      { muted: "# Install via pip" },
      { prompt: "$", code: "pip install openvals" },
      { space: true },
      { muted: "# Or install from source" },
      { prompt: "$", code: "git clone https://github.com/vishwanathakuthota/openvals" },
      { prompt: "$", code: "cd openvals && pip install -e ." },
    ],
  },
  {
    label: "Evaluate",
    lines: [
      { muted: "# Single model evaluation" },
      { code: "from openvals.core.evaluator import Evaluator" },
      { code: "from openvals.datasets.loader import load_dataset" },
      { code: "from openvals.models.ollama_model import OllamaModel" },
      { space: true },
      { code: 'dataset = load_dataset("examples/sample_eval.json")' },
      { code: 'model = OllamaModel("llama3")' },
      { code: "evaluator = Evaluator(model, dataset)" },
      { code: "result = evaluator.run()" },
      { space: true },
      { code: 'print(result["overall_score"]) # -> 0.87' },
    ],
  },
  {
    label: "Benchmark",
    lines: [
      { muted: "# Multi-model benchmarking" },
      { code: "from openvals.benchmarking.runner import BenchmarkRunner" },
      { code: "from openvals.models.ollama_model import OllamaModel" },
      { space: true },
      { code: "models = {" },
      { code: '  "llama2": OllamaModel("llama2"),' },
      { code: '  "llama3": OllamaModel("llama3"),' },
      { code: '  "mistral": OllamaModel("mistral")' },
      { code: "}" },
      { code: "runner = BenchmarkRunner(models, dataset)" },
      { code: "results = runner.run()" },
      { space: true },
      { muted: "# -> 1. mistral (0.91) 2. llama3 (0.87) 3. llama2 (0.84)" },
    ],
  },
];

export default function DocsQuickstart() {
  const [activeTab, setActiveTab] = useState(docsTabs[0]);

  return (
    <div className={styles.docsQuickstart}>
      <div className={styles.docsTabs} aria-label="Quick start steps">
        {docsTabs.map((tab) => {
          const isActive = activeTab.label === tab.label;

          return (
            <button
              className={`${styles.docsTab} ${isActive ? styles.docsTabActive : ""}`}
              key={tab.label}
              onClick={() => setActiveTab(tab)}
              type="button"
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div className={styles.docsCodePanels}>
        <section className={styles.docsCodePanel} style={{ display: "block" }}>
          <pre>
            <code>
              {activeTab.lines.map((line, lineIndex) => {
                if ("space" in line) {
                  return <br key={lineIndex} />;
                }

                if ("muted" in line) {
                  return (
                    <span className={styles.docsCodeMuted} key={lineIndex}>
                      {line.muted}
                      {"\n"}
                    </span>
                  );
                }

                if ("prompt" in line) {
                  return (
                    <span className={styles.docsCodeLine} key={lineIndex}>
                      <span>{line.prompt}</span> {line.code}
                      {"\n"}
                    </span>
                  );
                }

                return (
                  <span key={lineIndex}>
                    {line.code}
                    {"\n"}
                  </span>
                );
              })}
            </code>
          </pre>
        </section>
      </div>
    </div>
  );
}

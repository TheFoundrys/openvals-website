const fs = require('fs');
const content = fs.readFileSync('src/components/modelBenchmarkData.ts', 'utf8');
const jsonMatch = content.match(/export const AGGREGATED_MODELS: AggregatedModel\[\] = (\[[\s\S]*?\]);\n\nexport const ALL_BENCHMARK_RUNS/);
const models = JSON.parse(jsonMatch[1]);

// Group by lab and find the best model by accuracyNum
const labMap = {};
const LAB_COLORS = {
  "Agentica": { color: "#df8b7c", textColor: "#ffffff" },
  "Tencent": { color: "#3a3a3a", textColor: "#ffffff" },
  "IBM": { color: "#0f62fe", textColor: "#ffffff" },
  "Prism ML": { color: "#10b981", textColor: "#ffffff" },
  "Liquid AI": { color: "#0284c7", textColor: "#ffffff" },
  "QVAC": { color: "#7c3aed", textColor: "#ffffff" },
  "Hugging Face": { color: "#f59e0b", textColor: "#1e293b" },
  "Google": { color: "#46b17c", textColor: "#ffffff" },
  "Meta": { color: "#528ef0", textColor: "#ffffff" },
  "Microsoft": { color: "#00a4ef", textColor: "#ffffff" },
  "Open Source": { color: "#64748b", textColor: "#ffffff" },
  "Alibaba": { color: "#f3832b", textColor: "#ffffff" },
  "TII": { color: "#0ea5e9", textColor: "#ffffff" },
  "01.AI": { color: "#498ff0", textColor: "#ffffff" },
  "Deepseek": { color: "#1e40af", textColor: "#ffffff" },
  "Mistral AI": { color: "#d8b335", textColor: "#1e293b" },
  "Stability AI": { color: "#a855f7", textColor: "#ffffff" },
  "Nous Research": { color: "#546d88", textColor: "#ffffff" },
  "Doey LLM": { color: "#e7a44f", textColor: "#1e293b" },
  "Big Science": { color: "#708092", textColor: "#ffffff" },
  "Supra": { color: "#8ec84c", textColor: "#1e293b" },
  "PROMTECH Inc": { color: "#eab308", textColor: "#1e293b" },
  "North ML": { color: "#5b6670", textColor: "#ffffff", hasPattern: true },
};

models.forEach(m => {
  let normLab = m.lab;
  if (normLab === 'Open-Source' || normLab === 'Open Source') normLab = 'Open Source';
  if (normLab === 'BigScience' || normLab === 'Big Science') normLab = 'Big Science';
  
  if (!labMap[normLab] || labMap[normLab].accuracyNum < m.accuracyNum) {
    labMap[normLab] = m;
  }
});

const bestModels = Object.keys(labMap)
  .map(k => labMap[k])
  .filter(m => m.accuracyNum > 0.05) // exclude 0%
  .sort((a, b) => b.accuracyNum - a.accuracyNum);

console.log('Total best per lab:', bestModels.length);
bestModels.forEach((m, i) => {
  console.log(`${i+1}. ${m.name} (${m.params}) [${m.lab}] -> ${m.accuracy}`);
});

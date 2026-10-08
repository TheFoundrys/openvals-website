const fs = require('fs');
const content = fs.readFileSync('src/components/modelBenchmarkData.ts', 'utf8');
const jsonMatch = content.match(/export const AGGREGATED_MODELS: AggregatedModel\[\] = (\[[\s\S]*?\]);\n\nexport const ALL_BENCHMARK_RUNS/);
if (!jsonMatch) {
  console.log('No match');
  process.exit(1);
}
const models = JSON.parse(jsonMatch[1]);
console.log('Aggregated models count:', models.length);

const byAcc = [...models].sort((a,b) => b.accuracyNum - a.accuracyNum);
console.log('\nTop 20 by Accuracy:');
byAcc.slice(0, 20).forEach((m, i) => {
  console.log(`${i+1}. ${m.name} (${m.params}) [${m.lab}] - Acc: ${m.accuracy}, Latency: ${m.latency}, DRS: ${m.drs}`);
});

console.log('\nBest model per lab (sorted by accuracy):');
const labMap = {};
byAcc.forEach(m => {
  let normLab = m.lab;
  if (normLab === 'Open-Source' || normLab === 'Open Source') normLab = 'Open Source';
  if (normLab === 'BigScience' || normLab === 'Big Science') normLab = 'Big Science';
  if (!labMap[normLab] || labMap[normLab].accuracyNum < m.accuracyNum) {
    labMap[normLab] = m;
  }
});

const bestPerLab = Object.keys(labMap).map(k => labMap[k]).sort((a, b) => b.accuracyNum - a.accuracyNum);
bestPerLab.forEach((m, i) => {
  console.log(`${i+1}. ${m.name.toUpperCase()} ${m.params.toUpperCase()} - Lab: ${m.lab}, Acc: ${m.accuracy} (${(m.accuracyNum * 100).toFixed(2)}%), DRS: ${m.drs}, Lat: ${m.latency}`);
});
console.log('Total best per lab:', bestPerLab.length);

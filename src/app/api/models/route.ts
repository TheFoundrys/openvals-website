import { NextRequest, NextResponse } from "next/server";
import { AGGREGATED_MODELS } from "@/components/modelBenchmarkData";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search")?.toLowerCase();

  let filtered = AGGREGATED_MODELS;
  if (search) {
    filtered = filtered.filter(
      (m) =>
        m.name.toLowerCase().includes(search) ||
        m.lab.toLowerCase().includes(search) ||
        m.params.toLowerCase().includes(search)
    );
  }

  const items = filtered.map((m) => {
    const drsNum = m.drsNum || 0;
    return {
      id: m.id,
      name: m.name,
      version: m.params,
      provider: m.lab,
      architecture: m.params ? m.params.toUpperCase() : "LLM",
      primaryUseCase: `Accuracy ${m.accuracy} • Latency ${m.latency} • Factuality ${m.factuality}`,
      tags: [m.params, m.size, m.lab, `${m.accuracy} Acc`, `DRS ${m.drs}`].filter(Boolean),
      decisionStatus: drsNum >= 0.75 ? "Approved" : drsNum >= 0.55 ? "Pending Review" : "Needs Review",
      overallFitScore: Math.round(drsNum * 100),
      lastAssessedAt: "2026-10-27T10:00:00Z",
      lifecycle: drsNum >= 0.75 ? "Production" : drsNum >= 0.55 ? "Active" : "Evaluation",
      params: m.params,
      size: m.size,
      accuracy: m.accuracy,
      semantic: m.semantic,
      latency: m.latency,
      factuality: m.factuality,
      hallucination: m.hallucination,
      safety: m.safety,
      reliability: m.reliability,
      drs: m.drs,
      drsNum: m.drsNum,
      rank: m.rank,
      runsCount: m.runsCount,
    };
  });

  return NextResponse.json({
    data: {
      items,
      total: items.length,
    },
  });
}

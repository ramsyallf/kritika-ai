import { StatisticalDataset } from "@/types";
import { SAMPLE_DATASETS } from "@/mock-data/datasets";

export interface AnalysisConfigInput {
  datasetId: string;
  dependentVar: string;
  predictors: string[];
  analysisType: "ols_regression" | "descriptive_stats" | "hypothesis_testing" | "model_diagnostics";
  confidenceLevel: "95%" | "99%";
  robustErrors: boolean;
}

export interface AnalysisExecutionResult {
  isSampleDemonstrationData: true;
  engineNotice: string;
  executedAt: string;
  config: AnalysisConfigInput;
  dataset: StatisticalDataset;
}

/**
 * Clean Statistical Engine Service Abstraction.
 * Ready to connect to a Python FastAPI / statsmodels / scipy backend in Phase 2.
 * All returned outputs in Phase 1 are explicitly labeled as seeded sample demonstration data.
 */
export async function runStatisticalAnalysis(
  config: AnalysisConfigInput
): Promise<AnalysisExecutionResult> {
  await new Promise((resolve) => setTimeout(resolve, 600));

  const dataset =
    SAMPLE_DATASETS.find((d) => d.id === config.datasetId) ||
    SAMPLE_DATASETS[0];

  return {
    isSampleDemonstrationData: true,
    engineNotice:
      "SAMPLE DEMONSTRATION DATA — Seeded statistical outputs for pedagogical review (Python statsmodels engine integration pending Phase 2).",
    executedAt: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
    config,
    dataset,
  };
}

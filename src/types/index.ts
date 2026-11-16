export type UserRole = "student" | "lecturer";

export type StageStatus = "Completed" | "In Progress" | "Available" | "Locked";

export type TransformativePhase =
  | "Trigger"
  | "Reflection"
  | "Action"
  | "Integration";

export type SocraticMoveType =
  | "Clarifying Question"
  | "Challenging Assumptions"
  | "Requesting Evidence"
  | "Counterargument"
  | "Reflective Questioning";

export interface LearningStage {
  stageNumber: number;
  kritikaCode: string; // K-R, I, T, I, K, A
  title: string;
  subtitle: string;
  transformativePhase: TransformativePhase;
  sessionCode: "P1" | "P2" | "P3";
  description: string;
  pedagogicalGoal: string;
  status: StageStatus;
  progress: number;
  route: string;
  actionLabel: string;
  aiRoleSummary: string;
  completedAt?: string;
  score?: number;
}

export interface CourseInfo {
  id: string;
  code: string;
  name: string;
  topic: string;
  subtopic: string;
  semester: string;
  program: string;
  department: string;
  institution: string;
  leadLecturer: string;
  teachingTeam: string[];
  textbookReference: string;
  cpmkCode: string;
  cpmkDescription: string;
  completedStages: number;
  totalStages: number;
  overallProgress: number;
  criticalThinkingIndex: number;
}

export interface FacioneScores {
  interpretation: number;
  analysis: number;
  evaluation: number;
  inference: number;
  explanation: number;
  selfRegulation: number;
}

export interface ActivityLog {
  id: string;
  title: string;
  description: string;
  stageNumber: number;
  timestamp: string;
  type: "response" | "dialogue" | "reflection" | "workspace" | "assessment";
  status: "Completed" | "In Progress";
}

export interface MentorMessage {
  id: string;
  sender: "mentor" | "student";
  content: string;
  timestamp: string;
  socraticMove?: SocraticMoveType;
  targetDimension?: keyof FacioneScores;
  highlightedConcept?: string;
}

export interface DatasetVariable {
  key: string;
  label: string;
  unit: string;
  role: "Response (Y)" | "Predictor (X)" | "Identifier";
  type: "Continuous" | "Discrete" | "Categorical";
  mean?: number;
  sd?: number;
  min?: number;
  max?: number;
  vif?: number;
}

export interface RegressionCoefficient {
  variable: string;
  label: string;
  coefficient: number;
  stdError: number;
  tStatistic: number;
  pValue: number;
  ciLower: number;
  ciUpper: number;
  vif?: number;
}

export interface DiagnosticMetric {
  name: string;
  testUsed: string;
  statistic: string;
  pValue: number;
  assumptionStatus: "Satisfied" | "Violated" | "Borderline";
  interpretationHint: string;
}

export interface StatisticalDataset {
  id: string;
  name: string;
  code: string;
  domain: string;
  sampleSize: number;
  description: string;
  dilemmaNote: string;
  variables: DatasetVariable[];
  rows: Record<string, string | number>[];
  regressionOutput: {
    dependentVar: string;
    rSquared: number;
    adjustedRSquared: number;
    fStatistic: number;
    fPValue: number;
    standardErrorEstimate: number;
    durbinWatson: number;
    observations: number;
    coefficients: RegressionCoefficient[];
    diagnostics: DiagnosticMetric[];
    scatterData: {
      id: string;
      x: number;
      y: number;
      predicted: number;
      residual: number;
      region: string;
    }[];
  };
}

export interface StudentRecord {
  id: string;
  nim: string;
  name: string;
  email: string;
  classCode: string;
  currentStage: number;
  currentStageTitle: string;
  learningProgress: number;
  assessmentScore: number;
  criticalThinkingScore: number;
  preTestScore: number;
  postTestScore: number;
  nGain: number;
  lastActivity: string;
  status: "Excelling" | "On Track" | "Needs Attention" | "At Risk";
  facione: FacioneScores;
  dialogueTurns: number;
  aiFallacyDetected: boolean;
  tabSwitchesInAssessment: number;
  initialResponseSummary: string;
  intermediateReflectionSummary: string;
  finalReflectionSummary: string;
}

export interface ClassCohort {
  id: string;
  code: string;
  name: string;
  courseName: string;
  semester: string;
  schedule: string;
  room: string;
  studentCount: number;
  activeTopic: string;
  averageProgress: number;
  averageCriticalThinking: number;
  stageCompletionRate: number;
  status: "Active" | "Scheduled" | "Archived";
}

export interface LearningTopic {
  id: string;
  code: string;
  cpmk: string;
  title: string;
  course: string;
  sessions: number;
  objectives: string[];
  targetMisconceptions: string[];
  activeCasesCount: number;
  completionRate: number;
  status: "Active" | "Draft" | "Completed";
}

export interface LearningCase {
  id: string;
  code: string;
  title: string;
  topicId: string;
  topicTitle: string;
  cpmk: string;
  complexity: "Foundational" | "Intermediate" | "Advanced Dilemma";
  stageTarget: "Stage 1 Trigger" | "Stage 4 Implementation" | "Stage 5 Independent Assessment";
  domain: string;
  scenarioText: string;
  embeddedAiFallacy: string;
  guidingPrompt: string;
  datasetMetadata: {
    rows: number;
    variables: string[];
    rSquared: number;
    keyViolation: string;
  };
  validationStatus: "Validated" | "Pending Review" | "Needs Revision";
  author: string;
  createdAt: string;
}

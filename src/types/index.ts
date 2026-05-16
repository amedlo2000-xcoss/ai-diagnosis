export type AnswerValue = 0 | 1 | 2 | 3;

export interface Question {
  id: number;
  text: string;
  options: string[];
}

export interface DiagnosisAnswers {
  [questionId: number]: AnswerValue;
}

export interface AxisScore {
  name: string;
  score: number;
}

export interface DiagnosisResult {
  answers: DiagnosisAnswers;
  axisScores: AxisScore[];
  totalScore: number;
  rank: string;
  rankLabel: string;
  diagnosisType: string;
  bottleneck: string;
  improvements: string[];
  nextActions: string[];
  aiComment: string;
}

export interface AIScore {
  name: string;
  label: string;
  score: number;
  comment: string;
  color: string;
}

export interface GeneratedCopy {
  hp: string;
  google: string;
  sns: string;
}

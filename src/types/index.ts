export type UserType = "freelance" | "sole_proprietor" | "side_hustle" | "solopreneur";

export const USER_TYPE_LABELS: Record<UserType, string> = {
  freelance: "フリーランス",
  sole_proprietor: "個人事業主",
  side_hustle: "副業者",
  solopreneur: "ソロプレナー",
};

export type AxisKey =
  | "action_volume"
  | "contact_frequency"
  | "relationship"
  | "response_rate"
  | "result_connection";

export type AxisScores = Record<AxisKey, number>;

export interface Option {
  label: string;
  score: number;
}

export interface Question {
  id: number;
  text: string;
  axis: AxisKey;
  options: Option[];
}

export interface Answer {
  questionIndex: number;
  optionIndex: number;
  score: number;
  axis: AxisKey;
}

export interface DiagnosisResult {
  type: string;
  bottleneck: string;
  color: string;
  bg: string;
  improvements: string[];
  actions: string[];
}

export interface AIScore {
  name: string;
  color: string;
  scores: AxisScores;
}
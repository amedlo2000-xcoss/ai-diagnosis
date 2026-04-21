import { AIScore } from "../types";

// ダミーデータ（将来的にAPIと差し替える箇所）
export const AI_SCORES: AIScore[] = [
  {
    name: "ChatGPT",
    color: "#10a37f",
    scores: {
      action_volume: 72,
      contact_frequency: 68,
      relationship: 75,
      response_rate: 70,
      result_connection: 65,
    },
  },
  {
    name: "Gemini",
    color: "#4285f4",
    scores: {
      action_volume: 65,
      contact_frequency: 62,
      relationship: 68,
      response_rate: 60,
      result_connection: 58,
    },
  },
  {
    name: "Claude",
    color: "#534AB7",
    scores: {
      action_volume: 78,
      contact_frequency: 74,
      relationship: 82,
      response_rate: 76,
      result_connection: 72,
    },
  },
];

// AI別の平均スコアを計算する
export function calcAIAverage(ai: AIScore): number {
  const values = Object.values(ai.scores);
  return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
}
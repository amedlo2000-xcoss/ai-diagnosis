import { Answer, AxisKey, AxisScores } from "../types";

// 軸のキー一覧
export const AXIS_KEYS: AxisKey[] = [
  "action_volume",
  "contact_frequency",
  "relationship",
  "response_rate",
  "result_connection",
];

// 軸の日本語ラベル
export const AXIS_LABELS: Record<AxisKey, string> = {
  action_volume: "行動量",
  contact_frequency: "接触頻度",
  relationship: "関係構築",
  response_rate: "反応率",
  result_connection: "結果接続力",
};

// 回答から軸別スコアを計算する
export function calcAxisScores(answers: Answer[]): AxisScores {
  const groups: Record<string, number[]> = {
    action_volume: [],
    contact_frequency: [],
    relationship: [],
    response_rate: [],
    result_connection: [],
  };

  // 軸ごとにスコアをまとめる
  answers.forEach((a) => {
    groups[a.axis].push(a.score);
  });

  // 各軸の平均を計算
  const result = {} as AxisScores;
  AXIS_KEYS.forEach((key) => {
    const arr = groups[key];
    result[key] = arr.length
      ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length)
      : 0;
  });

  return result;
}

// 総合スコアを計算する
export function calcTotalScore(axisScores: AxisScores): number {
  const values = Object.values(axisScores);
  return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
}
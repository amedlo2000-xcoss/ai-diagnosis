import type { AIScore, AxisScores } from "../types";

export const AI_SCORES: AIScore[] = [
  {
    name: "Gemini",
    color: "#4285f4",
    scores: {
      action_volume: 0,
      contact_frequency: 0,
      relationship: 0,
      response_rate: 0,
      result_connection: 0,
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

export function calcAIAverage(ai: AIScore): number {
  const values = Object.values(ai.scores);
  return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
}

export async function fetchGeminiScore(axisScores: AxisScores): Promise<AxisScores> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) return axisScores;

  const prompt = `あなたはビジネス行動診断の専門家です。以下のユーザーの行動スコアを分析して、各軸を0〜100で評価してください。JSONのみ返してください。ユーザースコア：行動量${axisScores.action_volume}、接触頻度${axisScores.contact_frequency}、関係構築${axisScores.relationship}、反応率${axisScores.response_rate}、結果接続力${axisScores.result_connection}。形式：{"action_volume":数値,"contact_frequency":数値,"relationship":数値,"response_rate":数値,"result_connection":数値}`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );
    const data = await res.json();
    const text = data.candidates[0].content.parts[0].text;
    const json = text.match(/\{.*\}/s)?.[0];
    return JSON.parse(json || "{}");
  } catch {
    return axisScores;
  }
}
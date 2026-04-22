import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { AxisScores, AIScore } from "../types";
import { AXIS_KEYS, AXIS_LABELS } from "../data/scoring";

interface Props {
  axisScores: AxisScores;
  aiScores: AIScore[];
}

export default function RadarChartCard({ axisScores, aiScores }: Props) {
  if (!aiScores || aiScores.length === 0) return null;

  const data = AXIS_KEYS.map((key) => {
    const point: Record<string, string | number> = {
      axis: AXIS_LABELS[key],
      あなた: axisScores[key],
    };
    aiScores.forEach((ai) => {
      if (ai && ai.scores) {
        point[ai.name] = ai.scores[key] ?? 0;
      }
    });
    return point;
  });

  const colors = ["#4285f4", "#534AB7", "#10a37f"];

  return (
    <div style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "12px", padding: "1.25rem", marginBottom: "1rem" }}>
      <p style={{ fontSize: "12px", fontWeight: 500, color: "var(--color-text-secondary)", marginBottom: "8px" }}>レーダーチャート</p>
      <ResponsiveContainer width="100%" height={280}>
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="axis" tick={{ fontSize: 12 }} />
          <Radar name="あなた" dataKey="あなた" stroke="#534AB7" fill="#534AB7" fillOpacity={0.3} />
          {aiScores.map((ai, i) => (
            ai && ai.scores ? (
              <Radar key={ai.name} name={ai.name} dataKey={ai.name} stroke={colors[i] || ai.color} fill={colors[i] || ai.color} fillOpacity={0.1} />
            ) : null
          ))}
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
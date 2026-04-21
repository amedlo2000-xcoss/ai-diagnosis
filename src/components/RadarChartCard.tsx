import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { AxisScores, AIScore } from "../types";
import { AXIS_KEYS, AXIS_LABELS } from "../data/scoring";

interface Props {
  axisScores: AxisScores;
  aiScores: AIScore[];
}

export default function RadarChartCard({ axisScores, aiScores }: Props) {
  // レーダーチャート用データを作成
  const data = AXIS_KEYS.map((key) => ({
    axis: AXIS_LABELS[key],
    あなた: axisScores[key],
    ChatGPT: aiScores[0].scores[key],
    Claude: aiScores[2].scores[key],
  }));

  return (
    <div
      style={{
        background: "var(--color-background-primary)",
        border: "0.5px solid var(--color-border-tertiary)",
        borderRadius: "12px",
        padding: "1.25rem",
        marginBottom: "1rem",
      }}
    >
      <p
        style={{
          fontSize: "12px",
          fontWeight: 500,
          color: "var(--color-text-secondary)",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          marginBottom: "12px",
        }}
      >
        レーダーチャート
      </p>

      <ResponsiveContainer width="100%" height={280}>
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="axis" tick={{ fontSize: 12 }} />
          <Radar
            name="あなた"
            dataKey="あなた"
            stroke="#534AB7"
            fill="#534AB7"
            fillOpacity={0.3}
          />
          <Radar
            name="ChatGPT"
            dataKey="ChatGPT"
            stroke="#10a37f"
            fill="#10a37f"
            fillOpacity={0.1}
          />
          <Radar
            name="Claude"
            dataKey="Claude"
            stroke="#AFA9EC"
            fill="#AFA9EC"
            fillOpacity={0.1}
          />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
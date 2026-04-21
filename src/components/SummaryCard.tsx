import { DiagnosisResult } from "../types";

interface Props {
  totalScore: number;
  diagnosis: DiagnosisResult;
}

export default function SummaryCard({ totalScore, diagnosis }: Props) {
  return (
    <div
      style={{
        background: "var(--color-background-primary)",
        border: `0.5px solid var(--color-border-tertiary)`,
        borderLeft: `3px solid ${diagnosis.color}`,
        borderRadius: "12px",
        padding: "1.25rem",
        marginBottom: "1rem",
      }}
    >
      {/* タイプと総合スコア */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "12px",
              fontWeight: 500,
              color: "var(--color-text-secondary)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: "4px",
            }}
          >
            診断タイプ
          </p>
          <p
            style={{
              fontSize: "20px",
              fontWeight: 500,
              color: diagnosis.color,
            }}
          >
            {diagnosis.type}
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          <p
            style={{
              fontSize: "12px",
              fontWeight: 500,
              color: "var(--color-text-secondary)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: "4px",
            }}
          >
            総合スコア
          </p>
          <p
            style={{
              fontSize: "28px",
              fontWeight: 500,
              color: "var(--color-text-primary)",
            }}
          >
            {totalScore}
            <span
              style={{ fontSize: "16px", color: "var(--color-text-secondary)" }}
            >
              {" "}
              / 100
            </span>
          </p>
        </div>
      </div>

      {/* 区切り線 */}
      <div
        style={{
          height: "0.5px",
          background: "var(--color-border-tertiary)",
          margin: "1.25rem 0",
        }}
      />

      {/* ボトルネック */}
      <div
        style={{
          background: diagnosis.bg,
          borderRadius: "8px",
          padding: "10px 14px",
          fontSize: "14px",
          color: "var(--color-text-secondary)",
          lineHeight: 1.7,
        }}
      >
        ⚠ {diagnosis.bottleneck}
      </div>
    </div>
  );
}
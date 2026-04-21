import type { Answer, AxisScores, DiagnosisResult } from "../types";
import { calcAxisScores, calcTotalScore, AXIS_LABELS, AXIS_KEYS } from "../data/scoring";
import { diagnoseType } from "../data/diagnosis";
import { AI_SCORES, calcAIAverage } from "../data/aiScores";
import SummaryCard from "../components/SummaryCard";
import ScoreCard from "../components/ScoreCard";
import RecommendationCard from "../components/RecommendationCard";
import ResultHeader from "../components/ResultHeader";

interface Props {
  answers: Answer[];
  onRetry: () => void;        // もう一度診断する
  onReport: (                 // レポートページへ
    axisScores: AxisScores,
    total: number,
    diagnosis: DiagnosisResult
  ) => void;
}

export default function ResultPage({ answers, onRetry, onReport }: Props) {
  const axisScores = calcAxisScores(answers);
  const total = calcTotalScore(axisScores);
  const diagnosis = diagnoseType(axisScores, total);

  return (
    <div style={{ padding: "1.5rem 0" }}>
      <ResultHeader
        title="診断結果"
        subtitle="あなたの行動傾向と改善ポイントです"
      />

      {/* 総合スコア・タイプ・ボトルネック */}
      <SummaryCard totalScore={total} diagnosis={diagnosis} />

      {/* 軸別スコア */}
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
          軸別スコア
        </p>
        {AXIS_KEYS.map((key) => (
          <ScoreCard
            key={key}
            label={AXIS_LABELS[key]}
            score={axisScores[key]}
          />
        ))}
      </div>

      {/* AI比較スコア */}
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
          AI比較スコア（ダミーデータ）
        </p>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {AI_SCORES.map((ai) => {
            const avg = calcAIAverage(ai);
            return (
              <div
                key={ai.name}
                style={{
                  background: "var(--color-background-primary)",
                  border: "0.5px solid var(--color-border-tertiary)",
                  borderRadius: "12px",
                  padding: "1rem 1.25rem",
                  flex: 1,
                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "var(--color-text-primary)",
                    marginBottom: "2px",
                  }}
                >
                  {ai.name}
                </div>
                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: 500,
                    color: ai.color,
                    marginBottom: "6px",
                  }}
                >
                  {avg}%
                </div>
                <div
                  style={{
                    height: "10px",
                    background: "var(--color-background-secondary)",
                    borderRadius: "4px",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${avg}%`,
                      background: ai.color,
                      borderRadius: "4px",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 改善提案・次のアクション */}
      <div
        style={{
          background: "var(--color-background-primary)",
          border: "0.5px solid var(--color-border-tertiary)",
          borderRadius: "12px",
          padding: "1.25rem",
          marginBottom: "1rem",
        }}
      >
        <RecommendationCard
          title="改善提案"
          items={diagnosis.improvements}
        />
        <div
          style={{
            height: "0.5px",
            background: "var(--color-border-tertiary)",
            margin: "1.25rem 0",
          }}
        />
        <RecommendationCard
          title="次のアクション"
          items={diagnosis.actions}
          accentColor={diagnosis.color}
          accentBg={diagnosis.bg}
        />
      </div>

      {/* ボタン */}
      <div style={{ display: "flex", gap: "10px", marginTop: "0.5rem" }}>
        <button
          onClick={onRetry}
          style={{
            flex: 1,
            padding: "10px 24px",
            border: "0.5px solid var(--color-border-secondary)",
            borderRadius: "8px",
            background: "var(--color-background-primary)",
            color: "var(--color-text-primary)",
            fontSize: "14px",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          もう一度診断する
        </button>
        <button
          onClick={() => onReport(axisScores, total, diagnosis)}
          style={{
            flex: 1,
            padding: "10px 24px",
            background: "#534AB7",
            color: "#EEEDFE",
            border: "none",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          詳細レポートを見る
        </button>
      </div>
    </div>
  );
}
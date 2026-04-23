import { useState, useEffect } from "react";
import { type Answer, type AxisScores, type DiagnosisResult, type UserType, USER_TYPE_LABELS } from "../types";
import { calcAxisScores, calcTotalScore, AXIS_LABELS, AXIS_KEYS } from "../data/scoring";
import { diagnoseType } from "../data/diagnosis";
import { AI_SCORES, calcAIAverage, fetchGeminiScore, calcClaudeScore } from "../data/aiScores";
import SummaryCard from "../components/SummaryCard";
import ScoreCard from "../components/ScoreCard";
import RecommendationCard from "../components/RecommendationCard";
import ResultHeader from "../components/ResultHeader";

interface Props {
  answers: Answer[];
  userType: UserType;
  onRetry: () => void;
  onReport: (axisScores: AxisScores, total: number, diagnosis: DiagnosisResult, aiScores: typeof AI_SCORES) => void;
}

export default function ResultPage({ answers, userType, onRetry, onReport }: Props) {
  const axisScores = calcAxisScores(answers);
  const total = calcTotalScore(axisScores);
  const diagnosis = diagnoseType(axisScores, total, userType);
  const [aiScores, setAiScores] = useState(AI_SCORES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const claudeScores = calcClaudeScore(axisScores);
    fetchGeminiScore(axisScores).then((geminiScores) => {
      setAiScores((prev) =>
        prev.map((ai) => {
          if (ai.name === "Gemini") return { ...ai, scores: geminiScores };
          if (ai.name === "Claude") return { ...ai, scores: claudeScores };
          return ai;
        })
      );
      setLoading(false);
    }).catch(() => {
      setAiScores((prev) =>
        prev.map((ai) => ai.name === "Claude" ? { ...ai, scores: claudeScores } : ai)
      );
      setLoading(false);
    });
  }, []);

  return (
    <div style={{ padding: "1.5rem 0" }}>
      <ResultHeader title="診断結果" subtitle={`${USER_TYPE_LABELS[userType]}の行動傾向と改善ポイントです`} />
      <SummaryCard totalScore={total} diagnosis={diagnosis} />
      <div style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "12px", padding: "1.25rem", marginBottom: "1rem" }}>
        <p style={{ fontSize: "12px", fontWeight: 500, color: "var(--color-text-secondary)", marginBottom: "12px" }}>軸別スコア</p>
        {AXIS_KEYS.map((key) => (
          <ScoreCard key={key} label={AXIS_LABELS[key]} score={axisScores[key]} />
        ))}
      </div>
      <div style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "12px", padding: "1.25rem", marginBottom: "1rem" }}>
        <p style={{ fontSize: "12px", fontWeight: 500, color: "var(--color-text-secondary)", marginBottom: "12px" }}>
          AI比較スコア {loading && <span style={{ color: "#4285f4" }}>（Gemini分析中...）</span>}
        </p>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {aiScores.map((ai) => {
            const avg = calcAIAverage(ai);
            return (
              <div key={ai.name} style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "12px", padding: "1rem 1.25rem", flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: "13px", fontWeight: 500, color: "var(--color-text-primary)", marginBottom: "2px" }}>{ai.name}</div>
                <div style={{ fontSize: "20px", fontWeight: 500, color: ai.color, marginBottom: "6px" }}>
                  {ai.name === "Gemini" && loading ? "分析中..." : `${avg}%`}
                </div>
                <div style={{ height: "10px", background: "var(--color-background-secondary)", borderRadius: "4px" }}>
                  <div style={{ height: "100%", width: `${avg}%`, background: ai.color, borderRadius: "4px" }} />
                </div>
                <div style={{ fontSize: "11px", color: "var(--color-text-secondary)", marginTop: "6px" }}>
                  {ai.name === "Gemini" ? "※Gemini API" : "※Claude分析"}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "12px", padding: "1.25rem", marginBottom: "1rem" }}>
        <RecommendationCard title="改善提案" items={diagnosis.improvements} />
        <div style={{ height: "0.5px", background: "var(--color-border-tertiary)", margin: "1.25rem 0" }} />
        <RecommendationCard title="次のアクション" items={diagnosis.actions} accentColor={diagnosis.color} accentBg={diagnosis.bg} />
      </div>
      <div style={{ display: "flex", gap: "10px", marginTop: "0.5rem" }}>
        <button onClick={onRetry} style={{ flex: 1, padding: "10px 24px", border: "0.5px solid var(--color-border-secondary)", borderRadius: "8px", background: "var(--color-background-primary)", color: "var(--color-text-primary)", fontSize: "14px", fontWeight: 500, cursor: "pointer" }}>
          もう一度診断する
        </button>
        <button onClick={() => onReport(axisScores, total, diagnosis, aiScores)} style={{ flex: 1, padding: "10px 24px", background: "#534AB7", color: "#EEEDFE", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: 500, cursor: "pointer" }}>
          詳細レポートを見る
        </button>
      </div>
    </div>
  );
}
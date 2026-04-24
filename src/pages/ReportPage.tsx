import { type AxisScores, type DiagnosisResult, type AIScore, type UserType, USER_TYPE_LABELS } from "../types";
import { AXIS_KEYS, AXIS_LABELS } from "../data/scoring";
import { calcAIAverage } from "../data/aiScores";
import { generateReportData } from "../data/reportData";
import RadarChartCard from "../components/RadarChartCard";
import RecommendationCard from "../components/RecommendationCard";
import ResultHeader from "../components/ResultHeader";

interface Props {
  axisScores: AxisScores;
  totalScore: number;
  diagnosis: DiagnosisResult;
  aiScores: AIScore[];
  userType: UserType;
  onBack: () => void;
  onRetry: () => void;
  onRegister: () => void;
}

export default function ReportPage({ axisScores, totalScore, diagnosis, aiScores, userType, onBack, onRetry, onRegister }: Props) {
  const report = generateReportData(totalScore, axisScores, diagnosis, aiScores);

  if (!aiScores || aiScores.length === 0) {
    return (
      <div style={{ padding: "1.5rem 0" }}>
        <p style={{ color: "var(--color-text-secondary)" }}>読み込み中...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "1.5rem 0" }}>
      <ResultHeader title="詳細レポート" subtitle={`${USER_TYPE_LABELS[userType]} · AI複数視点による分析レポートです`} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "12px", marginBottom: "1rem" }}>
        <div style={{ background: "var(--color-background-secondary)", borderRadius: "8px", padding: "1rem", textAlign: "center" }}>
          <div style={{ fontSize: "13px", color: "var(--color-text-secondary)", marginBottom: "4px" }}>総合スコア</div>
          <div style={{ fontSize: "28px", fontWeight: 500, color: "var(--color-text-primary)" }}>{totalScore}<span style={{ fontSize: "14px", color: "var(--color-text-secondary)" }}>pt</span></div>
        </div>
        <div style={{ background: "var(--color-background-secondary)", borderRadius: "8px", padding: "1rem", textAlign: "center" }}>
          <div style={{ fontSize: "13px", color: "var(--color-text-secondary)", marginBottom: "4px" }}>診断タイプ</div>
          <div style={{ fontSize: "16px", fontWeight: 500, color: diagnosis.color, marginTop: "4px" }}>{diagnosis.type}</div>
        </div>
      </div>
      <div style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "12px", padding: "1.25rem", marginBottom: "1rem" }}>
        <p style={{ fontSize: "12px", fontWeight: 500, color: "var(--color-text-secondary)", marginBottom: "12px" }}>AI別スコア比較</p>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {aiScores.map((ai) => {
            const avg = calcAIAverage(ai);
            return (
              <div key={ai.name} style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "12px", padding: "1rem 1.25rem", flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: "14px", fontWeight: 500, marginBottom: "4px" }}>{ai.name}</div>
                <div style={{ fontSize: "22px", fontWeight: 500, color: ai.color, marginBottom: "6px" }}>{avg}%</div>
                <div style={{ height: "8px", background: "var(--color-background-secondary)", borderRadius: "4px" }}>
                  <div style={{ height: "100%", width: `${avg}%`, background: ai.color, borderRadius: "4px" }} />
                </div>
                <div style={{ fontSize: "11px", color: "var(--color-text-secondary)", marginTop: "6px" }}>
                  {ai.name === "Gemini" ? "※Gemini API" : "※Claudeスコア"}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "12px", padding: "1.25rem", marginBottom: "1rem", overflowX: "auto" }}>
        <p style={{ fontSize: "12px", fontWeight: 500, color: "var(--color-text-secondary)", marginBottom: "12px" }}>評価項目別比較</p>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
          <thead>
            <tr style={{ borderBottom: "0.5px solid var(--color-border-tertiary)" }}>
              <th style={{ textAlign: "left", padding: "8px 0", fontWeight: 500, color: "var(--color-text-secondary)" }}>軸</th>
              <th style={{ padding: "8px", textAlign: "center", color: "#534AB7", fontWeight: 500 }}>あなたの<br />回答スコア</th>
              {aiScores.map((ai) => (
                <th key={ai.name} style={{ padding: "8px", textAlign: "center", fontWeight: 500, color: ai.color }}>{ai.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {AXIS_KEYS.map((key) => (
              <tr key={key} style={{ borderBottom: "0.5px solid var(--color-border-tertiary)" }}>
                <td style={{ padding: "8px 0", color: "var(--color-text-secondary)" }}>{AXIS_LABELS[key]}</td>
                <td style={{ padding: "8px", textAlign: "center", fontWeight: 500, color: "#534AB7" }}>{Math.round(axisScores[key] * 0.8)}%</td>
                {aiScores.map((ai) => (
                  <td key={ai.name} style={{ padding: "8px", textAlign: "center" }}>{ai.scores[key]}%</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <RadarChartCard axisScores={axisScores} aiScores={aiScores} />
      <div style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "12px", padding: "1.25rem", marginBottom: "1rem" }}>
        <p style={{ fontSize: "12px", fontWeight: 500, color: "var(--color-text-secondary)", marginBottom: "8px" }}>共通見解</p>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "var(--color-text-secondary)", marginBottom: "1.25rem" }}>{report.commonInsight}</p>
        <div style={{ height: "0.5px", background: "var(--color-border-tertiary)", margin: "1.25rem 0" }} />
        <RecommendationCard title="改善提案" items={diagnosis.improvements} />
        <div style={{ height: "0.5px", background: "var(--color-border-tertiary)", margin: "1.25rem 0" }} />
        <RecommendationCard title="おすすめ次のアクション" items={diagnosis.actions} accentColor={diagnosis.color} accentBg={diagnosis.bg} />
      </div>
      <button onClick={onBack} style={{ width: "100%", padding: "10px 24px", border: "0.5px solid var(--color-border-secondary)", borderRadius: "8px", background: "var(--color-background-primary)", color: "var(--color-text-primary)", fontSize: "14px", fontWeight: 500, cursor: "pointer", marginTop: "0.5rem" }}>
        ← 診断結果に戻る
      </button>
      <button
        onClick={onRetry}
        style={{ width: "100%", padding: "12px 24px", border: "0.5px solid var(--color-border-secondary)", borderRadius: "8px", background: "var(--color-background-primary)", color: "var(--color-text-primary)", fontSize: "14px", fontWeight: 500, cursor: "pointer", marginTop: "10px" }}
      >
        もう一度診断する
      </button>
      <button
        onClick={onRegister}
        style={{ width: "100%", padding: "13px 24px", background: "#534AB7", color: "#EEEDFE", border: "none", borderRadius: "8px", fontSize: "15px", fontWeight: 600, cursor: "pointer", marginTop: "10px" }}
      >
        さらに診断精度をUPしたい
      </button>
    </div>
  );
}
import { useState } from "react";
import { Answer, AxisScores, DiagnosisResult } from "./types";
import TopPage from "./pages/TopPage";
import DiagnosisPage from "./pages/DiagnosisPage";
import ResultPage from "./pages/ResultPage";
import ReportPage from "./pages/ReportPage";

// ページの種類
type Page = "top" | "diagnosis" | "result" | "report";

export default function App() {
  const [page, setPage] = useState<Page>("top");
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [axisScores, setAxisScores] = useState<AxisScores | null>(null);
  const [totalScore, setTotalScore] = useState<number>(0);
  const [diagnosis, setDiagnosis] = useState<DiagnosisResult | null>(null);

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "0 1rem",
        fontFamily: "var(--font-sans)",
      }}
    >
      {/* トップページ */}
      {page === "top" && (
        <TopPage onStart={() => setPage("diagnosis")} />
      )}

      {/* 診断ページ */}
      {page === "diagnosis" && (
        <DiagnosisPage
          onComplete={(ans) => {
            setAnswers(ans);
            setPage("result");
          }}
        />
      )}

      {/* 診断結果ページ */}
      {page === "result" && (
        <ResultPage
          answers={answers}
          onRetry={() => {
            setAnswers([]);
            setPage("diagnosis");
          }}
          onReport={(scores, total, diag) => {
            setAxisScores(scores);
            setTotalScore(total);
            setDiagnosis(diag);
            setPage("report");
          }}
        />
      )}

      {/* レポートページ */}
      {page === "report" && axisScores && diagnosis && (
        <ReportPage
          axisScores={axisScores}
          totalScore={totalScore}
          diagnosis={diagnosis}
          onBack={() => setPage("result")}
        />
      )}
    </div>
  );
}
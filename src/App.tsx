import { useState } from "react";
import type { Answer, AxisScores, DiagnosisResult, UserType } from "./types";
import { AI_SCORES } from "./data/aiScores";
import TopPage from "./pages/TopPage";
import DiagnosisPage from "./pages/DiagnosisPage";
import ResultPage from "./pages/ResultPage";
import ReportPage from "./pages/ReportPage";

type Page = "top" | "diagnosis" | "result" | "report";

export default function App() {
  const [page, setPage] = useState<Page>("top");
  const [userType, setUserType] = useState<UserType>("freelance");
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [axisScores, setAxisScores] = useState<AxisScores | null>(null);
  const [totalScore, setTotalScore] = useState<number>(0);
  const [diagnosis, setDiagnosis] = useState<DiagnosisResult | null>(null);
  const [aiScores, setAiScores] = useState(AI_SCORES);

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "0 1rem", fontFamily: "var(--font-sans)" }}>
      {page === "top" && (
        <TopPage
          onStart={(type) => {
            setUserType(type);
            setAnswers([]);
            setPage("diagnosis");
          }}
        />
      )}
      {page === "diagnosis" && (
        <DiagnosisPage
          userType={userType}
          onComplete={(ans) => {
            setAnswers(ans);
            setPage("result");
          }}
        />
      )}
      {page === "result" && (
        <ResultPage
          answers={answers}
          userType={userType}
          onRetry={() => {
            setAnswers([]);
            setPage("diagnosis");
          }}
          onReport={(scores, total, diag, ai) => {
            setAxisScores(scores);
            setTotalScore(total);
            setDiagnosis(diag);
            setAiScores(ai);
            setPage("report");
          }}
        />
      )}
      {page === "report" && axisScores && diagnosis && (
        <ReportPage
          axisScores={axisScores}
          totalScore={totalScore}
          diagnosis={diagnosis}
          aiScores={aiScores}
          userType={userType}
          onBack={() => setPage("result")}
        />
      )}
    </div>
  );
}

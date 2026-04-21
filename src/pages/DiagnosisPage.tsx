import { useState } from "react";
import { Answer } from "../types";
import { questions } from "../data/questions";
import ProgressBar from "../components/ProgressBar";
import QuestionCard from "../components/QuestionCard";

interface Props {
  onComplete: (answers: Answer[]) => void; // 全問回答完了時の処理
}

export default function DiagnosisPage({ onComplete }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);

  // 選択肢を選んだ時の処理
  const handleSelect = (optionIndex: number) => {
    const question = questions[currentIndex];
    const newAnswer: Answer = {
      questionIndex: currentIndex,
      optionIndex,
      score: question.options[optionIndex].score,
      axis: question.axis,
    };

    const newAnswers = [...answers, newAnswer];
    setAnswers(newAnswers);

    // 少し待ってから次の質問へ
    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(currentIndex + 1);
      } else {
        onComplete(newAnswers);
      }
    }, 300);
  };

  return (
    <div style={{ padding: "1.5rem 0" }}>
      <ProgressBar
        current={currentIndex + 1}
        total={questions.length}
      />
      <QuestionCard
        question={questions[currentIndex]}
        onSelect={handleSelect}
      />
    </div>
  );
}
import { useState } from "react";
import type { Answer, UserType } from "../types";
import { questionsByType } from "../data/questions";
import ProgressBar from "../components/ProgressBar";
import QuestionCard from "../components/QuestionCard";

interface Props {
  userType: UserType;
  onComplete: (answers: Answer[]) => void;
}

export default function DiagnosisPage({ userType, onComplete }: Props) {
  const questions = questionsByType[userType];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);

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
      <ProgressBar current={currentIndex + 1} total={questions.length} />
      <QuestionCard question={questions[currentIndex]} onSelect={handleSelect} />
    </div>
  );
}

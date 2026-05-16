import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { questions } from '../data/questions';
import { DiagnosisAnswers } from '../types';
import { calculateAxisScores, calculateTotalScore } from '../utils/scoring';
import { getRank, getDiagnosisType, getBottleneck, getImprovements, getNextActions, getAIComment } from '../utils/diagnosis';
import { calculateAIScores } from '../data/aiScores';
import { generateCopy } from '../utils/copyGenerator';

export default function DiagnosisPage() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<DiagnosisAnswers>({});

  const question = questions[current];
  const progress = Math.round(((current) / questions.length) * 100);

  function handleAnswer(optionIndex: number) {
    const newAnswers = { ...answers, [question.id]: optionIndex as 0|1|2|3 };
    setAnswers(newAnswers);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      const axisScores = calculateAxisScores(newAnswers);
      const totalScore = calculateTotalScore(axisScores);
      const { rank, rankLabel } = getRank(totalScore);
      const diagnosisType = getDiagnosisType(newAnswers, axisScores);
      const bottleneck = getBottleneck(axisScores);
      const improvements = getImprovements(axisScores);
      const nextActions = getNextActions(newAnswers);
      const aiComment = getAIComment(totalScore, diagnosisType);
      const aiScores = calculateAIScores(newAnswers);
      const generatedCopy = generateCopy(newAnswers, axisScores);
      navigate('/result', {
        state: {
          answers: newAnswers,
          axisScores,
          totalScore,
          rank,
          rankLabel,
          diagnosisType,
          bottleneck,
          improvements,
          nextActions,
          aiComment,
          aiScores,
          generatedCopy,
        },
      });
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="max-w-xl w-full py-10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-slate-400">質問 {current + 1} / {questions.length}</span>
          <span className="text-sm font-medium" style={{color:'#b45309'}}>{progress}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2 mb-8">
          <div
            className="h-2 rounded-full transition-all"
            style={{width:`${progress}%`, background:'linear-gradient(90deg,#1e3a5f,#b45309)'}}
          />
        </div>
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-8 mb-6">
          <p className="text-lg font-bold text-slate-800 mb-6 leading-relaxed">{question.text}</p>
          <div className="flex flex-col gap-3">
            {question.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className="w-full text-left px-5 py-4 rounded-xl border border-slate-200 text-slate-700 font-medium text-sm hover:border-amber-400 hover:bg-amber-50 transition-all"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

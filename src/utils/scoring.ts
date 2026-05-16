import { DiagnosisAnswers, AxisScore } from '../types';

export function calculateAxisScores(answers: DiagnosisAnswers): AxisScore[] {
  const get = (id: number): number => {
    const val = answers[id] ?? 3;
    return Math.round((1 - val / 3) * 100);
  };

  return [
    {
      name: '行く理由の明確性',
      score: Math.round((get(2) + get(3)) / 2),
    },
    {
      name: 'AI理解度',
      score: Math.round((get(3) + get(4) + get(5)) / 3),
    },
    {
      name: '媒体一貫性',
      score: Math.round((get(3) + get(4) + get(5)) / 3),
    },
    {
      name: '差別化',
      score: Math.round((get(9) + get(8)) / 2),
    },
    {
      name: '来店目的の強さ',
      score: Math.round((get(6) + get(7)) / 2),
    },
  ];
}

export function calculateTotalScore(axisScores: AxisScore[]): number {
  const sum = axisScores.reduce((acc, a) => acc + a.score, 0);
  return Math.round(sum / axisScores.length);
}

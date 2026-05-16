import { AxisScore } from '../types';

export interface ReportSection {
  title: string;
  items: string[];
}

export function generateReportSections(axisScores: AxisScore[], _totalScore: number): ReportSection[] {
  const weak = axisScores.filter(a => a.score < 50).map(a => a.name);

  return [
    {
      title: '共通見解',
      items: [
        'AI検索では「行く理由」が明確な店舗ほど推薦されやすくなっています。',
        '複数媒体（HP・Google・SNS）で一貫したメッセージを発信することが重要です。',
        '客層と利用シーンの明確化がAI理解度を大きく向上させます。',
      ],
    },
    {
      title: '改善が必要な点',
      items: weak.length > 0
        ? weak.map(w => `「${w}」のスコアが低く、優先的に改善が必要です。`)
        : ['全体的なバランスは取れていますが、さらなる差別化が求められます。'],
    },
    {
      title: 'おすすめ次のアクション',
      items: [
        'Googleビジネスプロフィールの説明文に「行く理由」を3つ追記する',
        'HPのファーストビューに客層・利用シーンを明示する',
        'SNSプロフィールに差別化ポイントを1行で入れる',
      ],
    },
  ];
}

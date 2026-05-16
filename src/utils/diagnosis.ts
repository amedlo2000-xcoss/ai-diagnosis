import { DiagnosisAnswers, AxisScore } from '../types';

export function getRank(totalScore: number): { rank: string; rankLabel: string } {
  if (totalScore >= 90) return { rank: 'SS', rankLabel: 'AIが強く推薦しやすい状態' };
  if (totalScore >= 80) return { rank: 'S', rankLabel: '選ばれる理由が明確' };
  if (totalScore >= 70) return { rank: 'A', rankLabel: '基本的に整っている' };
  if (totalScore >= 55) return { rank: 'B', rankLabel: '理由がやや弱い' };
  if (totalScore >= 40) return { rank: 'C', rankLabel: '伝わり方が曖昧' };
  if (totalScore >= 25) return { rank: 'D', rankLabel: '理由不足' };
  return { rank: 'E', rankLabel: 'AIが理解しにくい状態' };
}

export function getDiagnosisType(answers: DiagnosisAnswers, axisScores: AxisScore[]): string {
  const weakAxis = axisScores.reduce((a, b) => a.score < b.score ? a : b);
  const q1 = answers[1] ?? 3;

  if (weakAxis.name === 'AI理解度' || weakAxis.name === '媒体一貫性') {
    if ((answers[3] ?? 3) >= 2 && (answers[4] ?? 3) >= 2 && (answers[5] ?? 3) >= 2) {
      return 'AI理解不足型';
    }
    return '媒体不一致型';
  }
  if (weakAxis.name === '差別化') return '差別化不足型';
  if (weakAxis.name === '来店目的の強さ') return '選ばれる理由強化型';
  if (q1 >= 2) return '立地依存型';
  if ((answers[2] ?? 3) >= 2) return '理由不足型';
  return '選ばれる理由強化型';
}

export function getBottleneck(axisScores: AxisScore[]): string {
  const weakAxis = axisScores.reduce((a, b) => a.score < b.score ? a : b);
  const map: Record<string, string> = {
    '行く理由の明確性': 'お店に"わざわざ行く理由"が言語化されていないため、AIに推薦されにくい状態です。',
    'AI理解度': '各媒体の説明文がAIに理解されにくい表現になっています。',
    '媒体一貫性': 'HP・Google・SNSで発信内容にズレがあり、AIが情報を統合できていません。',
    '差別化': '競合との違いが明確でなく、AIが推薦する根拠を見つけにくい状態です。',
    '来店目的の強さ': '客層・利用シーンが不明確なため、AIが適切なユーザーに推薦できません。',
  };
  return map[weakAxis.name] ?? 'AI検索への最適化が全体的に不足しています。';
}

export function getImprovements(axisScores: AxisScore[]): string[] {
  const sorted = [...axisScores].sort((a, b) => a.score - b.score);
  const improvements: string[] = [];

  for (const axis of sorted.slice(0, 3)) {
    const map: Record<string, string> = {
      '行く理由の明確性': '「なぜこの店に来るのか」を一文で表現し、すべての媒体に記載する',
      'AI理解度': '箇条書きではなく、文脈のある文章で店舗情報を記述する',
      '媒体一貫性': 'HP・Google・SNSで同じキーワードと強みを一貫して発信する',
      '差別化': '競合と比較したときの自店の強みを具体的に3つ書き出す',
      '来店目的の強さ': '「誰が・どんな目的で来るか」を明示したターゲット文を作成する',
    };
    improvements.push(map[axis.name] ?? `${axis.name}を改善する`);
  }
  return improvements;
}

export function getNextActions(answers: DiagnosisAnswers): string[] {
  const actions = [];
  if ((answers[4] ?? 3) >= 2) actions.push('Googleビジネスプロフィールの説明文を「行く理由」中心にリライトする');
  if ((answers[3] ?? 3) >= 2) actions.push('HPのトップページに客層・利用シーン・差別化ポイントを追記する');
  if ((answers[5] ?? 3) >= 2) actions.push('SNSプロフィール文を「誰向けの・どんな店か」が分かる内容に変更する');
  if (actions.length < 3) actions.push('口コミで褒められているポイントをキャッチコピーに変換する');
  if (actions.length < 3) actions.push('競合店との違いを一言で表現したフレーズを作り各媒体に掲載する');
  return actions.slice(0, 3);
}

export function getAIComment(totalScore: number, diagnosisType: string): string {
  if (totalScore >= 70) {
    return `総合スコア${totalScore}点。${diagnosisType}として分類されますが、AI検索への対応は比較的整っています。さらなる差別化表現でSS級を目指しましょう。`;
  }
  if (totalScore >= 40) {
    return `総合スコア${totalScore}点。${diagnosisType}です。AI検索では「行く理由」が明確な店舗が優先されます。各媒体の説明文を見直すことで大きくスコアが改善します。`;
  }
  return `総合スコア${totalScore}点。${diagnosisType}です。現状ではAIが店舗の強みを理解できていません。まずGoogleビジネスプロフィールから改善を始めることをお勧めします。`;
}

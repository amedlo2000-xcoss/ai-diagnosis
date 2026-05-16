import { AIScore, DiagnosisAnswers } from '../types';

export function calculateAIScores(answers: DiagnosisAnswers): AIScore[] {
  const vals = Object.values(answers);
  const avg = vals.length > 0 ? vals.reduce((a, b) => a + b, 0) / vals.length : 1.5;
  const base = Math.round((1 - avg / 3) * 100);

  const chatgpt = Math.min(100, Math.max(20, base + 5));
  const gemini = Math.min(100, Math.max(20, base - 8));
  const claude = Math.min(100, Math.max(20, base + 10));

  return [
    {
      name: 'ChatGPT',
      label: 'AI検索適合度',
      score: chatgpt,
      comment: `AI検索での推薦されやすさは${chatgpt}%です。行く理由の明確さが鍵です。`,
      color: '#10a37f',
    },
    {
      name: 'Gemini',
      label: 'ローカル検索適合度',
      score: gemini,
      comment: `Googleローカル検索での適合度は${gemini}%です。Googleプロフィールの充実が重要です。`,
      color: '#4285f4',
    },
    {
      name: 'Claude',
      label: '文脈理解適合度',
      score: claude,
      comment: `AIによる文脈理解度は${claude}%です。利用シーンと客層の記述が評価されています。`,
      color: '#d97706',
    },
  ];
}

import { DiagnosisAnswers, AxisScore } from '../types';
import { questions } from '../data/questions';

export async function fetchGeminiAxisScores(answers: DiagnosisAnswers): Promise<AxisScore[]> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) throw new Error('VITE_GEMINI_API_KEY is not set');

  const qaPairs = questions.map(q => {
    const idx = answers[q.id] ?? 3;
    return `Q: ${q.text}\nA: ${q.options[idx]}`;
  }).join('\n\n');

  const prompt = `あなたは店舗のAI検索最適化の専門家です。以下の店舗オーナーへのアンケート回答を分析し、AI検索（ChatGPT・Gemini・Claude等）での推薦されやすさを5つの軸で評価してください。

アンケート回答:
${qaPairs}

以下の5軸をそれぞれ0〜100の整数で評価し、JSONのみ返してください。説明文は不要です。

評価軸の定義:
- 行く理由の明確性: お店に"わざわざ行く理由"がどれだけ明確か（Q2, Q3が根拠）
- AI理解度: 各媒体の説明文がAIに理解されやすいか（Q3, Q4, Q5が根拠）
- 媒体一貫性: HP・Google・SNSで発信内容が一貫しているか（Q3, Q4, Q5が根拠）
- 差別化: 競合との違いが明確か（Q8, Q9が根拠）
- 来店目的の強さ: 客層・利用シーンが明確か（Q6, Q7が根拠）

返答形式（JSONのみ、他のテキスト不要）:
{"行く理由の明確性":数値,"AI理解度":数値,"媒体一貫性":数値,"差別化":数値,"来店目的の強さ":数値}`;

  const body = JSON.stringify({
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0.2 },
  });
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  let res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
  if (res.status === 429) {
    await new Promise(r => setTimeout(r, 5000));
    res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
  }
  if (!res.ok) {
    if (res.status === 429) throw new Error('アクセスが集中しています。しばらく待ってから再試行してください。');
    throw new Error(`Gemini API error: ${res.status}`);
  }

  const data = await res.json();
  const text: string = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
  const match = text.match(/\{[\s\S]*?\}/);
  if (!match) throw new Error('Gemini returned invalid JSON');

  const parsed = JSON.parse(match[0]);
  const clamp = (v: number) => Math.min(100, Math.max(0, Math.round(Number(v) || 50)));

  return [
    { name: '行く理由の明確性', score: clamp(parsed['行く理由の明確性']) },
    { name: 'AI理解度',         score: clamp(parsed['AI理解度']) },
    { name: '媒体一貫性',       score: clamp(parsed['媒体一貫性']) },
    { name: '差別化',           score: clamp(parsed['差別化']) },
    { name: '来店目的の強さ',   score: clamp(parsed['来店目的の強さ']) },
  ];
}

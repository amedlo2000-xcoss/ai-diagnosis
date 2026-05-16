import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { questions } from '../data/questions';

interface DeepResult {
  totalScore: number;
  hp:   { score: number; comment: string };
  sns:  { score: number; comment: string };
  meo:  { score: number; comment: string };
  improvements: string[];
  summary: string;
}

async function fetchDeepDiagnosis(state: any): Promise<DeepResult> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) throw new Error('VITE_GEMINI_API_KEY is not set');

  const qaPairs = questions.map(q => {
    const idx = state.answers?.[q.id] ?? 3;
    return `Q: ${q.text}\nA: ${q.options[idx]}`;
  }).join('\n\n');

  const prompt = `あなたは店舗のAI検索最適化の専門家です。以下の情報をもとに、このお店がAI検索（ChatGPT・Gemini・Claude等）で選ばれるかどうかを総合評価してください。

【診断アンケート回答】
${qaPairs}

【店舗情報】
${state.hpUrl ? `HP URL: ${state.hpUrl}` : 'HP URL: （情報なし）'}
${state.googleUrl ? `GoogleビジネスプロフィールURL: ${state.googleUrl}` : 'GoogleビジネスプロフィールURL: （情報なし）'}
${state.snsUrl ? `SNS URL: ${state.snsUrl}` : 'SNS URL: （情報なし）'}
補足情報: ${state.storeInfo || 'なし'}

※URLは実際にアクセスせず、URLの文字列パターン・補足情報・アンケート回答から推測して評価してください。

以下の形式でJSONのみ返してください（説明文不要）：
{
  "totalScore": 0〜100の整数,
  "hp":  { "score": 0〜100の整数, "comment": "HP評価コメント（2〜3文）" },
  "sns": { "score": 0〜100の整数, "comment": "SNS評価コメント（2〜3文）" },
  "meo": { "score": 0〜100の整数, "comment": "Googleビジネスプロフィール（MEO）評価コメント（2〜3文）" },
  "improvements": ["改善点1", "改善点2", "改善点3", "改善点4", "改善点5"],
  "summary": "総評コメント（3〜4文）"
}`;

  const body = JSON.stringify({
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0.3 },
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
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error('Invalid JSON from Gemini');

  const parsed = JSON.parse(match[0]);
  const clamp = (v: number) => Math.min(100, Math.max(0, Math.round(Number(v) || 50)));

  return {
    totalScore: clamp(parsed.totalScore),
    hp:  { score: clamp(parsed.hp?.score),  comment: String(parsed.hp?.comment  ?? '') },
    sns: { score: clamp(parsed.sns?.score), comment: String(parsed.sns?.comment ?? '') },
    meo: { score: clamp(parsed.meo?.score), comment: String(parsed.meo?.comment ?? '') },
    improvements: Array.isArray(parsed.improvements) ? parsed.improvements.map(String) : [],
    summary: String(parsed.summary ?? ''),
  };
}

function ScoreBar({ label, score, color }: { label: string; score: number; color: string }) {
  return (
    <div style={{marginBottom:14}}>
      <div style={{display:'flex', justifyContent:'space-between', marginBottom:4}}>
        <span style={{fontSize:13, color:'#334155', fontWeight:600}}>{label}</span>
        <span style={{fontSize:13, fontWeight:800, color}}>{score}点</span>
      </div>
      <div style={{height:8, background:'#f1f5f9', borderRadius:8}}>
        <div style={{height:'100%', width:`${score}%`, background:color, borderRadius:8,
          transition:'width 0.8s ease', boxShadow:`0 2px 8px ${color}44`}} />
      </div>
    </div>
  );
}

export default function DeepDiagnosisPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [result, setResult] = useState<DeepResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    if (!state) { navigate('/'); return; }
    setLoading(true);
    setError('');
    setResult(null);
    fetchDeepDiagnosis(state)
      .then(setResult)
      .catch((e) => setError(e.message ?? 'エラーが発生しました'))
      .finally(() => setLoading(false));
  }, [retryKey]);

  if (!state) return null;

  const scoreColor = (s: number) =>
    s >= 75 ? '#059669' : s >= 50 ? '#d97706' : '#dc2626';

  return (
    <div style={{minHeight:'100vh', background:'#f8fafc', padding:'40px 16px'}}>
      <div style={{maxWidth:600, margin:'0 auto', display:'flex', flexDirection:'column', gap:20}}>

        {/* ヘッダー */}
        <div style={{background:'linear-gradient(135deg,#1e3a5f,#b45309)', borderRadius:20, padding:24, color:'#fff'}}>
          <p style={{fontSize:12, opacity:0.8, marginBottom:4}}>APP Purpose Search</p>
          <h1 style={{fontSize:20, fontWeight:900, margin:0}}>AI詳細診断レポート</h1>
          <p style={{fontSize:13, opacity:0.7, marginTop:6}}>HP・SNS・MEOを総合評価</p>
        </div>

        {/* ローディング */}
        {loading && (
          <div style={{background:'#fff', borderRadius:20, border:'1px solid #e2e8f0', padding:48,
            display:'flex', flexDirection:'column', alignItems:'center', gap:16}}>
            <div style={{width:48, height:48, border:'4px solid #e2e8f0', borderTopColor:'#b45309',
              borderRadius:'50%', animation:'spin 0.9s linear infinite'}} />
            <p style={{fontSize:14, color:'#64748b', fontWeight:600}}>Geminiが詳細分析中...</p>
            <p style={{fontSize:12, color:'#94a3b8'}}>HP・SNS・MEOを総合評価しています</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {/* エラー */}
        {error && (
          <div style={{background:'#fff', borderRadius:20, border:'1px solid #fecaca', padding:24}}>
            <p style={{fontSize:14, color:'#dc2626', fontWeight:600}}>⚠ {error}</p>
            <div style={{display:'flex', gap:10, marginTop:12, flexWrap:'wrap'}}>
              <button onClick={() => setRetryKey(k => k + 1)}
                style={{padding:'8px 20px', borderRadius:10, border:'none',
                  background:'linear-gradient(135deg,#1e3a5f,#b45309)', color:'#fff',
                  fontSize:13, fontWeight:600, cursor:'pointer'}}>
                再試行
              </button>
              <button onClick={() => navigate(-1)}
                style={{padding:'8px 20px', borderRadius:10, border:'1px solid #e2e8f0',
                  background:'#f8fafc', color:'#64748b', fontSize:13, cursor:'pointer'}}>
                戻る
              </button>
            </div>
          </div>
        )}

        {/* 結果 */}
        {result && (
          <>
            {/* 総合スコア */}
            <div style={{background:'#fff', borderRadius:20, border:'1px solid #e2e8f0', padding:32, textAlign:'center'}}>
              <p style={{fontSize:13, color:'#94a3b8', marginBottom:8}}>総合AI適合スコア</p>
              <div style={{fontSize:88, fontWeight:900, lineHeight:1,
                color: scoreColor(result.totalScore),
                textShadow:`0 4px 24px ${scoreColor(result.totalScore)}44`}}>
                {result.totalScore}
              </div>
              <p style={{fontSize:14, color:'#64748b', marginTop:8}}>/ 100点</p>
            </div>

            {/* 3媒体スコア */}
            <div style={{background:'#fff', borderRadius:20, border:'1px solid #e2e8f0', padding:24}}>
              <h2 style={{fontSize:15, fontWeight:700, color:'#1e293b', marginBottom:16}}>媒体別スコア</h2>
              <ScoreBar label="HP"   score={result.hp.score}  color={scoreColor(result.hp.score)} />
              <ScoreBar label="SNS"  score={result.sns.score} color={scoreColor(result.sns.score)} />
              <ScoreBar label="MEO（Google）" score={result.meo.score} color={scoreColor(result.meo.score)} />
            </div>

            {/* 媒体別コメント */}
            {[
              { key: 'hp',  label: 'HP 評価', icon: '🌐', data: result.hp },
              { key: 'sns', label: 'SNS 評価', icon: '📱', data: result.sns },
              { key: 'meo', label: 'MEO（Google）評価', icon: '📍', data: result.meo },
            ].map(({ key, label, icon, data }) => (
              <div key={key} style={{background:'#fff', borderRadius:20, border:'1px solid #e2e8f0', padding:24}}>
                <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:12}}>
                  <span style={{fontSize:20}}>{icon}</span>
                  <h2 style={{fontSize:15, fontWeight:700, color:'#1e293b', margin:0}}>{label}</h2>
                  <span style={{marginLeft:'auto', fontSize:16, fontWeight:800, color:scoreColor(data.score)}}>
                    {data.score}点
                  </span>
                </div>
                <p style={{fontSize:14, color:'#475569', lineHeight:1.7}}>{data.comment}</p>
              </div>
            ))}

            {/* 改善点 */}
            <div style={{background:'#fff', borderRadius:20, border:'1px solid #e2e8f0', padding:24}}>
              <h2 style={{fontSize:15, fontWeight:700, color:'#1e293b', marginBottom:14}}>
                AIに選ばれるための具体的改善点
              </h2>
              {result.improvements.map((item, i) => (
                <div key={i} style={{display:'flex', gap:12, marginBottom:12, alignItems:'flex-start'}}>
                  <div style={{width:22, height:22, borderRadius:'50%', background:'linear-gradient(135deg,#1e3a5f,#b45309)',
                    display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1}}>
                    <span style={{fontSize:11, fontWeight:700, color:'#fff'}}>{i+1}</span>
                  </div>
                  <span style={{fontSize:14, color:'#334155', lineHeight:1.6}}>{item}</span>
                </div>
              ))}
            </div>

            {/* 総評 */}
            <div style={{background:'linear-gradient(135deg,#fffbeb,#fef3c7)', borderRadius:20,
              border:'1px solid #fde68a', padding:24}}>
              <h2 style={{fontSize:15, fontWeight:700, color:'#92400e', marginBottom:12}}>総評</h2>
              <p style={{fontSize:14, color:'#78350f', lineHeight:1.8}}>{result.summary}</p>
            </div>
          </>
        )}

        {/* ナビゲーション */}
        {!loading && (
          <>
            <button onClick={() => navigate(-1)}
              style={{width:'100%', padding:'12px', borderRadius:14, fontWeight:500, color:'#64748b',
                fontSize:14, border:'1px solid #e2e8f0', background:'#fff', cursor:'pointer'}}>
              ← レポートに戻る
            </button>
            <button onClick={() => navigate('/')}
              style={{width:'100%', padding:'12px', borderRadius:14, fontWeight:500, color:'#64748b',
                fontSize:14, border:'1px solid #e2e8f0', background:'#fff', cursor:'pointer'}}>
              トップに戻る
            </button>
          </>
        )}
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchGeminiAxisScores } from '../utils/geminiApi';
import { AxisScore } from '../types';

const RANK_COLORS: Record<string, string> = {
  SS: '#7c3aed', S: '#2563eb', A: '#059669',
  B: '#d97706', C: '#ea580c', D: '#dc2626', E: '#6b7280',
};

function Radar3D({ data, loading }: { data: { subject: string; score: number }[]; loading?: boolean }) {
  const size = 220;
  const cx = size / 2;
  const cy = size / 2;
  const r = 80;
  const n = data.length;
  const levels = [0.25, 0.5, 0.75, 1.0];

  function polar(angle: number, radius: number) {
    const a = angle - Math.PI / 2;
    return { x: cx + radius * Math.cos(a), y: cy + radius * Math.sin(a) };
  }

  const angleStep = (2 * Math.PI) / n;
  const gridPolygons = levels.map((lv) =>
    data.map((_, i) => { const p = polar(i * angleStep, r * lv); return `${p.x},${p.y}`; }).join(' ')
  );
  const dataPoints = data.map((d, i) => {
    const p = polar(i * angleStep, r * (d.score / 100));
    return `${p.x},${p.y}`;
  });

  return (
    <div style={{position:'relative', display:'inline-block'}}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}
        style={{opacity: loading ? 0.4 : 1, transition:'opacity 0.3s'}}>
        <defs>
          <radialGradient id="rg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.05" />
          </radialGradient>
          <linearGradient id="fill3d" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#b45309" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        {gridPolygons.map((pts, i) => (
          <polygon key={i} points={pts}
            fill={i === gridPolygons.length - 1 ? 'url(#rg)' : 'none'}
            stroke="#e2e8f0" strokeWidth="0.8" />
        ))}
        {data.map((_, i) => {
          const p = polar(i * angleStep, r);
          return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#e2e8f0" strokeWidth="0.8" />;
        })}
        <polygon points={dataPoints.join(' ')}
          fill="url(#fill3d)" stroke="#b45309" strokeWidth="2"
          style={{filter:'drop-shadow(0 4px 12px rgba(180,83,9,0.4))'}} />
        {data.map((d, i) => {
          const p = polar(i * angleStep, r * (d.score / 100));
          return <circle key={i} cx={p.x} cy={p.y} r="4" fill="#b45309"
            style={{filter:'drop-shadow(0 2px 6px rgba(180,83,9,0.6))'}} />;
        })}
        {data.map((d, i) => {
          const p = polar(i * angleStep, r + 22);
          return (
            <text key={i} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="central"
              fontSize="9" fill="#475569" fontWeight="500">{d.subject}</text>
          );
        })}
      </svg>
      {loading && (
        <div style={{position:'absolute', inset:0, display:'flex', flexDirection:'column',
          alignItems:'center', justifyContent:'center', gap:6}}>
          <div style={{width:28, height:28, border:'3px solid #e2e8f0', borderTopColor:'#b45309',
            borderRadius:'50%', animation:'spin 0.8s linear infinite'}} />
          <span style={{fontSize:11, color:'#b45309', fontWeight:600}}>Gemini分析中...</span>
        </div>
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function PieChart3D({ score, color, name }: { score: number; color: string; name: string; label: string }) {
  const size = 110;
  const cx = size / 2;
  const cy = size / 2 - 6;
  const rx = 44; const ry = 18; const height = 10; const r = 38;
  const pct = score / 100;
  const angle = pct * 2 * Math.PI;
  const x1 = cx + r * Math.sin(0); const y1 = cy - r * Math.cos(0);
  const x2 = cx + r * Math.sin(angle); const y2 = cy - r * Math.cos(angle);
  const large = pct > 0.5 ? 1 : 0;
  const slicePath = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
  const slicePathBottom = `M ${cx} ${cy + height} L ${x1} ${y1 + height} A ${r} ${r} 0 ${large} 1 ${x2} ${y2 + height} Z`;
  return (
    <svg width={size} height={size + 20} viewBox={`0 0 ${size} ${size + 20}`}>
      <defs>
        <linearGradient id={`cyl-${name}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.9" />
          <stop offset="100%" stopColor={color} stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <ellipse cx={cx} cy={cy + height} rx={rx} ry={ry} fill="#e2e8f0" opacity="0.5" />
      {pct > 0 && (
        <>
          <path d={slicePathBottom} fill={color} opacity="0.4" />
          <path d={`M ${x1} ${y1} L ${x1} ${y1 + height} A ${r} ${r} 0 ${large} 1 ${x2} ${y2 + height} L ${x2} ${y2} A ${r} ${r} 0 ${large} 0 ${x1} ${y1} Z`}
            fill={`url(#cyl-${name})`} style={{filter:`drop-shadow(2px 2px 4px ${color}66)`}} />
          <path d={slicePath} fill={color} opacity="0.9"
            style={{filter:`drop-shadow(0 -2px 6px ${color}88)`}} />
        </>
      )}
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke="#e2e8f0" strokeWidth="1" />
      <text x={cx} y={cy + 4} textAnchor="middle" fontSize="13" fontWeight="800" fill={color}>{score}%</text>
    </svg>
  );
}

function ImprovementSimulation({ data }: { data: { subject: string; score: number }[] }) {
  if (data.length === 0) return null;

  const improved = data.map(d => ({
    subject: d.subject,
    score: Math.min(100, Math.round(d.score + (100 - d.score) * 0.6)),
  }));

  const currentAvg  = Math.round(data.reduce((a, b) => a + b.score, 0) / data.length);
  const improvedAvg = Math.round(improved.reduce((a, b) => a + b.score, 0) / improved.length);
  const diff = improvedAvg - currentAvg;

  const W = 340; const H = 220;
  const pL = 32; const pR = 8; const pT = 28; const pB = 60;
  const cW = W - pL - pR;
  const cH = H - pT - pB;
  const n = data.length;
  const xStep = cW / (n - 1);

  const xp = (i: number) => pL + i * xStep;
  const yp = (s: number) => pT + cH * (1 - s / 100);

  const gridLevels = [0, 25, 50, 75, 100];

  function labelLines(text: string): string[] {
    if (text.length <= 5) return [text];
    return [text.slice(0, 4), text.slice(4)];
  }

  const currentPts  = data.map((d, i) => `${xp(i)},${yp(d.score)}`).join(' ');
  const improvedPts = improved.map((d, i) => `${xp(i)},${yp(d.score)}`).join(' ');
  const baseline    = `${xp(n - 1)},${yp(0)} ${xp(0)},${yp(0)}`;

  return (
    <div>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{overflow:'visible'}}>
        {/* Grid lines */}
        {gridLevels.map(v => (
          <g key={v}>
            <line x1={pL} y1={yp(v)} x2={W - pR} y2={yp(v)}
              stroke={v === 0 ? '#e2e8f0' : '#f1f5f9'} strokeWidth={v === 0 ? 1 : 0.8} />
            <text x={pL - 4} y={yp(v)} textAnchor="end" dominantBaseline="central"
              fontSize="8" fill="#94a3b8">{v}</text>
          </g>
        ))}

        {/* Fill area - improved */}
        <polygon points={`${improvedPts} ${baseline}`} fill="#10b981" opacity="0.07" />
        {/* Fill area - current */}
        <polygon points={`${currentPts} ${baseline}`} fill="#94a3b8" opacity="0.1" />

        {/* Lines */}
        <polyline points={currentPts}  fill="none" stroke="#cbd5e1" strokeWidth="2" />
        <polyline points={improvedPts} fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="5 3" />

        {/* Current points + labels */}
        {data.map((d, i) => (
          <g key={`c-${i}`}>
            <circle cx={xp(i)} cy={yp(d.score)} r="3.5" fill="#94a3b8" />
            <text x={xp(i)} y={yp(d.score) - 7} textAnchor="middle"
              fontSize="9" fill="#64748b" fontWeight="600">{d.score}</text>
          </g>
        ))}

        {/* Improved points + labels */}
        {improved.map((d, i) => (
          <g key={`m-${i}`}>
            <circle cx={xp(i)} cy={yp(d.score)} r="3.5" fill="#10b981" />
            <text x={xp(i)} y={yp(d.score) - 7} textAnchor="middle"
              fontSize="9" fill="#10b981" fontWeight="600">{d.score}</text>
          </g>
        ))}

        {/* X-axis labels */}
        {data.map((d, i) => {
          const lines = labelLines(d.subject);
          return (
            <text key={`l-${i}`} x={xp(i)} y={H - pB + 14}
              textAnchor="middle" fontSize="8.5" fill="#64748b">
              {lines.map((line, j) => (
                <tspan key={j} x={xp(i)} dy={j === 0 ? 0 : 12}>{line}</tspan>
              ))}
            </text>
          );
        })}
      </svg>

      {/* Legend */}
      <div style={{display:'flex', gap:16, marginTop:4, paddingLeft:pL, flexWrap:'wrap'}}>
        <div style={{display:'flex', alignItems:'center', gap:5}}>
          <svg width="20" height="10">
            <line x1="0" y1="5" x2="20" y2="5" stroke="#cbd5e1" strokeWidth="2" />
          </svg>
          <span style={{fontSize:11, color:'#64748b'}}>現在</span>
        </div>
        <div style={{display:'flex', alignItems:'center', gap:5}}>
          <svg width="20" height="10">
            <line x1="0" y1="5" x2="20" y2="5" stroke="#10b981" strokeWidth="2" strokeDasharray="5 3" />
          </svg>
          <span style={{fontSize:11, color:'#10b981'}}>改善後予測</span>
        </div>
      </div>

      {/* Summary */}
      <div style={{marginTop:12, background:'#f0fdf4', border:'1px solid #bbf7d0',
        borderRadius:12, padding:'10px 16px', display:'flex', alignItems:'center', gap:8}}>
        <span style={{fontSize:18}}>📈</span>
        <span style={{fontSize:14, color:'#065f46', fontWeight:700}}>
          改善で期待できる総合スコアアップ：+{diff}点
        </span>
      </div>
    </div>
  );
}

export default function ResultPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [radarScores, setRadarScores] = useState<{ subject: string; score: number }[]>([]);
  const [isLoadingGemini, setIsLoadingGemini] = useState(true);
  const [geminiError, setGeminiError] = useState(false);

  useEffect(() => {
    if (!state) return;
    const fallback = (state.axisScores as AxisScore[]).map((a) => ({ subject: a.name, score: a.score }));
    setRadarScores(fallback);

    fetchGeminiAxisScores(state.answers)
      .then((scores) => {
        setRadarScores(scores.map((a) => ({ subject: a.name, score: a.score })));
      })
      .catch(() => {
        setGeminiError(true);
      })
      .finally(() => {
        setIsLoadingGemini(false);
      });
  }, []);

  if (!state) { navigate('/'); return null; }
  const { totalScore, rank, rankLabel, diagnosisType, bottleneck, improvements, nextActions, aiComment, aiScores } = state;
  const rankColor = RANK_COLORS[rank] ?? '#6b7280';

  return (
    <div style={{minHeight:'100vh', background:'#f8fafc', padding:'40px 16px'}}>
      <div style={{maxWidth:600, margin:'0 auto', display:'flex', flexDirection:'column', gap:20}}>

        {/* スコア */}
        <div style={{background:'#fff', borderRadius:20, border:'1px solid #e2e8f0', padding:32, textAlign:'center'}}>
          <p style={{fontSize:13, color:'#94a3b8', marginBottom:8}}>総合スコア</p>
          <div style={{display:'flex', alignItems:'flex-end', justifyContent:'center', gap:12, marginBottom:8}}>
            <span style={{fontSize:22, fontWeight:700, color:'#94a3b8'}}>{totalScore}点</span>
            <span style={{fontSize:80, fontWeight:900, lineHeight:1, color:rankColor, textShadow:`0 4px 20px ${rankColor}44`}}>{rank}級</span>
          </div>
          <p style={{fontSize:13, color:'#64748b', marginBottom:4}}>{rankLabel}</p>
          <p style={{fontSize:15, fontWeight:600, color:'#334155'}}>{diagnosisType}</p>
        </div>

        {/* レーダーチャート */}
        <div style={{background:'#fff', borderRadius:20, border:'1px solid #e2e8f0', padding:24}}>
          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16}}>
            <h2 style={{fontSize:15, fontWeight:700, color:'#1e293b', margin:0}}>スコア分析（3D レーダー）</h2>
            {isLoadingGemini && (
              <span style={{fontSize:11, color:'#b45309', fontWeight:600, background:'#fef3c7', padding:'2px 8px', borderRadius:20}}>
                Gemini 分析中...
              </span>
            )}
            {!isLoadingGemini && !geminiError && (
              <span style={{fontSize:11, color:'#059669', fontWeight:600, background:'#d1fae5', padding:'2px 8px', borderRadius:20}}>
                ✓ Gemini 反映済み
              </span>
            )}
            {geminiError && (
              <span style={{fontSize:11, color:'#64748b', fontWeight:600, background:'#f1f5f9', padding:'2px 8px', borderRadius:20}}>
                ロジックスコア使用
              </span>
            )}
          </div>
          <div style={{display:'flex', justifyContent:'center'}}>
            <Radar3D data={radarScores} loading={isLoadingGemini} />
          </div>
        </div>

        {/* AI適合度 */}
        <div style={{background:'#fff', borderRadius:20, border:'1px solid #e2e8f0', padding:24}}>
          <h2 style={{fontSize:15, fontWeight:700, color:'#1e293b', marginBottom:16}}>AI適合度（3D 円グラフ）</h2>
          <div style={{display:'flex', justifyContent:'space-around', alignItems:'flex-start'}}>
            {aiScores.map((ai: any) => (
              <div key={ai.name} style={{display:'flex', flexDirection:'column', alignItems:'center', gap:4}}>
                <PieChart3D score={ai.score} color={ai.color} name={ai.name} label={ai.label} />
                <p style={{fontSize:12, fontWeight:700, color:'#334155', margin:0}}>{ai.name}</p>
                <p style={{fontSize:11, color:'#94a3b8', textAlign:'center', margin:0}}>{ai.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ボトルネック */}
        <div style={{background:'#fff', borderRadius:20, border:'1px solid #e2e8f0', padding:24}}>
          <h2 style={{fontSize:15, fontWeight:700, color:'#1e293b', marginBottom:12}}>ボトルネック</h2>
          <p style={{fontSize:14, color:'#475569', lineHeight:1.7}}>{bottleneck}</p>
        </div>

        {/* 改善提案 */}
        <div style={{background:'#fff', borderRadius:20, border:'1px solid #e2e8f0', padding:24}}>
          <h2 style={{fontSize:15, fontWeight:700, color:'#1e293b', marginBottom:12}}>改善提案</h2>
          {improvements.map((item: string, i: number) => (
            <div key={i} style={{display:'flex', gap:12, marginBottom:10}}>
              <span style={{fontWeight:700, color:'#d97706', flexShrink:0}}>{i+1}.</span>
              <span style={{fontSize:14, color:'#334155'}}>{item}</span>
            </div>
          ))}
        </div>

        {/* 改善シミュレーション */}
        <div style={{background:'#fff', borderRadius:20, border:'1px solid #e2e8f0', padding:24}}>
          <h2 style={{fontSize:15, fontWeight:700, color:'#1e293b', marginBottom:16}}>改善シミュレーション</h2>
          <ImprovementSimulation data={radarScores} />
        </div>

        {/* 次のアクション */}
        <div style={{background:'#fff', borderRadius:20, border:'1px solid #e2e8f0', padding:24}}>
          <h2 style={{fontSize:15, fontWeight:700, color:'#1e293b', marginBottom:12}}>次のアクション</h2>
          {nextActions.map((item: string, i: number) => (
            <div key={i} style={{display:'flex', gap:12, marginBottom:10}}>
              <span style={{fontSize:18, flexShrink:0}}>{['①','②','③'][i]}</span>
              <span style={{fontSize:14, color:'#334155'}}>{item}</span>
            </div>
          ))}
        </div>

        {/* AIコメント */}
        <div style={{background:'#fff', borderRadius:20, border:'1px solid #e2e8f0', padding:24}}>
          <h2 style={{fontSize:15, fontWeight:700, color:'#1e293b', marginBottom:12}}>AI検索適合コメント</h2>
          <p style={{fontSize:14, color:'#475569', lineHeight:1.7}}>{aiComment}</p>
        </div>

        <button onClick={() => navigate('/report', { state })}
          style={{width:'100%', padding:'16px', borderRadius:14, fontWeight:700, color:'#fff', fontSize:16, border:'none', background:'linear-gradient(135deg,#1e3a5f,#b45309)', boxShadow:'0 4px 20px rgba(180,83,9,0.3)', cursor:'pointer'}}>
          詳細レポートを見る →
        </button>
        <button onClick={() => navigate('/')}
          style={{width:'100%', padding:'12px', borderRadius:14, fontWeight:500, color:'#64748b', fontSize:14, border:'1px solid #e2e8f0', background:'#fff', cursor:'pointer'}}>
          もう一度診断する
        </button>
      </div>
    </div>
  );
}

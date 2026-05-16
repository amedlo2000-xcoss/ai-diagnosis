import { useNavigate } from 'react-router-dom';

export default function TopPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center py-16">
        <div className="inline-block bg-amber-50 border border-amber-200 text-amber-700 text-sm font-medium px-4 py-1 rounded-full mb-6">
          AI検索最適化ツール
        </div>
        <h1 className="text-3xl font-bold text-navy-900 mb-4 leading-tight" style={{color:'#0f172a'}}>
          APP Purpose Search
        </h1>
        <p className="text-lg text-slate-500 mb-3">
          AI検索時代に、あなたのお店が"選ばれる理由"を診断します。
        </p>
        <p className="text-2xl font-bold mb-10" style={{color:'#b45309'}}>
          検索される店ではなく、選ばれる店へ。
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {[
            { icon: '🔍', title: 'AI検索適合度', desc: 'ChatGPT・Gemini・Claudeに推薦されやすいかを診断' },
            { icon: '📝', title: '3媒体を同時評価', desc: 'HP・Googleプロフィール・SNSをまとめて分析' },
            { icon: '✨', title: '自動リライト', desc: '診断結果に基づき改善文章を自動生成' },
          ].map((item) => (
            <div key={item.title} className="border border-slate-100 rounded-xl p-5 bg-slate-50">
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="font-semibold text-slate-800 mb-1 text-sm">{item.title}</div>
              <div className="text-xs text-slate-500">{item.desc}</div>
            </div>
          ))}
        </div>
        <button
          onClick={() => navigate('/diagnosis')}
          className="w-full max-w-xs mx-auto block py-4 px-8 rounded-xl font-bold text-white text-lg shadow-md transition-all hover:opacity-90 active:scale-95"
          style={{background:'linear-gradient(135deg,#1e3a5f,#b45309)'}}
        >
          無料診断を開始する
        </button>
        <p className="text-xs text-slate-400 mt-4">10問・約2分で完了します</p>
      </div>
    </div>
  );
}

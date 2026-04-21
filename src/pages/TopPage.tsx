interface Props {
  onStart: () => void; // 診断開始ボタンを押した時の処理
}

export default function TopPage({ onStart }: Props) {
  return (
    <div style={{ textAlign: "center", padding: "3rem 1rem 2rem" }}>
      {/* アイコン */}
      <div
        style={{
          width: "56px",
          height: "56px",
          background: "#EEEDFE",
          borderRadius: "16px",
          margin: "0 auto 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#534AB7"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4M12 8h.01" />
        </svg>
      </div>

      {/* タイトル */}
      <h1
        style={{
          fontSize: "28px",
          fontWeight: 500,
          color: "var(--color-text-primary)",
          marginBottom: "12px",
        }}
      >
        AI行動診断
      </h1>

      {/* サブタイトル */}
      <p
        style={{
          fontSize: "15px",
          color: "var(--color-text-secondary)",
          lineHeight: 1.7,
          maxWidth: "360px",
          margin: "0 auto 2rem",
        }}
      >
        行動データから、あなたの適合性・課題・改善ポイントを可視化します
      </p>

      {/* タグ */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "8px",
          marginBottom: "2.5rem",
        }}
      >
        {["フリーランス", "個人事業主", "副業者", "ネットワーカー"].map(
          (tag) => (
            <span
              key={tag}
              style={{
                display: "inline-block",
                padding: "4px 12px",
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: 500,
                background: "#EEEDFE",
                color: "#3c3489",
              }}
            >
              {tag}
            </span>
          )
        )}
      </div>

      {/* 開始ボタン */}
      <button
        onClick={onStart}
        style={{
          padding: "12px 32px",
          background: "#534AB7",
          color: "#EEEDFE",
          border: "none",
          borderRadius: "8px",
          fontSize: "15px",
          fontWeight: 500,
          cursor: "pointer",
        }}
      >
        診断を開始する
      </button>

      {/* 3つの特徴 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: "12px",
          marginTop: "3rem",
        }}
      >
        {[
          { value: "10問", desc: "かんたんな質問に回答" },
          { value: "5軸", desc: "行動傾向を多角的に分析" },
          { value: "AI比較", desc: "複数AI視点でスコア可視化" },
        ].map((item) => (
          <div
            key={item.value}
            style={{
              background: "var(--color-background-primary)",
              border: "0.5px solid var(--color-border-tertiary)",
              borderRadius: "12px",
              padding: "1.25rem",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "22px",
                fontWeight: 500,
                color: "#534AB7",
                marginBottom: "4px",
              }}
            >
              {item.value}
            </div>
            <div
              style={{
                fontSize: "13px",
                color: "var(--color-text-secondary)",
              }}
            >
              {item.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
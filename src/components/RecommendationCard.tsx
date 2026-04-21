interface Props {
  title: string;       // カードのタイトル
  items: string[];     // 表示する項目リスト
  accentColor?: string; // 番号の色（省略可）
  accentBg?: string;   // 番号の背景色（省略可）
}

export default function RecommendationCard({
  title,
  items,
  accentColor = "#534AB7",
  accentBg = "#EEEDFE",
}: Props) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      {/* タイトル */}
      <p
        style={{
          fontSize: "12px",
          fontWeight: 500,
          color: "var(--color-text-secondary)",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          marginBottom: "8px",
        }}
      >
        {title}
      </p>

      {/* 項目リスト */}
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: "12px",
            alignItems: "flex-start",
          }}
        >
          {/* 番号バッジ */}
          <div
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              background: accentBg,
              color: accentColor,
              fontSize: "12px",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              marginTop: "1px",
            }}
          >
            {i + 1}
          </div>

          {/* テキスト */}
          <div
            style={{
              fontSize: "14px",
              lineHeight: 1.6,
              color: "var(--color-text-primary)",
            }}
          >
            {item}
          </div>
        </div>
      ))}
    </div>
  );
}
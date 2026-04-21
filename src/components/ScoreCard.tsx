interface Props {
  label: string;  // 軸名
  score: number;  // スコア（0〜100）
}

export default function ScoreCard({ label, score }: Props) {
  return (
    <div style={{ marginBottom: "14px" }}>
      {/* ラベルとスコア */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "13px",
          marginBottom: "4px",
        }}
      >
        <span style={{ color: "var(--color-text-primary)" }}>{label}</span>
        <span style={{ color: "var(--color-text-secondary)" }}>{score}%</span>
      </div>

      {/* スコアバー */}
      <div
        style={{
          height: "8px",
          background: "var(--color-background-secondary)",
          borderRadius: "4px",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${score}%`,
            background: "#534AB7",
            borderRadius: "4px",
            transition: "width 0.6s",
          }}
        />
      </div>
    </div>
  );
}
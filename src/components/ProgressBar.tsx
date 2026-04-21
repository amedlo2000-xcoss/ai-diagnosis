interface Props {
  current: number; // 現在の質問番号（1〜10）
  total: number;   // 全質問数
}

export default function ProgressBar({ current, total }: Props) {
  const pct = Math.round((current / total) * 100);

  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "13px",
          color: "var(--color-text-secondary)",
          marginBottom: "6px",
        }}
      >
        <span>質問 {current} / {total}</span>
        <span>{pct}%</span>
      </div>
      <div
        style={{
          height: "6px",
          background: "var(--color-background-secondary)",
          borderRadius: "4px",
          border: "0.5px solid var(--color-border-tertiary)",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background: "#534AB7",
            borderRadius: "4px",
            transition: "width 0.3s",
          }}
        />
      </div>
    </div>
  );
}
interface Props {
  title: string;      // ページタイトル
  subtitle?: string;  // サブタイトル（省略可）
}

export default function ResultHeader({ title, subtitle }: Props) {
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <h1
        style={{
          fontSize: "22px",
          fontWeight: 500,
          color: "var(--color-text-primary)",
          marginBottom: subtitle ? "6px" : "0",
        }}
      >
        {title}
      </h1>
      {subtitle && (
        <p
          style={{
            fontSize: "14px",
            color: "var(--color-text-secondary)",
            lineHeight: 1.6,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
import { useState } from "react";
import { type UserType, USER_TYPE_LABELS } from "../types";

interface Props {
  onStart: (userType: UserType) => void;
}

const USER_TYPE_LIST: { key: UserType; label: string; desc: string; icon: string }[] = [
  {
    key: "freelance",
    label: USER_TYPE_LABELS.freelance,
    desc: "案件獲得・単価・継続率を診断",
    icon: "💻",
  },
  {
    key: "sole_proprietor",
    label: USER_TYPE_LABELS.sole_proprietor,
    desc: "集客・顧客管理・売上安定を診断",
    icon: "🏪",
  },
  {
    key: "side_hustle",
    label: USER_TYPE_LABELS.side_hustle,
    desc: "時間管理・成果・本業との両立を診断",
    icon: "⚡",
  },
  {
    key: "solopreneur",
    label: USER_TYPE_LABELS.solopreneur,
    desc: "情報発信・収益化・自動化を診断",
    icon: "🚀",
  },
];

export default function TopPage({ onStart }: Props) {
  const [selected, setSelected] = useState<UserType | null>(null);

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

      {/* タイプ選択 */}
      <p
        style={{
          fontSize: "13px",
          fontWeight: 500,
          color: "var(--color-text-secondary)",
          marginBottom: "12px",
        }}
      >
        あなたに当てはまるタイプを選んでください
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "10px",
          marginBottom: "2rem",
          textAlign: "left",
        }}
      >
        {USER_TYPE_LIST.map((item) => {
          const isActive = selected === item.key;
          return (
            <button
              key={item.key}
              onClick={() => setSelected(item.key)}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "10px",
                padding: "14px",
                borderRadius: "12px",
                border: isActive
                  ? "2px solid #534AB7"
                  : "1.5px solid var(--color-border-tertiary)",
                background: isActive ? "#EEEDFE" : "var(--color-background-primary)",
                cursor: "pointer",
                transition: "all 0.15s ease",
                textAlign: "left",
              }}
            >
              <span style={{ fontSize: "22px", lineHeight: 1, marginTop: "2px" }}>
                {item.icon}
              </span>
              <div>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: isActive ? "#3c3489" : "var(--color-text-primary)",
                    marginBottom: "3px",
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: isActive ? "#534AB7" : "var(--color-text-secondary)",
                    lineHeight: 1.4,
                  }}
                >
                  {item.desc}
                </div>
              </div>
              {isActive && (
                <div
                  style={{
                    marginLeft: "auto",
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    background: "#534AB7",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path
                      d="M1 4L3.5 6.5L9 1"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* 開始ボタン */}
      <button
        onClick={() => selected && onStart(selected)}
        disabled={!selected}
        style={{
          padding: "12px 32px",
          background: selected ? "#534AB7" : "var(--color-border-tertiary)",
          color: selected ? "#EEEDFE" : "var(--color-text-secondary)",
          border: "none",
          borderRadius: "8px",
          fontSize: "15px",
          fontWeight: 500,
          cursor: selected ? "pointer" : "not-allowed",
          transition: "all 0.15s ease",
          width: "100%",
          maxWidth: "320px",
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
          { value: "10問", desc: "タイプ別の専用問題" },
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

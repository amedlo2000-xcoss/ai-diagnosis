import { useState } from "react";
import { supabase } from "../lib/supabase";
import type { AxisScores, DiagnosisResult, UserType } from "../types";

interface Props {
  onBack: () => void;
  onComplete: () => void;
  userType: UserType;
  axisScores: AxisScores;
  totalScore: number;
  diagnosis: DiagnosisResult;
}

const GOLD = "#C9A84C";
const BG = "#0C0C0C";
const CARD_BG = "#161616";
const BORDER = "#2A2A2A";
const TEXT_PRIMARY = "#F5F5F5";
const TEXT_SECONDARY = "#888888";
const INPUT_BG = "#1A1A1A";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "11px 14px",
  fontSize: "14px",
  border: `1px solid ${BORDER}`,
  borderRadius: "8px",
  background: INPUT_BG,
  color: TEXT_PRIMARY,
  outline: "none",
  boxSizing: "border-box",
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  appearance: "none",
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23888' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 12px center",
  paddingRight: "36px",
  cursor: "pointer",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "13px",
  fontWeight: 500,
  color: TEXT_PRIMARY,
  marginBottom: "6px",
};

const fieldStyle: React.CSSProperties = { marginBottom: "16px" };

const cardStyle: React.CSSProperties = {
  background: CARD_BG,
  border: `1px solid ${BORDER}`,
  borderRadius: "12px",
  padding: "1.25rem",
  marginBottom: "1rem",
};

const sectionLabel: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: 600,
  color: GOLD,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  marginBottom: "16px",
};

const requiredBadge = (
  <span style={{ fontSize: "11px", color: GOLD, background: "rgba(201,168,76,0.15)", borderRadius: "4px", padding: "1px 6px", marginLeft: "6px", fontWeight: 500 }}>
    必須
  </span>
);

const optionalBadge = (
  <span style={{ fontSize: "11px", color: TEXT_SECONDARY, background: "#1E1E1E", borderRadius: "4px", padding: "1px 6px", marginLeft: "6px", fontWeight: 400 }}>
    任意
  </span>
);

const INDUSTRIES = [
  "IT・テクノロジー", "金融・保険", "医療・福祉", "教育・研究",
  "小売・EC", "飲食・サービス", "製造業", "建設・不動産",
  "コンサルティング", "クリエイティブ・デザイン", "メディア・広告",
  "物流・運輸", "その他",
];
const EXPERIENCE_OPTIONS = ["1年未満", "1〜3年", "3〜5年", "5〜10年", "10〜20年", "20年以上"];
const AGE_OPTIONS = ["20歳未満", "20〜29歳", "30〜39歳", "40〜49歳", "50〜59歳", "60歳以上"];
const REGIONS = [
  "北海道",
  "東北（青森・岩手・宮城・秋田・山形・福島）",
  "関東・東京都",
  "関東・東京都以外",
  "中部（新潟・富山・石川・福井・山梨・長野・岐阜・静岡・愛知）",
  "近畿（三重・滋賀・京都・大阪・兵庫・奈良・和歌山）",
  "中国（鳥取・島根・岡山・広島・山口）",
  "四国（徳島・香川・愛媛・高知）",
  "九州・沖縄",
  "海外在住",
];

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    const msg = error.message;
    if (msg.includes("User already registered") || msg.includes("already registered")) {
      return "このメールアドレスはすでに登録されています";
    }
    if (msg.includes("Password should be at least") || msg.includes("weak_password")) {
      return "パスワードは6文字以上で入力してください";
    }
    if (msg.includes("Invalid email") || msg.includes("invalid email")) {
      return "有効なメールアドレスを入力してください";
    }
    if (msg.includes("rate limit") || msg.includes("Email rate limit")) {
      return "しばらく時間をおいてから再度お試しください";
    }
    if (msg.includes("Network") || msg.includes("fetch")) {
      return "ネットワークエラーが発生しました。接続を確認してください";
    }
  }
  return "登録に失敗しました。しばらく経ってから再度お試しください";
}

interface FormState {
  name: string;
  email: string;
  password: string;
  industry: string;
  position: string;
  experience: string;
  age: string;
  maritalStatus: string;
  hasChildren: string;
  region: string;
}

export default function RegisterPage({ onBack, onComplete, userType, axisScores, totalScore, diagnosis }: Props) {
  const [form, setForm] = useState<FormState>({
    name: "", email: "", password: "", industry: "", position: "",
    experience: "", age: "", maritalStatus: "", hasChildren: "", region: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const isValid =
    form.name.trim() !== "" &&
    form.email.trim() !== "" &&
    form.password.length >= 6 &&
    form.industry !== "" &&
    form.experience !== "" &&
    form.age !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setLoading(true);
    setError(null);

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: form.email.trim(),
        password: form.password,
      });
      if (authError) throw authError;

      const userId = authData.user?.id;

      const { error: userError } = await supabase.from("ai_diagnosis_users").insert([{
        user_id: userId,
        name: form.name.trim(),
        email: form.email.trim(),
        diagnosis_type: userType,
        industry: form.industry,
        position: form.position.trim() || null,
        experience: form.experience,
        age: form.age,
        marital_status: form.maritalStatus || null,
        has_children: form.hasChildren || null,
        region: form.region || null,
      }]);
      if (userError) throw userError;

      const { error: resultError } = await supabase.from("ai_diagnosis_simple_results").insert([{
        user_id: userId,
        scores: axisScores,
        total_score: totalScore,
        diagnosis_result: diagnosis.type,
      }]);
      if (resultError) throw resultError;

      onComplete();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const radioOption = (name: string, formKey: "maritalStatus" | "hasChildren", value: string) => {
    const selected = form[formKey] === value;
    return (
      <label key={value} style={{
        display: "flex", alignItems: "center", gap: "8px", fontSize: "14px",
        color: TEXT_PRIMARY, cursor: "pointer", flex: 1, padding: "10px 14px",
        border: `1px solid ${selected ? GOLD : BORDER}`,
        borderRadius: "8px",
        background: selected ? "rgba(201,168,76,0.1)" : INPUT_BG,
        transition: "all 0.15s",
      }}>
        <input
          type="radio"
          name={name}
          value={value}
          checked={selected}
          onChange={set(formKey)}
          style={{ accentColor: GOLD }}
        />
        {value}
      </label>
    );
  };

  return (
    <div style={{ background: BG, minHeight: "100vh", padding: "1.5rem 0 3rem" }}>
      {/* ヘッダー */}
      <div style={{ marginBottom: "1.5rem" }}>
        <button
          onClick={onBack}
          style={{ background: "none", border: "none", color: TEXT_SECONDARY, fontSize: "13px", cursor: "pointer", padding: 0, marginBottom: "1rem" }}
        >
          ← レポートに戻る
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "44px", height: "44px",
            background: "rgba(201,168,76,0.12)",
            border: `1px solid ${GOLD}`,
            borderRadius: "12px",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div>
            <h1 style={{ fontSize: "20px", fontWeight: 600, color: TEXT_PRIMARY, margin: 0 }}>会員登録</h1>
            <p style={{ fontSize: "12px", color: TEXT_SECONDARY, margin: "2px 0 0" }}>
              診断結果を保存して精度をさらに高めましょう
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* 基本情報 */}
        <div style={cardStyle}>
          <p style={sectionLabel}>基本情報</p>

          <div style={fieldStyle}>
            <label style={labelStyle}>名前{requiredBadge}</label>
            <input type="text" placeholder="山田 太郎" value={form.name} onChange={set("name")} style={inputStyle} />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>メールアドレス{requiredBadge}</label>
            <input type="email" placeholder="example@email.com" value={form.email} onChange={set("email")} style={inputStyle} />
          </div>

          <div style={{ ...fieldStyle, marginBottom: 0 }}>
            <label style={labelStyle}>パスワード{requiredBadge}</label>
            <input type="password" placeholder="6文字以上" value={form.password} onChange={set("password")} style={inputStyle} />
            <p style={{ fontSize: "11px", color: TEXT_SECONDARY, margin: "5px 0 0" }}>半角英数字6文字以上で設定してください</p>
          </div>
        </div>

        {/* 業種・役職 */}
        <div style={cardStyle}>
          <p style={sectionLabel}>業種・役職</p>

          <div style={fieldStyle}>
            <label style={labelStyle}>業種{requiredBadge}</label>
            <select value={form.industry} onChange={set("industry")} style={selectStyle}>
              <option value="">選択してください</option>
              {INDUSTRIES.map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>

          <div style={{ ...fieldStyle, marginBottom: 0 }}>
            <label style={labelStyle}>役職・肩書き{optionalBadge}</label>
            <input type="text" placeholder="例：代表取締役、営業マネージャー" value={form.position} onChange={set("position")} style={inputStyle} />
          </div>
        </div>

        {/* キャリア情報 */}
        <div style={cardStyle}>
          <p style={sectionLabel}>キャリア情報</p>

          <div style={fieldStyle}>
            <label style={labelStyle}>経験年数{requiredBadge}</label>
            <select value={form.experience} onChange={set("experience")} style={selectStyle}>
              <option value="">選択してください</option>
              {EXPERIENCE_OPTIONS.map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>

          <div style={{ ...fieldStyle, marginBottom: 0 }}>
            <label style={labelStyle}>年齢{requiredBadge}</label>
            <select value={form.age} onChange={set("age")} style={selectStyle}>
              <option value="">選択してください</option>
              {AGE_OPTIONS.map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
        </div>

        {/* プロフィール情報 */}
        <div style={cardStyle}>
          <p style={sectionLabel}>プロフィール情報（任意）</p>

          <div style={fieldStyle}>
            <label style={labelStyle}>既婚 / 独身{optionalBadge}</label>
            <div style={{ display: "flex", gap: "10px" }}>
              {["既婚", "独身"].map((v) => radioOption("maritalStatus", "maritalStatus", v))}
            </div>
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>子どもの有無{optionalBadge}</label>
            <div style={{ display: "flex", gap: "10px" }}>
              {["あり", "なし"].map((v) => radioOption("hasChildren", "hasChildren", v))}
            </div>
          </div>

          <div style={{ ...fieldStyle, marginBottom: 0 }}>
            <label style={labelStyle}>住まいの地域{optionalBadge}</label>
            <select value={form.region} onChange={set("region")} style={selectStyle}>
              <option value="">選択してください</option>
              {REGIONS.map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
        </div>

        {/* エラー表示 */}
        {error && (
          <div style={{ background: "rgba(220,53,69,0.12)", border: "1px solid rgba(220,53,69,0.4)", borderRadius: "8px", padding: "12px 14px", marginBottom: "1rem" }}>
            <p style={{ fontSize: "13px", color: "#FF6B6B", margin: 0 }}>{error}</p>
          </div>
        )}

        {/* 送信ボタン */}
        <button
          type="submit"
          disabled={!isValid || loading}
          style={{
            width: "100%",
            padding: "15px 24px",
            background: isValid && !loading ? GOLD : "#2A2A2A",
            color: isValid && !loading ? "#0C0C0C" : TEXT_SECONDARY,
            border: "none",
            borderRadius: "10px",
            fontSize: "15px",
            fontWeight: 700,
            cursor: isValid && !loading ? "pointer" : "not-allowed",
            transition: "all 0.15s ease",
            letterSpacing: "0.02em",
          }}
        >
          {loading ? "登録中..." : "登録して診断結果を保存する"}
        </button>

        <p style={{ textAlign: "center", fontSize: "11px", color: TEXT_SECONDARY, marginTop: "12px" }}>
          ※ 入力情報は診断精度の向上にのみ使用します
        </p>
      </form>
    </div>
  );
}

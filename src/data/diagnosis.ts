import type { AxisScores, DiagnosisResult } from "../types";

export function diagnoseType(axisScores: AxisScores, total: number): DiagnosisResult {
  const av = axisScores.action_volume;
  const cf = axisScores.contact_frequency;
  const rl = axisScores.relationship;
  const rr = axisScores.response_rate;
  const rc = axisScores.result_connection;

  if (av < 40) {
    return {
      type: "行動不足型",
      bottleneck: "アクション数が不足しています",
      color: "#A32D2D",
      bg: "#FCEBEB",
      improvements: ["1日5件以上の接触行動を目標にする","行動ログをつけて可視化する","まず数を増やすことを優先する"],
      actions: ["明日から1日3件アプローチする","週次で行動量を振り返る","リストを30件書き出す"],
    };
  }
  if (av >= 70 && rc < 45) {
    return {
      type: "やり方改善型",
      bottleneck: "行動量は十分ですが結果に繋がっていません",
      color: "#854F0B",
      bg: "#FAEEDA",
      improvements: ["ターゲットの絞り込みと再設計","アプローチ内容をパーソナライズする","成功事例を分析して再現する"],
      actions: ["成約事例を3件書き出し共通点を探す","ターゲットペルソナを言語化する","アプローチ文のABテストをする"],
    };
  }
  if (cf < 50) {
    return {
      type: "関係継続不足型",
      bottleneck: "接触頻度が低く出会いが関係として続いていません",
      color: "#185FA5",
      bg: "#E6F1FB",
      improvements: ["定期フォローアップの仕組みを作る","接触リストを月次でチェックする","リマインダーで継続的に連絡する"],
      actions: ["今週1件過去の知人に連絡する","月1回の近況報告を型化する","スプレッドシートで管理を始める"],
    };
  }
  if (rl < 50 || rr < 45) {
    return {
      type: "ターゲット再設計型",
      bottleneck: "連絡内容や相手との相性が合っていない可能性があります",
      color: "#3B6D11",
      bg: "#EAF3DE",
      improvements: ["相手本位のコミュニケーションに変える","ターゲット層を見直す","メッセージを相手に合わせてカスタマイズする"],
      actions: ["次の連絡で相手への質問を入れる","ターゲット外への時間を減らす","反応が良かった人の共通点を探す"],
    };
  }
  if (total >= 70) {
    return {
      type: "継続導線不足型",
      bottleneck: "全体的に良好ですが継続的な収益導線が弱い状態です",
      color: "#0F6E56",
      bg: "#E1F5EE",
      improvements: ["既存客へのフォローを強化する","紹介が発生しやすい仕組みを設計する","継続サービスを追加する"],
      actions: ["既存クライアントに近況確認の連絡を入れる","紹介特典を設計する","LTV視点でサービスを再設計する"],
    };
  }
  return {
    type: "バランス改善型",
    bottleneck: "複数の軸で改善余地があります",
    color: "#534AB7",
    bg: "#EEEDFE",
    improvements: ["行動量と関係構築を同時に見直す","1つの軸に絞って集中改善する","定期的に診断を再実施する"],
    actions: ["最もスコアが低い軸に今週フォーカスする","週1回の振り返りタイムを設定する","仲間にフィードバックをもらう"],
  };
}
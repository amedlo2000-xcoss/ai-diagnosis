import type { Question, UserType } from "../types";

const freelanceQuestions: Question[] = [
  {
    id: 1,
    text: "1週間で新規クライアントへのアプローチを何件していますか？",
    axis: "action_volume",
    options: [
      { label: "0件", score: 10 },
      { label: "1〜3件", score: 40 },
      { label: "4〜8件", score: 70 },
      { label: "9件以上", score: 100 },
    ],
  },
  {
    id: 2,
    text: "ポートフォリオや実績ページの更新頻度は？",
    axis: "action_volume",
    options: [
      { label: "ほぼ更新しない", score: 10 },
      { label: "3ヶ月に1回", score: 40 },
      { label: "月1回", score: 70 },
      { label: "週1回以上", score: 100 },
    ],
  },
  {
    id: 3,
    text: "自分のスキルや単価を見直す頻度は？",
    axis: "action_volume",
    options: [
      { label: "ほとんどしない", score: 10 },
      { label: "年1回", score: 40 },
      { label: "半年に1回", score: 70 },
      { label: "四半期に1回以上", score: 100 },
    ],
  },
  {
    id: 4,
    text: "既存クライアントへのフォロー連絡の頻度は？",
    axis: "contact_frequency",
    options: [
      { label: "ほぼしない", score: 10 },
      { label: "依頼が来た時だけ", score: 40 },
      { label: "月1回程度", score: 70 },
      { label: "月複数回", score: 100 },
    ],
  },
  {
    id: 5,
    text: "案件終了後のクライアントへのフォローアップは？",
    axis: "contact_frequency",
    options: [
      { label: "特にしない", score: 10 },
      { label: "お礼のみ送る", score: 40 },
      { label: "定期的に近況を共有する", score: 80 },
      { label: "次の提案を積極的にする", score: 100 },
    ],
  },
  {
    id: 6,
    text: "提案時に相手のニーズに合わせたカスタマイズをしていますか？",
    axis: "relationship",
    options: [
      { label: "テンプレートをそのまま使う", score: 20 },
      { label: "少し変える程度", score: 50 },
      { label: "しっかりカスタマイズする", score: 80 },
      { label: "相手の課題を深く理解して提案する", score: 100 },
    ],
  },
  {
    id: 7,
    text: "提案・見積もりの成約率はどのくらいですか？",
    axis: "response_rate",
    options: [
      { label: "10%未満", score: 10 },
      { label: "10〜30%", score: 40 },
      { label: "30〜50%", score: 70 },
      { label: "50%以上", score: 100 },
    ],
  },
  {
    id: 8,
    text: "問い合わせや依頼への返信スピードは？",
    axis: "response_rate",
    options: [
      { label: "2日以上", score: 10 },
      { label: "翌日", score: 40 },
      { label: "当日", score: 80 },
      { label: "1時間以内", score: 100 },
    ],
  },
  {
    id: 9,
    text: "月の安定した収入源（継続案件等）はいくつありますか？",
    axis: "result_connection",
    options: [
      { label: "0", score: 10 },
      { label: "1つ", score: 40 },
      { label: "2〜3つ", score: 75 },
      { label: "4つ以上", score: 100 },
    ],
  },
  {
    id: 10,
    text: "リピート・紹介からの売上比率は？",
    axis: "result_connection",
    options: [
      { label: "ほぼない", score: 10 },
      { label: "30%未満", score: 40 },
      { label: "30〜60%", score: 70 },
      { label: "60%以上", score: 100 },
    ],
  },
];

const soleProprietorQuestions: Question[] = [
  {
    id: 1,
    text: "月の新規集客活動（SNS・広告・チラシ等）の頻度は？",
    axis: "action_volume",
    options: [
      { label: "ほぼしていない", score: 10 },
      { label: "月1〜2回", score: 40 },
      { label: "週1〜2回", score: 70 },
      { label: "ほぼ毎日", score: 100 },
    ],
  },
  {
    id: 2,
    text: "自社サービスや商品の見直し・改善頻度は？",
    axis: "action_volume",
    options: [
      { label: "年1回以下", score: 10 },
      { label: "半年に1回", score: 40 },
      { label: "四半期に1回", score: 70 },
      { label: "毎月", score: 100 },
    ],
  },
  {
    id: 3,
    text: "売上・客数・リピート率などの数値を確認する頻度は？",
    axis: "action_volume",
    options: [
      { label: "ほぼ確認しない", score: 10 },
      { label: "年に数回", score: 35 },
      { label: "月1回", score: 65 },
      { label: "週1回以上", score: 100 },
    ],
  },
  {
    id: 4,
    text: "既存顧客へのフォロー・DM・メールの頻度は？",
    axis: "contact_frequency",
    options: [
      { label: "ほぼしない", score: 10 },
      { label: "特別なお知らせの時だけ", score: 40 },
      { label: "月1〜2回", score: 70 },
      { label: "週1回以上", score: 100 },
    ],
  },
  {
    id: 5,
    text: "地域コミュニティや業界ネットワークへの参加頻度は？",
    axis: "contact_frequency",
    options: [
      { label: "ほぼ参加しない", score: 10 },
      { label: "年に数回", score: 35 },
      { label: "月1回", score: 65 },
      { label: "月複数回", score: 90 },
    ],
  },
  {
    id: 6,
    text: "顧客とのコミュニケーションの質はどうですか？",
    axis: "relationship",
    options: [
      { label: "商品・サービスの案内のみ", score: 20 },
      { label: "時々個人的に話す", score: 50 },
      { label: "定期的に顧客の状況を聞いている", score: 80 },
      { label: "顧客の課題解決パートナーになっている", score: 100 },
    ],
  },
  {
    id: 7,
    text: "集客施策（広告・宣伝）への反応率はどうですか？",
    axis: "response_rate",
    options: [
      { label: "非常に低い", score: 10 },
      { label: "やや低い", score: 40 },
      { label: "普通", score: 65 },
      { label: "高い", score: 90 },
    ],
  },
  {
    id: 8,
    text: "顧客からの口コミや紹介は発生していますか？",
    axis: "response_rate",
    options: [
      { label: "ほぼない", score: 10 },
      { label: "たまにある", score: 45 },
      { label: "月1〜2件", score: 70 },
      { label: "頻繁にある", score: 100 },
    ],
  },
  {
    id: 9,
    text: "月の売上の安定性は？",
    axis: "result_connection",
    options: [
      { label: "毎月大きく変動する", score: 10 },
      { label: "やや不安定", score: 40 },
      { label: "比較的安定", score: 70 },
      { label: "安定して成長している", score: 100 },
    ],
  },
  {
    id: 10,
    text: "ビジネスの最大の課題は何ですか？",
    axis: "result_connection",
    options: [
      { label: "新規集客できない", score: 20 },
      { label: "単価が低い", score: 35 },
      { label: "リピーターが少ない", score: 45 },
      { label: "利益率が低い", score: 50 },
      { label: "人手・時間が足りない", score: 55 },
    ],
  },
];

const sidehustleQuestions: Question[] = [
  {
    id: 1,
    text: "副業のために週何時間を確保していますか？",
    axis: "action_volume",
    options: [
      { label: "1時間未満", score: 10 },
      { label: "1〜3時間", score: 35 },
      { label: "3〜8時間", score: 65 },
      { label: "8時間以上", score: 100 },
    ],
  },
  {
    id: 2,
    text: "副業の新規集客・営業活動の頻度は？",
    axis: "action_volume",
    options: [
      { label: "ほぼしていない", score: 10 },
      { label: "月1〜2回", score: 40 },
      { label: "週1〜2回", score: 70 },
      { label: "ほぼ毎日", score: 100 },
    ],
  },
  {
    id: 3,
    text: "副業のスキルアップや学習への投資頻度は？",
    axis: "action_volume",
    options: [
      { label: "ほぼしていない", score: 10 },
      { label: "気が向いた時", score: 35 },
      { label: "月1〜2回", score: 65 },
      { label: "週1回以上", score: 100 },
    ],
  },
  {
    id: 4,
    text: "副業関連のコミュニティや仲間との交流頻度は？",
    axis: "contact_frequency",
    options: [
      { label: "ほぼない", score: 10 },
      { label: "たまにある", score: 40 },
      { label: "月1〜2回", score: 70 },
      { label: "週1回以上", score: 90 },
    ],
  },
  {
    id: 5,
    text: "クライアント・顧客との連絡頻度は？",
    axis: "contact_frequency",
    options: [
      { label: "依頼がある時だけ", score: 20 },
      { label: "月1〜2回", score: 50 },
      { label: "週1回程度", score: 75 },
      { label: "ほぼ毎日", score: 100 },
    ],
  },
  {
    id: 6,
    text: "本業と副業のバランス管理はできていますか？",
    axis: "relationship",
    options: [
      { label: "本業に影響が出ている", score: 10 },
      { label: "やや無理をしている", score: 35 },
      { label: "問題なく両立できている", score: 70 },
      { label: "本業を活かしながら副業をしている", score: 100 },
    ],
  },
  {
    id: 7,
    text: "副業の案件・問い合わせへの対応スピードは？",
    axis: "response_rate",
    options: [
      { label: "2日以上かかる", score: 10 },
      { label: "翌日", score: 40 },
      { label: "当日", score: 75 },
      { label: "数時間以内", score: 100 },
    ],
  },
  {
    id: 8,
    text: "副業の成果（収入・スキル向上）の実感は？",
    axis: "response_rate",
    options: [
      { label: "ほぼ成果なし", score: 10 },
      { label: "少し成果あり", score: 40 },
      { label: "成果を実感している", score: 70 },
      { label: "大きな成果が出ている", score: 100 },
    ],
  },
  {
    id: 9,
    text: "副業の月収はどのくらいですか？",
    axis: "result_connection",
    options: [
      { label: "ほぼ0円", score: 10 },
      { label: "1〜3万円", score: 40 },
      { label: "3〜10万円", score: 70 },
      { label: "10万円以上", score: 100 },
    ],
  },
  {
    id: 10,
    text: "副業を続ける上で一番の課題は？",
    axis: "result_connection",
    options: [
      { label: "時間が取れない", score: 30 },
      { label: "集客できない", score: 25 },
      { label: "本業との両立が難しい", score: 40 },
      { label: "スキルが足りない", score: 35 },
      { label: "モチベーション維持", score: 45 },
    ],
  },
];

const solopreneurQuestions: Question[] = [
  {
    id: 1,
    text: "ビジネスの情報発信（SNS・ブログ・動画等）の頻度は？",
    axis: "action_volume",
    options: [
      { label: "ほぼしていない", score: 10 },
      { label: "週1〜2回", score: 40 },
      { label: "ほぼ毎日", score: 70 },
      { label: "毎日複数チャネルで発信", score: 100 },
    ],
  },
  {
    id: 2,
    text: "新規顧客獲得のための営業・マーケティング活動の頻度は？",
    axis: "action_volume",
    options: [
      { label: "ほぼしていない", score: 10 },
      { label: "月1〜2回", score: 40 },
      { label: "週1〜2回", score: 70 },
      { label: "ほぼ毎日", score: 100 },
    ],
  },
  {
    id: 3,
    text: "ビジネスの自動化・仕組み化への取り組みは？",
    axis: "action_volume",
    options: [
      { label: "ほとんどしていない", score: 10 },
      { label: "気が向いた時に改善する", score: 35 },
      { label: "定期的に仕組みを改善している", score: 70 },
      { label: "常に自動化・効率化を意識している", score: 100 },
    ],
  },
  {
    id: 4,
    text: "既存顧客・読者・フォロワーへの定期発信の頻度は？",
    axis: "contact_frequency",
    options: [
      { label: "ほぼしない", score: 10 },
      { label: "月1〜2回", score: 40 },
      { label: "週1〜2回", score: 70 },
      { label: "ほぼ毎日", score: 100 },
    ],
  },
  {
    id: 5,
    text: "顧客・見込み客との個別コミュニケーション頻度は？",
    axis: "contact_frequency",
    options: [
      { label: "問い合わせがあった時だけ", score: 20 },
      { label: "月1〜2回", score: 50 },
      { label: "週1回程度", score: 75 },
      { label: "ほぼ毎日", score: 100 },
    ],
  },
  {
    id: 6,
    text: "顧客との関係性はどのレベルですか？",
    axis: "relationship",
    options: [
      { label: "一度きりの取引が多い", score: 20 },
      { label: "リピートはあるが深い関係ではない", score: 45 },
      { label: "継続的な信頼関係がある", score: 75 },
      { label: "ファン・コミュニティが形成されている", score: 100 },
    ],
  },
  {
    id: 7,
    text: "コンテンツや提案へのエンゲージメント（反応・購買）率は？",
    axis: "response_rate",
    options: [
      { label: "非常に低い", score: 10 },
      { label: "やや低い", score: 40 },
      { label: "普通", score: 65 },
      { label: "高い", score: 90 },
    ],
  },
  {
    id: 8,
    text: "問い合わせ・購買・契約への転換率はどうですか？",
    axis: "response_rate",
    options: [
      { label: "ほぼ成約しない", score: 10 },
      { label: "10〜30%", score: 40 },
      { label: "30〜60%", score: 70 },
      { label: "60%以上", score: 100 },
    ],
  },
  {
    id: 9,
    text: "ソロビジネスの月収の安定性と成長は？",
    axis: "result_connection",
    options: [
      { label: "ほぼ収入なし", score: 10 },
      { label: "不安定・月ごとに大きく変動", score: 35 },
      { label: "比較的安定している", score: 65 },
      { label: "安定して成長している", score: 100 },
    ],
  },
  {
    id: 10,
    text: "ソロプレナーとして今一番の課題は？",
    axis: "result_connection",
    options: [
      { label: "集客・認知が足りない", score: 20 },
      { label: "単価・収益化が弱い", score: 30 },
      { label: "時間管理・効率化ができていない", score: 40 },
      { label: "サービスの差別化ができていない", score: 35 },
      { label: "継続収益の仕組みがない", score: 45 },
    ],
  },
];

export const questionsByType: Record<UserType, Question[]> = {
  freelance: freelanceQuestions,
  sole_proprietor: soleProprietorQuestions,
  side_hustle: sidehustleQuestions,
  solopreneur: solopreneurQuestions,
};

// 後方互換性のため既存のexportも残す
export const questions = freelanceQuestions;

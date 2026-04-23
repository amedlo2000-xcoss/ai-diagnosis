import type { AxisScores, DiagnosisResult, UserType } from "../types";

type DiagnosisConfig = {
  bottleneck: string;
  improvements: string[];
  actions: string[];
};

type DiagnosisTypeConfig = {
  type: string;
  color: string;
  bg: string;
  byUserType: Record<UserType, DiagnosisConfig>;
};

const DIAGNOSIS_TYPES: DiagnosisTypeConfig[] = [
  {
    type: "行動不足型",
    color: "#A32D2D",
    bg: "#FCEBEB",
    byUserType: {
      freelance: {
        bottleneck: "案件獲得へのアプローチ量が不足しています",
        improvements: [
          "週に最低3件の新規クライアントへの提案を目標にする",
          "ポートフォリオを月1回は更新する",
          "クラウドソーシングや紹介依頼を並行して動かす",
        ],
        actions: [
          "今週中に5件の見込みクライアントをリストアップする",
          "ポートフォリオに最新の実績を1件追加する",
          "知人に「案件を探している」と伝えてみる",
        ],
      },
      sole_proprietor: {
        bottleneck: "集客・宣伝活動のアクションが不足しています",
        improvements: [
          "週2回以上のSNS投稿や情報発信を習慣化する",
          "月1回はチラシ・広告・イベント出展などの施策を試す",
          "既存顧客へのリマインド連絡を定期的に行う",
        ],
        actions: [
          "今週中にSNSアカウントのプロフィールを見直す",
          "既存顧客リストを整理して20名に近況連絡を送る",
          "新しい集客チャネルを1つ試してみる",
        ],
      },
      side_hustle: {
        bottleneck: "副業への行動量・時間投資が不足しています",
        improvements: [
          "副業専用の時間ブロックを週のスケジュールに確保する",
          "小さなアクションでも毎日1つ副業に関連する行動をする",
          "副業の目標を数値で設定して週次で進捗を確認する",
        ],
        actions: [
          "今週から週3時間以上の副業時間を確保してカレンダーに入れる",
          "副業の目標月収を決めて逆算した行動計画を立てる",
          "副業のSNSアカウントか掲載プロフィールを整備する",
        ],
      },
      solopreneur: {
        bottleneck: "情報発信・集客・営業のアクション量が不足しています",
        improvements: [
          "SNS・ブログ・動画など発信頻度を週3回以上に増やす",
          "毎週1つの新規顧客獲得施策（広告・DM・コンテンツ等）を実施する",
          "ビジネスの自動化ツールを1つ導入して時間を確保する",
        ],
        actions: [
          "今週から毎日1投稿のSNS発信をカレンダーに入れる",
          "メルマガかLINE公式など見込み客リストを構築する仕組みを作る",
          "Zapier・Notionなど自動化ツールを1つ試してみる",
        ],
      },
    },
  },
  {
    type: "やり方改善型",
    color: "#854F0B",
    bg: "#FAEEDA",
    byUserType: {
      freelance: {
        bottleneck: "行動量は十分ですが提案内容や方向性が結果に繋がっていません",
        improvements: [
          "過去の成約事例と失注事例を比較して差異を言語化する",
          "クライアントのニーズに合わせた提案書のカスタマイズを徹底する",
          "単価・ターゲット・専門領域の絞り込みを再検討する",
        ],
        actions: [
          "成約した案件3件の共通点を書き出す",
          "次の提案書はターゲットの課題から書き始める",
          "専門分野を1つに絞ったプロフィール文を作成する",
        ],
      },
      sole_proprietor: {
        bottleneck: "集客活動は動いていますが売上に繋がっていません",
        improvements: [
          "反応が取れているチャネルと取れていないチャネルを分析する",
          "提供サービスの価値訴求を顧客目線で見直す",
          "成約に繋がりやすい顧客層のペルソナを再設計する",
        ],
        actions: [
          "直近3ヶ月の新規顧客の獲得チャネルを集計する",
          "競合と自社のサービスを比較して差別化ポイントを言語化する",
          "最も成果が出ているターゲット層に集中する施策を考える",
        ],
      },
      side_hustle: {
        bottleneck: "動いているが副業の成果に繋がっていません",
        improvements: [
          "副業のターゲット・サービス内容を見直して方向性を絞る",
          "成果が出ている副業者の事例を研究してやり方を参考にする",
          "アプローチ方法や価格設定を小さく変えてテストする",
        ],
        actions: [
          "副業で成果が出ている人のやり方を1つ真似てみる",
          "サービス内容か価格設定を1点変えてA/Bテストする",
          "副業のターゲットを絞り込んで特化型にする",
        ],
      },
      solopreneur: {
        bottleneck: "発信・行動量は多いが収益や成約に繋がっていません",
        improvements: [
          "コンテンツのターゲットを絞り込み、誰に向けた発信かを明確にする",
          "成果が出ているコンテンツ・施策を分析して集中投資する",
          "価値訴求を見直し、購買・契約に直結するオファーを設計する",
        ],
        actions: [
          "直近30日間で最も反応が良かったコンテンツの共通点を書き出す",
          "ターゲット顧客のペルソナを具体的に1人設定して発信内容を見直す",
          "既存顧客にアップセル・継続提案を1件してみる",
        ],
      },
    },
  },
  {
    type: "関係継続不足型",
    color: "#185FA5",
    bg: "#E6F1FB",
    byUserType: {
      freelance: {
        bottleneck: "クライアントとの関係が案件単位で終わっており継続・紹介に繋がっていません",
        improvements: [
          "案件終了後の定期フォローアップの仕組みを作る",
          "既存クライアントとの関係を継続する仕組み（月次レポート・近況共有等）を設計する",
          "過去クライアントへの定期的な近況報告・価値提供を習慣化する",
        ],
        actions: [
          "過去のクライアントリストを整理して今週1件フォロー連絡を入れる",
          "案件終了後のフォローテンプレートを作成する",
          "月1回の「お役立ち情報」送付を習慣化する",
        ],
      },
      sole_proprietor: {
        bottleneck: "顧客との接点が薄く、一度来た顧客がリピートしていません",
        improvements: [
          "来店・購入後のフォローアップ連絡の仕組みを作る",
          "定期的なニュースレターやLINE配信で接触頻度を上げる",
          "顧客情報を管理して誕生日・記念日などの個人連絡を活用する",
        ],
        actions: [
          "顧客リストを整理してフォローアップが必要な人を20人ピックアップする",
          "既存顧客向けのLINE公式アカウントやメルマガを始める",
          "リピート促進の特典・仕組みを1つ設計する",
        ],
      },
      side_hustle: {
        bottleneck: "副業のコミュニティや顧客との継続的な関係が薄い状態です",
        improvements: [
          "副業関連のコミュニティに定期参加して仲間を作る",
          "クライアントへの定期フォローアップを仕組み化する",
          "副業の学びや進捗をSNSで発信して関係を継続する",
        ],
        actions: [
          "副業関連のオンラインコミュニティに1つ入会・参加する",
          "過去のクライアントに近況報告を兼ねた連絡を1件送る",
          "週1回のSNS発信ルーティンを作る",
        ],
      },
      solopreneur: {
        bottleneck: "顧客・読者との接触頻度が低く関係が継続していません",
        improvements: [
          "メルマガ・SNS・コミュニティなど継続接触の仕組みを整備する",
          "顧客リストを整理して定期フォローアップの習慣を作る",
          "既存顧客への価値提供を月1回以上の頻度で設計する",
        ],
        actions: [
          "メールマガジンまたはLINE公式の配信を今週から始める",
          "過去に購入・問い合わせをした顧客リストを整理して近況連絡を送る",
          "月1回の「限定コンテンツ・お役立ち情報」配信を習慣化する",
        ],
      },
    },
  },
  {
    type: "ターゲット再設計型",
    color: "#3B6D11",
    bg: "#EAF3DE",
    byUserType: {
      freelance: {
        bottleneck: "アプローチしている相手や提案内容が自分の強みとマッチしていません",
        improvements: [
          "自分が最も価値を発揮できるクライアントの像を再定義する",
          "得意領域に特化したポートフォリオ・プロフィールに絞り込む",
          "反応が良かったクライアントの共通点を分析してターゲットを再設計する",
        ],
        actions: [
          "過去のクライアントで「また一緒に働きたい」人を3人書き出す",
          "その共通点を元にターゲットペルソナを文章で書く",
          "ポートフォリオをそのターゲット向けに書き直す",
        ],
      },
      sole_proprietor: {
        bottleneck: "ターゲット顧客やアプローチ方法が現在の顧客と合っていません",
        improvements: [
          "最もリピートしてくれる顧客層の特徴を言語化する",
          "集客メッセージをその顧客層の言葉で書き直す",
          "集客チャネルをターゲット層が実際にいる場所に絞り込む",
        ],
        actions: [
          "リピート顧客の共通属性（年代・職業・悩み）を分析する",
          "それに合わせてSNSプロフィールかチラシ文面を修正する",
          "ターゲット外の施策に使っている時間・費用を削減する",
        ],
      },
      side_hustle: {
        bottleneck: "副業のターゲットや提供価値が相手のニーズと合っていません",
        improvements: [
          "副業で狙うターゲットを絞り込んで専門性を前面に出す",
          "本業のスキルと副業を掛け合わせた独自の価値提案を設計する",
          "需要があるが自分が提供できるサービスを改めて洗い出す",
        ],
        actions: [
          "副業サービスを「誰の・どんな悩みを・どう解決するか」で書き直す",
          "本業経験を活かせる副業ジャンルを3つ書き出す",
          "ターゲット層が集まるSNSや場所を1つリサーチする",
        ],
      },
      solopreneur: {
        bottleneck: "発信・サービスのターゲットが曖昧でエンゲージメントや成約率が低い",
        improvements: [
          "発信するコンテンツのターゲット顧客像を1人に絞り込む",
          "提供サービス・商品の価値訴求を顧客が抱える悩みベースで書き直す",
          "反応が良い発信テーマ・媒体に集中してリソースを投下する",
        ],
        actions: [
          "理想顧客のペルソナを「職業・悩み・求める結果」で1枚にまとめる",
          "サービス説明文をその顧客の言葉・視点で書き直す",
          "最も反応が取れているSNSか媒体に発信を集中する",
        ],
      },
    },
  },
  {
    type: "継続導線不足型",
    color: "#0F6E56",
    bg: "#E1F5EE",
    byUserType: {
      freelance: {
        bottleneck: "スキルと実績は高いが継続収益・安定案件への導線が弱い",
        improvements: [
          "月額・継続型サービスの設計を検討する",
          "既存クライアントへのアップセル・追加提案を仕組み化する",
          "紹介が発生しやすい仕組みとインセンティブを設計する",
        ],
        actions: [
          "継続・顧問型サービスのプランを1つ作成する",
          "既存クライアント3社に追加提案をする",
          "紹介特典を設計して信頼できるクライアントに伝える",
        ],
      },
      sole_proprietor: {
        bottleneck: "集客はできているがリピート・継続収益への導線が弱い",
        improvements: [
          "定期購入・会員制サービスの導入を検討する",
          "既存顧客のLTVを高めるフォローアップ施策を設計する",
          "紹介が発生しやすい顧客体験と特典を設計する",
        ],
        actions: [
          "月額制・定期購入プランを1つ設計する",
          "既存の上位顧客へのVIP特典や優先サービスを考える",
          "紹介制度を作って常連顧客に案内する",
        ],
      },
      side_hustle: {
        bottleneck: "副業の実績は出始めているが安定収入への転換が弱い",
        improvements: [
          "単発案件から継続・月額型への移行を意識的に設計する",
          "副業収入を本業並みに安定させるための目標設計をする",
          "副業から独立・拡大を視野に入れたロードマップを作る",
        ],
        actions: [
          "現在のクライアントに継続契約の提案をする",
          "副業の月収目標と達成までのステップを書き出す",
          "副業を拡大するために必要なスキル・リソースをリストアップする",
        ],
      },
      solopreneur: {
        bottleneck: "発信・集客は順調だが継続収益への仕組みが弱い",
        improvements: [
          "サブスク・月額制・会員制など継続課金の商品設計を検討する",
          "既存顧客へのアップセル・クロスセルの導線を設計する",
          "コンテンツやサービスのストック型資産化を進める",
        ],
        actions: [
          "月額制・定期購読型のサービスプランを1つ設計する",
          "既存顧客に継続・追加サービスの提案メッセージを送る",
          "動画・記事・テンプレートなど繰り返し売れるコンテンツを1つ作る",
        ],
      },
    },
  },
];

const BALANCE_DIAGNOSIS: Omit<DiagnosisTypeConfig, "type"> & { type: string } = {
  type: "バランス改善型",
  color: "#534AB7",
  bg: "#EEEDFE",
  byUserType: {
    freelance: {
      bottleneck: "複数の軸で改善余地があります",
      improvements: [
        "行動量と関係構築を同時に見直す",
        "最もスコアが低い軸に集中して改善する",
        "定期的に診断を再実施して変化を確認する",
      ],
      actions: [
        "最もスコアが低い軸に今週フォーカスする",
        "週1回の振り返りタイムを設定する",
        "フリーランス仲間にフィードバックをもらう",
      ],
    },
    sole_proprietor: {
      bottleneck: "複数の軸で改善余地があります",
      improvements: [
        "集客・顧客関係・収益安定を総合的に見直す",
        "最も課題の大きい軸から優先して改善する",
        "月次でKPIを確認しながら改善サイクルを回す",
      ],
      actions: [
        "最もスコアが低い軸に今週フォーカスする",
        "月次の数値確認と改善アクションの習慣を作る",
        "同業者や仲間に現状を話してアドバイスをもらう",
      ],
    },
    side_hustle: {
      bottleneck: "複数の軸で改善余地があります",
      improvements: [
        "時間・行動量・成果のバランスを見直す",
        "最も影響が大きい1つの軸を集中改善する",
        "本業への影響を確認しながら無理なく継続する",
      ],
      actions: [
        "最もスコアが低い軸に今週フォーカスする",
        "副業の週次振り返りを15分でも習慣化する",
        "副業仲間や先輩にアドバイスをもらう",
      ],
    },
    solopreneur: {
      bottleneck: "複数の軸で改善余地があります",
      improvements: [
        "発信・集客・収益化の仕組みを総合的に見直す",
        "最もスコアが低い軸に集中して改善する",
        "定期的に診断を再実施して変化を確認する",
      ],
      actions: [
        "最もスコアが低い軸に今週フォーカスする",
        "週1回の事業振り返りタイムを設定する",
        "ソロプレナー仲間やメンターにフィードバックをもらう",
      ],
    },
  },
};

export function diagnoseType(
  axisScores: AxisScores,
  total: number,
  userType: UserType = "freelance"
): DiagnosisResult {
  const av = axisScores.action_volume;
  const cf = axisScores.contact_frequency;
  const rl = axisScores.relationship;
  const rr = axisScores.response_rate;
  const rc = axisScores.result_connection;

  let config: DiagnosisTypeConfig | null = null;

  if (av < 40) {
    config = DIAGNOSIS_TYPES[0]; // 行動不足型
  } else if (av >= 70 && rc < 45) {
    config = DIAGNOSIS_TYPES[1]; // やり方改善型
  } else if (cf < 50) {
    config = DIAGNOSIS_TYPES[2]; // 関係継続不足型
  } else if (rl < 50 || rr < 45) {
    config = DIAGNOSIS_TYPES[3]; // ターゲット再設計型
  } else if (total >= 70) {
    config = DIAGNOSIS_TYPES[4]; // 継続導線不足型
  }

  if (config) {
    const detail = config.byUserType[userType];
    return {
      type: config.type,
      bottleneck: detail.bottleneck,
      color: config.color,
      bg: config.bg,
      improvements: detail.improvements,
      actions: detail.actions,
    };
  }

  const detail = BALANCE_DIAGNOSIS.byUserType[userType];
  return {
    type: BALANCE_DIAGNOSIS.type,
    bottleneck: detail.bottleneck,
    color: BALANCE_DIAGNOSIS.color,
    bg: BALANCE_DIAGNOSIS.bg,
    improvements: detail.improvements,
    actions: detail.actions,
  };
}

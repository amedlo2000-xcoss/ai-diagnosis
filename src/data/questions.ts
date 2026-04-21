import type { Question } from "../types";

export const questions: Question[] = [
  {id:1,text:"1日に営業・発信・接触行動はどれくらいしていますか？",axis:"action_volume",options:[{label:"0〜1件",score:10},{label:"2〜5件",score:40},{label:"6〜10件",score:70},{label:"10件以上",score:100}]},
  {id:2,text:"1週間で新規の人にアプローチする回数は？",axis:"action_volume",options:[{label:"0〜5件",score:10},{label:"6〜20件",score:40},{label:"21〜50件",score:75},{label:"50件以上",score:100}]},
  {id:3,text:"1ヶ月の総アクション量はどれくらいですか？",axis:"action_volume",options:[{label:"50件未満",score:10},{label:"50〜150件",score:40},{label:"150〜300件",score:75},{label:"300件以上",score:100}]},
  {id:4,text:"人脈づくりは主にどこで行っていますか？",axis:"contact_frequency",options:[{label:"交流会（定期参加）",score:80},{label:"紹介（知人・クライアント）",score:90},{label:"マルシェ・イベント",score:70},{label:"SNS・オンライン",score:60},{label:"特にしていない",score:10}]},
  {id:5,text:"知り合った人にどのくらい連絡していますか？",axis:"contact_frequency",options:[{label:"定期的に自分から連絡する",score:90},{label:"相手から来た時だけ返信",score:40},{label:"ほぼ連絡しない",score:10}]},
  {id:6,text:"連絡内容はどれに近いですか？",axis:"relationship",options:[{label:"挨拶・日常・相手に合わせた内容",score:90},{label:"自分の仕事・実績の話が中心",score:40},{label:"イベント・お知らせのみ",score:30}]},
  {id:7,text:"連絡した際の反応はどれに近いですか？",axis:"response_rate",options:[{label:"高い（ほぼ返信がある）",score:90},{label:"普通（半分くらい）",score:55},{label:"低い（あまり返信がない）",score:20}]},
  {id:8,text:"直近1ヶ月の結果は？",axis:"result_connection",options:[{label:"問い合わせ・成約ともにある",score:100},{label:"問い合わせはあるが成約少ない",score:50},{label:"ほぼない",score:10}]},
  {id:9,text:"リピートや紹介は発生していますか？",axis:"result_connection",options:[{label:"よくある",score:100},{label:"時々ある",score:55},{label:"ほぼない",score:10}]},
  {id:10,text:"今一番の課題はどれですか？",axis:"result_connection",options:[{label:"集客できない",score:20},{label:"売上に繋がらない",score:35},{label:"継続しない",score:40},{label:"時間がない",score:50},{label:"やり方が分からない",score:45}]},
];
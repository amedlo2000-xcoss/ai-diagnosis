import { DiagnosisAnswers, AxisScore, GeneratedCopy } from '../types';

function getAreaHint(answers: DiagnosisAnswers): string {
  const q1 = answers[1] ?? 2;
  if (q1 === 0) return '駅徒歩3分以内の好立地';
  if (q1 === 1) return '駅から徒歩圏内';
  if (q1 === 2) return '落ち着いた住宅街';
  return '駐車場完備の郊外';
}

function getReasonHint(answers: DiagnosisAnswers): string {
  const q2 = answers[2] ?? 2;
  if (q2 === 0) return 'わざわざ足を運ぶ価値のある';
  if (q2 === 1) return '独自のこだわりを持つ';
  return 'あなたのニーズに応える';
}

function getTargetHint(answers: DiagnosisAnswers): string {
  const q6 = answers[6] ?? 2;
  if (q6 === 0) return '明確なターゲット層に向けた';
  if (q6 === 1) return '幅広い層に対応した';
  return '多様なニーズに応える';
}

function getSceneHint(answers: DiagnosisAnswers): string {
  const q7 = answers[7] ?? 2;
  if (q7 === 0) return '特別な目的・日常使い・記念日など多彩なシーンで';
  if (q7 === 1) return 'さまざまなシーンで';
  return 'あらゆる場面で';
}

function getDiffHint(answers: DiagnosisAnswers): string {
  const q9 = answers[9] ?? 2;
  if (q9 === 0) return '他店にはない独自の強みを持ち';
  if (q9 === 1) return '独自のサービスで差別化を図り';
  return '地域に根ざした';
}

export function generateCopy(answers: DiagnosisAnswers, axisScores: AxisScore[]): GeneratedCopy {
  const area = getAreaHint(answers);
  const reason = getReasonHint(answers);
  const target = getTargetHint(answers);
  const scene = getSceneHint(answers);
  const diff = getDiffHint(answers);

  const hp = `【HP用紹介文】
${area}に位置する私たちのお店は、${reason}空間をご提供しています。
${target}サービスで、${scene}ご利用いただけます。
${diff}、お客様一人ひとりに寄り添った体験をお届けします。
「なぜこのお店に来るのか」—その答えが、ここにあります。`;

  const google = `【Googleビジネスプロフィール用】
${area}｜${reason}お店です。
${target}サービスを提供し、${scene}お選びいただいています。
${diff}、地域のお客様から高い評価をいただいています。
ぜひ一度、足をお運びください。`;

  const sns = `【SNSプロフィール用】
📍 ${area}
✨ ${reason}お店
👥 ${target}サービス
🎯 ${diff}差別化された体験をお届けします
#AI検索最適化 #選ばれる理由 #地域密着`;

  return { hp, google, sns };
}

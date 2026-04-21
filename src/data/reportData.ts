import { AxisScores, DiagnosisResult, AIScore } from "../types";
import { AXIS_KEYS, AXIS_LABELS } from "./scoring";
import { calcAIAverage } from "./aiScores";

// レポート用のデータをまとめる
export interface ReportData {
  totalScore: number;
  axisScores: AxisScores;
  diagnosis: DiagnosisResult;
  aiScores: AIScore[];
  commonInsight: string;
}

// レポートデータを生成する
export function generateReportData(
  totalScore: number,
  axisScores: AxisScores,
  diagnosis: DiagnosisResult,
  aiScores: AIScore[]
): ReportData {
  return {
    totalScore,
    axisScores,
    diagnosis,
    aiScores,
    commonInsight:
      "3つのAIモデルが共通して指摘しているのは「行動量と成果の間にある変換効率の問題」です。接触数を増やすだけでなく、質と継続性を組み合わせたアプローチが有効とされています。",
  };
}

// Googleスプレッドシート連携用にデータをJSON化する（将来の拡張ポイント）
export function exportToSheetFormat(report: ReportData) {
  return {
    totalScore: report.totalScore,
    diagnosisType: report.diagnosis.type,
    ...AXIS_KEYS.reduce((acc, key) => {
      acc[AXIS_LABELS[key]] = report.axisScores[key];
      return acc;
    }, {} as Record<string, number>),
    ...report.aiScores.reduce((acc, ai) => {
      acc[`AI_${ai.name}`] = calcAIAverage(ai);
      return acc;
    }, {} as Record<string, number>),
  };
}
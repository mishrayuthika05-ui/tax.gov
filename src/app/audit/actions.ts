'use server';

import { auditRiskAnalysis, type AuditRiskAnalysisInput } from '@/ai/flows/audit-risk-analysis';

export async function runAuditAnalysis(input: AuditRiskAnalysisInput) {
  try {
    const result = await auditRiskAnalysis(input);
    return result;
  } catch (error) {
    console.error('Audit risk analysis failed:', error);
    throw new Error('Failed to run AI analysis. Please check the logs.');
  }
}

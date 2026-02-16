'use server';
/**
 * @fileOverview An AI tool for analyzing tax returns and identifying high-risk cases for audit.
 *
 * - auditRiskAnalysis - A function that handles the tax return risk analysis process.
 * - AuditRiskAnalysisInput - The input type for the auditRiskAnalysis function.
 * - AuditRiskAnalysisOutput - The return type for the auditRiskAnalysis function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AuditRiskAnalysisInputSchema = z.object({
  taxpayerId: z.string().describe('Unique identifier for the taxpayer (e.g., PAN).'),
  taxYear: z.string().describe('The tax year for which the return was filed (e.g., "2023-2024").'),
  incomeReported: z.number().describe('The total income reported by the taxpayer.'),
  deductionsClaimed: z.number().describe('The total deductions claimed by the taxpayer.'),
  taxPaid: z.number().describe('The actual tax paid by the taxpayer.'),
  industryType: z.string().optional().describe('The type of industry the taxpayer operates in, if applicable.'),
  filingDate: z.string().datetime().describe('The date the tax return was filed in ISO 8601 format.'),
  previousAuditStatus: z.enum(['None', 'Audited_NoIssues', 'Audited_IssuesFound']).optional().describe('Status of previous audits for this taxpayer.'),
  averageDeductionsForIndustry: z.number().optional().describe('Average deductions claimed in the same industry for comparison.'),
  averageTaxPaidForIncomeBracket: z.number().optional().describe('Average tax paid for taxpayers in a similar income bracket.'),
});
export type AuditRiskAnalysisInput = z.infer<typeof AuditRiskAnalysisInputSchema>;

const AuditRiskAnalysisOutputSchema = z.object({
  isHighRisk: z.boolean().describe('True if the tax return is identified as high-risk for audit.'),
  riskScore: z.number().min(0).max(100).describe('A numerical score indicating the risk level (0-100, higher is riskier).'),
  riskReasons: z.array(z.string()).describe('A list of specific anomalies or patterns that contribute to the high-risk assessment.'),
  summaryOfAnomalies: z.string().describe('A detailed summary explaining the identified anomalies, patterns, and potential compliance history issues.'),
  recommendedAction: z.string().describe('Recommended action for this tax return (e.g., "Full Audit", "Compliance Review", "Monitor Only").'),
});
export type AuditRiskAnalysisOutput = z.infer<typeof AuditRiskAnalysisOutputSchema>;

export async function auditRiskAnalysis(input: AuditRiskAnalysisInput): Promise<AuditRiskAnalysisOutput> {
  return auditRiskAnalysisFlow(input);
}

const auditRiskAnalysisPrompt = ai.definePrompt({
  name: 'auditRiskAnalysisPrompt',
  input: { schema: AuditRiskAnalysisInputSchema },
  output: { schema: AuditRiskAnalysisOutputSchema },
  prompt: `You are an AI assistant specialized in identifying high-risk tax returns for the Indian government's e-Tax Sahayak system.
Your task is to analyze the provided tax return data for anomalies, patterns, and potential compliance issues, then determine if it's a high-risk case for audit.

Here is the tax return data for Tax Year {{{taxYear}}} for Taxpayer ID {{{taxpayerId}}}:

- Income Reported: INR {{{incomeReported}}}
- Deductions Claimed: INR {{{deductionsClaimed}}}
- Tax Paid: INR {{{taxPaid}}}
{{#if industryType}}
- Industry Type: {{{industryType}}}
{{/if}}
- Filing Date: {{{filingDate}}}
{{#if previousAuditStatus}}
- Previous Audit Status: {{{previousAuditStatus}}}
{{/if}}

For comparison:
{{#if averageDeductionsForIndustry}}
- Average Deductions for similar industry: INR {{{averageDeductionsForIndustry}}}
{{/if}}
{{#if averageTaxPaidForIncomeBracket}}
- Average Tax Paid for similar income bracket: INR {{{averageTaxPaidForIncomeBracket}}}
{{/if}}

Carefully analyze the provided information. Look for:
1.  Significant discrepancies between claimed deductions and industry averages.
2.  Unusually low tax paid compared to income reported and income bracket averages.
3.  Any other patterns that suggest potential under-reporting or aggressive tax planning.
4.  Consider the previous audit status, if available.

Based on your analysis, determine:
- If this return is high-risk for an audit (set \`isHighRisk\` to true or false).
- A \`riskScore\` from 0 to 100, where 100 is the highest risk.
- Specific \`riskReasons\` in bullet points (e.g., "Deductions significantly higher than industry average", "Low tax paid relative to income bracket", "History of audit issues").
- A \`summaryOfAnomalies\` explaining your reasoning in detail.
- A \`recommendedAction\` for the tax official.

Please output the result in a JSON object matching the following schema:
\`\`\`json
{{json_schema_definition AuditRiskAnalysisOutputSchema}}
\`\`\`
`,
});

const auditRiskAnalysisFlow = ai.defineFlow(
  {
    name: 'auditRiskAnalysisFlow',
    inputSchema: AuditRiskAnalysisInputSchema,
    outputSchema: AuditRiskAnalysisOutputSchema,
  },
  async (input) => {
    const { output } = await auditRiskAnalysisPrompt(input);
    return output!;
  },
);

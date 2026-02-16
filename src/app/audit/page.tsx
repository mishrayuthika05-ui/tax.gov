'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  ArrowRight,
  LoaderCircle,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react';
import { runAuditAnalysis } from './actions';
import type { AuditRiskAnalysisOutput } from '@/ai/flows/audit-risk-analysis';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PageHeader } from '@/components/page-header';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const formSchema = z.object({
  taxpayerId: z.string().min(10, "PAN must be 10 characters").max(10),
  taxYear: z.string().min(1, "Tax year is required"),
  incomeReported: z.coerce.number().positive("Income must be a positive number"),
  deductionsClaimed: z.coerce.number().min(0, "Deductions cannot be negative"),
  taxPaid: z.coerce.number().min(0, "Tax paid cannot be negative"),
  previousAuditStatus: z.enum(['None', 'Audited_NoIssues', 'Audited_IssuesFound']),
});

type FormValues = z.infer<typeof formSchema>;

export default function AuditPage() {
  const [result, setResult] = useState<AuditRiskAnalysisOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taxpayerId: 'AWBPC1234E',
      taxYear: '2023-2024',
      incomeReported: 5000000,
      deductionsClaimed: 1500000,
      taxPaid: 800000,
      previousAuditStatus: 'None',
    },
  });

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    setResult(null);
    setError(null);

    const input = {
      ...values,
      filingDate: new Date().toISOString(),
      averageDeductionsForIndustry: 800000,
      averageTaxPaidForIncomeBracket: 1000000,
      industryType: 'IT Services'
    };

    try {
      const analysisResult = await runAuditAnalysis(input);
      setResult(analysisResult);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An unknown error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AppShell>
      <PageHeader
        title="AI-Driven Audit Selection"
        description="Analyze tax returns to identify high-risk cases using generative AI."
      />
      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Tax Return Data</CardTitle>
            <CardDescription>Enter taxpayer information for analysis.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="taxpayerId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Taxpayer ID (PAN)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. ABCDE1234F" {...field} className="font-code"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="taxYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tax Year</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 2023-2024" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="incomeReported"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Income Reported (₹)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="5000000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="deductionsClaimed"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Deductions Claimed (₹)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="150000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="taxPaid"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tax Paid (₹)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="800000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="previousAuditStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Previous Audit Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="None">None</SelectItem>
                          <SelectItem value="Audited_NoIssues">Audited - No Issues</SelectItem>
                          <SelectItem value="Audited_IssuesFound">Audited - Issues Found</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? (
                    <>
                      <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      Run Analysis <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Analysis Result</CardTitle>
            <CardDescription>The AI's risk assessment will appear here.</CardDescription>
          </CardHeader>
          <CardContent className="flex h-[calc(100%-100px)] flex-col items-center justify-center">
            {isSubmitting && <LoaderCircle className="h-10 w-10 animate-spin text-primary" />}
            
            {!isSubmitting && !result && !error && (
              <p className="text-center text-muted-foreground">Submit the form to see the audit risk analysis.</p>
            )}

            {error && (
               <div className="text-center text-destructive">
                <AlertTriangle className="mx-auto mb-2 h-8 w-8" />
                <p className="font-semibold">Analysis Failed</p>
                <p className="text-sm">{error}</p>
              </div>
            )}
            
            {result && (
              <div className="w-full space-y-4 text-sm">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <p className="font-medium">Risk Score</p>
                    <p className="text-2xl font-bold">{result.riskScore}/100</p>
                  </div>
                  {result.isHighRisk ? (
                     <Badge variant="destructive" className="text-base">
                      <TrendingUp className="mr-2 h-4 w-4" /> High Risk
                    </Badge>
                  ) : (
                    <Badge className="bg-green-600 text-base text-white hover:bg-green-700">
                      <TrendingDown className="mr-2 h-4 w-4" /> Low Risk
                    </Badge>
                  )}
                </div>
                <Progress value={result.riskScore} />

                <div className="space-y-2 rounded-lg border p-4">
                  <h4 className="font-semibold">Recommended Action</h4>
                  <p className="text-primary font-bold text-lg">{result.recommendedAction}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Risk Factors</h4>
                  <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                    {result.riskReasons.map((reason, i) => <li key={i}>{reason}</li>)}
                  </ul>
                </div>

                <Separator />
                
                <div className="space-y-2">
                  <h4 className="font-semibold">AI Summary</h4>
                  <p className="text-muted-foreground">{result.summaryOfAnomalies}</p>
                </div>

              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}

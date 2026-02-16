import { AppShell } from '@/components/app-shell';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function PaymentsPage() {
  return (
    <AppShell>
      <PageHeader
        title="Tax Payments"
        description="Securely pay your tax liabilities online."
      />
      <Card>
        <CardHeader>
          <CardTitle>Under Development</CardTitle>
          <CardDescription>
            This section is currently being built. Please check back later.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            The payment portal will integrate with multiple payment gateways
            to facilitate secure, real-time processing of tax payments through
            net banking, credit/debit cards, UPI, and more.
          </p>
        </CardContent>
      </Card>
    </AppShell>
  );
}

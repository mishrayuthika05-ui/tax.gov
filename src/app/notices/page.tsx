import { AppShell } from '@/components/app-shell';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function NoticesPage() {
  return (
    <AppShell>
      <PageHeader
        title="Notices & Communications"
        description="View all official communication from the tax department."
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
            This area will display a history of all automated notices, reminders,
            and communications sent to you regarding deadlines, payments, and other
            compliance requirements.
          </p>
        </CardContent>
      </Card>
    </AppShell>
  );
}

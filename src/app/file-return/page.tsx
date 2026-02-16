import { AppShell } from '@/components/app-shell';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function FileReturnPage() {
  return (
    <AppShell>
      <PageHeader
        title="File Tax Return"
        description="Complete and submit your annual tax filings."
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
            The online tax filing interface will allow you to fill out your
            return with pre-filled information, upload necessary documents, and
            submit it securely.
          </p>
        </CardContent>
      </Card>
    </AppShell>
  );
}

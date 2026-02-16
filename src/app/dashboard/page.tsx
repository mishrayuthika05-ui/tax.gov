'use client';

import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Landmark, CheckCircle, FileSearch, IndianRupee } from 'lucide-react';
import { AppShell } from '@/components/app-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { PageHeader } from '@/components/page-header';
import { revenueData, complianceData } from '@/lib/data';

export default function DashboardPage() {
  return (
    <AppShell>
      <PageHeader
        title="Dashboard"
        description="Overview of tax collection and compliance metrics."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Revenue
            </CardTitle>
            <Landmark className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹45,231.89 Cr</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Compliance Rate
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92.5%</div>
            <p className="text-xs text-muted-foreground">
              +2.8% from last quarter
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Audits in Progress</CardTitle>
            <FileSearch className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,254</div>
            <p className="text-xs text-muted-foreground">
              +18 from yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              e-Filed Returns
            </CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.25 Cr</div>
            <p className="text-xs text-muted-foreground">
              This assessment year
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Quarter</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px] w-full">
              <BarChart data={revenueData} accessibilityLayer>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="quarter"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis
                  tickFormatter={(value) => `₹${value} Cr`}
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                 <Tooltip
                  cursor={{ fill: 'hsl(var(--muted))' }}
                  content={<ChartTooltipContent />}
                />
                <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Compliance Over Time</CardTitle>
          </CardHeader>
          <CardContent>
             <ChartContainer config={{}} className="h-[300px] w-full">
              <LineChart data={complianceData} accessibilityLayer>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis
                   tickFormatter={(value) => `${value}%`}
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                 <Tooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  content={<ChartTooltipContent />}
                />
                <Line type="monotone" dataKey="rate" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}

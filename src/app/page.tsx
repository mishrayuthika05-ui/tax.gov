'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/icons/logo';

export default function LoginPage() {
  const router = useRouter();
  const [pan, setPan] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      router.push('/dashboard');
    }, 1000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex items-center justify-center gap-3">
            <Logo className="h-10 w-10 text-primary" />
            <CardTitle className="font-headline text-3xl font-bold">
              e-Tax Sahayak
            </CardTitle>
          </div>
          <CardDescription>
            Government of India - Digital Tax Portal
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pan">PAN Card Number</Label>
              <Input
                id="pan"
                placeholder="Enter your 10-digit PAN"
                value={pan}
                onChange={(e) => setPan(e.target.value.toUpperCase())}
                maxLength={10}
                required
                className="font-code tracking-widest"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              This is a demonstration. Any 10 characters will work.
            </p>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Verifying...' : 'Secure Login'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

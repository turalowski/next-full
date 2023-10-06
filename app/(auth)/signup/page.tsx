'use client';

import { useState } from 'react';
import AuthForm from '../auth-form';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Alert, AlertDescription, AlertTitle } from '@/app/components/ui/alert';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const handleSubmit = async (values: { email: string; password: string }) => {
    const { email, password } = values;
    const supabase = createClientComponentClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/api/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
    }

    if (!error) {
      router.push('/verify');
    }
  };
  return (
    <main className="flex flex-col items-center justify-center h-full">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Sign up
        </h2>
        <AuthForm handleSubmit={handleSubmit} />
        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
    </main>
  );
}

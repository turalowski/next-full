'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import AuthForm from '../auth-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Alert, AlertTitle, AlertDescription } from '@/app/components/ui/alert';

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState<string>();
  const handleSubmit = async (values: { email: string; password: string }) => {
    const { email, password } = values;
    const supabase = createClientComponentClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    }

    if (!error) {
      router.push('/');
    }
  };
  return (
    <main className="flex flex-col justify-center items-center h-full">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Log in
      </h2>
      <div className="lg:w-1/2 flex flex-col gap-3">
        <AuthForm handleSubmit={handleSubmit} />
        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
    </main>
  );
}

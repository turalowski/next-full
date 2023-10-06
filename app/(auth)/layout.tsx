import Navbar from '../components/navbar';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {  
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

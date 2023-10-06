import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import NavbarAuthorized from '../components/navbar-authorized';
import { cookies } from 'next/headers';
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();

  console.log('data', data) 

  return (
    <>
      <NavbarAuthorized user={data?.session?.user} />
      {children}
    </>
  );
}

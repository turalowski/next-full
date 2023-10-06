'use client';

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function Logout() {

    const router = useRouter();

    async function handleLogout() {
        const supabase = createClientComponentClient();
        const {error} = await supabase.auth.signOut();

        if(!error) {
            router.push('/login')
        }

        if(error) {
            console.log(error);
        }
    }
    return (
        <Button onClick={handleLogout}>Logout</Button>
    )
}
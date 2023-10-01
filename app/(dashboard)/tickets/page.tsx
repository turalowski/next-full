import { Suspense } from 'react';
import TicketList from './ticket-list';
import Loading from '../loading';
import { Button } from '../../components/ui/button';
import Link from 'next/link';

export default function Tickets() {
  return (
    <main>
      <nav>
        <div>
          <div className="flex justify-between pb-2 border-b">
            <h2 className="mt-10 scroll-m-20  text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              Tickets
            </h2>
            <Link legacyBehavior href="/tickets/create">
              <Button>Create a new ticket</Button>
            </Link>
          </div>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            Currently open tickets
          </p>
        </div>
      </nav>
      <Suspense fallback={<Loading />}>
        <TicketList />
      </Suspense>
    </main>
  );
}

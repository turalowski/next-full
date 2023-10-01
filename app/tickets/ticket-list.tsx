import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../components/ui/card';

type Ticket = {
  id: number;
  title: string;
  body: string;
  priority: 'High' | 'Medium' | 'Low';
  user_email: string;
};

async function getTickets(): Promise<Ticket[]> {
  // imitate delay
  await new Promise(resolve => setTimeout(resolve, 3000))
  const response = await fetch('http://localhost:5000/tickets', {
    next: {
      revalidate: 0, // opt out of using cache
    },
  });
  const tickets = await response.json();
  return tickets;
}

export default async function TicketList() {
  const tickets = await getTickets();
  return (
    <div className="grid grid-cols-4 gap-3">
      {tickets.map(ticket => (
        <Link key={ticket.id} href={`/tickets/${ticket.id}`} className='hover:cursor-pointer'>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-bold">
                {ticket.title}
              </CardTitle>
              <p
                className={`text-xs rounded-md px-2 py-1 pill ${ticket.priority}`}
              >
                {ticket.priority}
              </p>
            </CardHeader>
            <CardContent>
              <div className="text-sm">{ticket.body}</div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";

type Ticket = {
  id: number;
  title: string;
  body: string;
  priority: 'High' | 'Medium' | 'Low';
  user_email: string;
};

async function getTicket(id: string): Promise<Ticket> {
  const response = await fetch(`http://localhost:5000/tickets/${id}`, {
    next: {
      revalidate: 0, // opt out of using cache
    },
  });
  const tickets = await response.json();
  return tickets;
}

type Params = {
  id: string;
};

export default async function TicketDetails({ params }: { params: Params }) {
  const ticket = await getTicket(params.id);
  return (
    <main>
      <nav className="mb-3">
        <h2>Ticket details</h2>
      </nav>
      <Card key={ticket.id}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-bold">{ticket.title}</CardTitle>
          <p className={`text-xs rounded-md px-2 py-1 pill ${ticket.priority}`}>
            {ticket.priority}
          </p>
        </CardHeader>
        <CardContent>
          <div className="text-sm">{ticket.body}</div>
        </CardContent>
      </Card>
    </main>
  );
}

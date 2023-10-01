import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import { notFound } from 'next/navigation';

// This constant defines whether dynamic parameters are enabled in the Next.js 13 app router.
// When set to 'false', it indicates that the router is configured with static parameters.
// If it's true, NextJS will try to fetch data with provided id and cache it.
export const dynamicParams = true;

// Defining the structure of a Ticket object
type Ticket = {
  id: string;
  title: string;
  body: string;
  priority: 'High' | 'Medium' | 'Low';
  user_email: string;
};

// Function to fetch and generate static parameters
export async function generateStaticParams() {
  // Fetching a list of tickets from a local server
  const response = await fetch('http://localhost:5000/tickets');
  const tickets: Ticket[] = await response.json();

  // Mapping the fetched tickets to a simplified format
  return tickets.map(ticket => ({
    id: String(ticket.id),
  }));
}

// Function to fetch a specific ticket by ID
async function getTicket(id: string): Promise<Ticket> {
  const response = await fetch(`http://localhost:5000/tickets/${id}`, {
    next: {
      revalidate: 60, // Opting out of using cache
    },
  });

  if (!response.ok) {
    notFound();
  }

  // Parsing the response JSON to get the ticket details
  const ticket = await response.json();
  return ticket;
}

// Defining the structure of the "params" object
type Params = {
  id: string;
};

// Main component for displaying ticket details
export default async function TicketDetails({ params }: { params: Params }) {
  // Fetching the ticket details based on the provided ID
  const ticket = await getTicket(params.id);

  return (
    <main>
      <nav className="mb-3">
        <h2>Ticket details</h2>
      </nav>

      {/* Displaying the ticket information using a Card component */}
      <Card key={ticket.id}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          {/* Displaying the ticket title */}
          <CardTitle className="text-sm font-bold">{ticket.title}</CardTitle>

          {/* Displaying the ticket priority as a colored pill */}
          <p className={`text-xs rounded-md px-2 py-1 pill ${ticket.priority}`}>
            {ticket.priority}
          </p>
        </CardHeader>

        {/* Displaying the ticket body */}
        <CardContent>
          <div className="text-sm">{ticket.body}</div>
        </CardContent>
      </Card>
    </main>
  );
}

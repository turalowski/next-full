import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const response = await fetch('http://localhost:5000/tickets', {
    next: {
      revalidate: 0,
    },
  });
  const tickets = response.json();

  return NextResponse.json(tickets, {
    status: 200,
  });
}

export async function POST(request: Request) {
  const ticket = await request.json();
  const response = await fetch('http://localhost:5000/tickets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ticket),
  });

  const newTicket = await response.json();

  return NextResponse.json(newTicket, {
    status: 201,
  });
}

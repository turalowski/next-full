import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const response = await fetch(`http://localhost:5000/tickets/${id}`, {
    next: {
      revalidate: 0,
    },
  });
  const ticket = response.json();

  if (!response.ok) {
    return NextResponse.json(
      { error: 'Cannot find the ticket.' },
      {
        status: 404,
      }
    );
  }
  return NextResponse.json(ticket, {
    status: 200,
  });
}

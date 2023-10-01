import CreateForm from './create-form';

export default function CreateTicket() {
  return (
    <main className='flex flex-col items-center justify-center'>
      <h3 className="text-lg font-medium">Create a ticket</h3>
      <p className="text-sm text-muted-foreground">
        Fill the form to create a new ticket
      </p>
        <CreateForm />
    </main>
  );
}

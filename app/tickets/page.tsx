import TicketList from "./ticket-list";

export default function Tickets() {
    return (
        <main>
            <nav className="mb-3">
                <div>
                    <h2>Tickets</h2>
                    <p>Currently open tickets</p>
                </div>
            </nav>
            <TicketList />
        </main>
    )
}
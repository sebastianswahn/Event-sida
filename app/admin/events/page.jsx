import { Button } from "@components/ui/button";
import Link from "next/link";
import EventList from "./_components/event-list";

function EventPage() {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-bold">All Events</h1>
        <Button asChild>
          <Link href="/admin/events/create">Create event</Link>
        </Button>
      </div>
      <div>
        <EventList />
      </div>
    </div>
  );
}
export default EventPage;

import Image from "next/image";
import Link from "next/link";

const EventListItem = ({ event }) => {
  return (
    <Link
      href={`/admin/events/${event.id}`}
      className=" w-60 border rounded-lg overflow-hidden flex flex-col items-center hover:bg-slate-500/10"
    >
      <div className="aspect-square h-60 w-60">
        <Image
          src={event.image}
          width={300}
          height={300}
          alt={event.name}
          className="size-full object-cover"
        />
      </div>
      <div className="p-4 flex flex-col items-center">
        <p className="font-semibold text-lg">{event.name}</p>
        <p className="text-sm text-muted-foreground">{event.date}</p>
      </div>
    </Link>
  );
};
export default EventListItem;

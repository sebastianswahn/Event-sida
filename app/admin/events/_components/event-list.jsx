"use client";
import { getEvents } from "@lib/eventHandler";
import { useEffect, useState } from "react";
import EventListItem from "./event-list-item";

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const Events = async () => {
      const response = await getEvents("events");
      setEvents(response);
    };
    Events();
  }, []);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {!!events.length ? (
        events.map((event) => <EventListItem key={event.id} event={event} />)
      ) : (
        <p>No events found</p>
      )}
    </div>
  );
};
export default EventList;

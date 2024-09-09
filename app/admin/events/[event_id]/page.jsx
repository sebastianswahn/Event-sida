"use client";
import { useState, useEffect } from "react";
import { Button } from "@components/ui/button";
import { getEvent } from "@lib/eventHandler";
import EditEventForm from "../_components/edit-event-form";
import { deleteObject } from "firebase/storage";
import { deleteEvent } from "@lib/eventHandler";
import { useRouter } from "next/navigation";
import { ref } from "firebase/storage";
import { storage } from "@firebase/config";

function EditEvent({ params }) {
  const [event, setEvent] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const GetEventById = async () => {
      const event = await getEvent("events", params.event_id);
      setEvent(event);
    };
    GetEventById();
  }, []);

  if (!event) return null;

  const handleDeleteEvent = async () => {
    const fileRef = ref(
      storage,
      `/images/${params.event_id}/${event.imageRef}`
    );
    await deleteObject(fileRef);

    await deleteEvent("events", params.event_id);
    router.replace("/admin/events");
  };

  return (
    <div className="p-4">
      <div className="flex justify-between ">
        <h1 className=" text-2xl font-bold mb-10">Edit Event</h1>
        <Button onClick={handleDeleteEvent} variant="destructive">
          Delete Event
        </Button>
      </div>
      <div>
        <EditEventForm event={event} />
      </div>
    </div>
  );
}
export default EditEvent;

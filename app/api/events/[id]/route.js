import { db } from "@firebase/config";
import { clerkClient } from "@clerk/nextjs/server";
import { doc, updateDoc, getDoc, deleteDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// HÄMTA ENSKILT

export const getEvent = async (collectionName, docId) => {
  const docRef = doc(db, collectionName, docId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    console.log("No such document!");
    return null;
  }
};

export async function GET(req, { params }) {
  try {
    const event = await getEvent("events", params.id);
    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }
    return NextResponse.json(event);
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

// RADERA EVENT
/* 
export const deleteEvent = async (collectionName, id) => {
    await deleteDoc(doc(db, collectionName, id));
    console.log("Document successfully deleted!");
  };
  
  export async function DELETE(req, { params }) {
    try {
      
      const event = await deleteEvent('events', params.id)
      if(!event) {
        return NextResponse.json({ message: 'Event not found'}, { status: 404 })
      }
      return NextResponse.json(event)
  
    } catch (err) {
      return NextResponse.json({ message: err.message }, { status: 500 })
    }
  } */
// UPPDATERA EVENT

export async function POST(req, { params }) {
  try {
    const { uid } = await req.json();
    if (!uid) {
      return NextResponse.json(
        { message: "Please enter an id" },
        { status: 400 }
      );
    }

    const event = await getEvent("events", params.id);
    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    const { data } = await clerkClient.users.getUserList();

    if (!data.some((user) => user.id == uid)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (event.attendees.includes(uid)) {
      event.attendees = event.attendees.filter((id) => id !== uid);

      const docRef = doc(db, "events", event.id);
      await updateDoc(docRef, { attendees: event.attendees });

      return NextResponse.json(event);
    }

    if (event.seats <= event.attendees.length) {
      return NextResponse.json({ message: "Event is full" }, { status: 400 });
    }

    event.attendees.push(uid);
    const docRef = doc(db, "events", event.id);
    await updateDoc(docRef, { attendees: event.attendees });

    return NextResponse.json(event);
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

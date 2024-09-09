import { NextResponse } from "next/server";
import { db, storage } from "@firebase/config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const dynamic = "force-dynamic";

//GET EVENTS

export const getEvents = async (collectionName) => {
  const events = await getDocs(collection(db, collectionName));
  const eventsList = [];
  events.forEach((doc) => {
    eventsList.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  return eventsList;
};

export async function GET(req) {
  try {
    const events = await getEvents("events");
    return NextResponse.json(events);
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

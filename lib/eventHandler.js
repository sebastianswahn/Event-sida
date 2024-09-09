"use client";

import { db, storage } from "@firebase/config";
import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

// HÄMTA ALLA EVENTS

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

// RADERA EVENT

export const deleteEvent = async (collectionName, id) => {
  await deleteDoc(doc(db, collectionName, id));
  console.log("Document successfully deleted!");
};

// UPPDATERA EVENT

export const updateEvent = async (collectionName, docId, data) => {
  const docRef = doc(db, collectionName, docId);
  await updateDoc(doc(db, collectionName, docId), data);
  console.log("Document successfully updated!");
  return docRef;
};

// UPPDATERA ANVÄNDARE
<<<<<<< HEAD
export const updateUsers = async (collectionName, docId, userId) => {
  const docRef = doc(db, collectionName, docId);
  await updateDoc(docRef, {
    attendees: arrayUnion(userId),
    seats: increment(-1),
  });

  console.log("Document successfully updated!");
  return docRef;
=======
// export const updateUsers = async (collectionName, docId, userId) => {
//     const docRef = doc(db, collectionName, docId);
//     await updateDoc(docRef, {
//       attendees: arrayUnion(userId),
//       seats: increment(-1),
//     });
  
//     console.log("Document successfully updated!");
//     return docRef;
//   };

// NY UPPDATERA ANVÄNDARE
export const updateUsers = async (collectionName, docId, userId) => {
  const docRef = doc(db, collectionName, docId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const eventData = docSnap.data();
    const attendees = eventData.attendees || []; // Fallback to an empty array if undefined
    const totalSeats = eventData.seats;

    if (attendees.includes(userId)) {
      return { success: false, message: "User already booked this event" };
    }
    const updatedAttendees = [...attendees, userId];
    const availableSeats = totalSeats - updatedAttendees.length;

    await updateDoc(docRef, {
      attendees: updatedAttendees,
      seats: availableSeats,
    });

    return { success: true, message: "Document successfully updated!", data: { docRef } };
  } else {
    throw new Error("No such document!");
  }
};

// TA BORT ANVÄNDARE FRÅN EVENT

export const cancelBooking = async (collectionName, docId, userId) => {
  const docRef = doc(db, collectionName, docId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const eventData = docSnap.data();
    const attendees = eventData.attendees || [];

    if (!attendees.includes(userId)) {
      return { success: false, message: "User is not booked for this event" };
    }

    const updatedAttendees = attendees.filter(attendee => attendee !== userId);
    const availableSeats = eventData.seats - updatedAttendees.length;

    await updateDoc(docRef, {
      attendees: updatedAttendees,
      seats: availableSeats,
    });

    return { success: true, message: "Booking successfully canceled", data: { docRef } };
  } else {
    throw new Error("No such document!");
  }
>>>>>>> fde490e0126f6af7e769643ae3442cd2fab595b5
};

// SKAPA EVENTS

export const addEvent = async (collectionName, data, id = null) => {
  let docRef;

  if (id) docRef = doc(db, collectionName, id);
  else docRef = doc(collection(db, collectionName));

  const eventData = {
    ...data,
    attendees: [],
  };

  await setDoc(docRef, eventData);
  return docRef;
};

// LADDA UPP BILD

export const uploadImage = async (file) => {
  const Ref = ref(storage, `images/${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);
  const downloadUrl = await getDownloadURL(snapshot.ref);
  return downloadUrl;
};

export const cancelBooking = async (collectionName, docId, userId) => {
  const docRef = doc(db, collectionName, docId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const eventData = docSnap.data();
    const attendees = eventData.attendees || [];

    if (!attendees.includes(userId)) {
      return { success: false, message: "User is not booked for this event" };
    }

    const updatedAttendees = attendees.filter(
      (attendee) => attendee !== userId
    );
    const availableSeats = eventData.seats - updatedAttendees.length;

    await updateDoc(docRef, {
      attendees: updatedAttendees,
      seats: availableSeats,
    });

    return {
      success: true,
      message: "Booking successfully canceled",
      data: { docRef },
    };
  } else {
    throw new Error("No such document!");
  }
};

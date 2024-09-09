'use client'

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@components/ui/carousel";
import { Button, buttonVariants } from "@components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { SignInButton } from "@clerk/nextjs";
<<<<<<< HEAD
import { updateEvent, updateUsers } from "@lib/eventHandler";
import { useAuthContext } from "./auth-provider";
import { cn } from "@lib/utils";
import {
  useEmblaCarousel,
  EmblaCarouselType,
  EmblaViewPortRefType,
} from "@node_modules/embla-carousel";
=======
import { cancelBooking, updateUsers } from "@/lib/eventHandler";
import { useAuthContext } from "./auth-provider";
import { checkIfBooked } from "@/lib/checkIfBooked";
>>>>>>> fde490e0126f6af7e769643ae3442cd2fab595b5

const EventCarousel = ({ events }) => {
  const { isLoaded, isSignedIn } = useAuth();
  const { user, userId } = useAuthContext();
<<<<<<< HEAD
  const [isBooked, setIsBooked] = useState(Boolean);

  const handleUpdateEvent = async (eventId) => {
    if (isLoaded && isSignedIn && user && userId) {
      try {
        const updatedEvent = await updateUsers("events", eventId, userId);
        console.log("Event updated successfully:", updatedEvent);
      } catch (error) {
        console.error("Error updating event:", error);
      }
    } else {
      console.error("User is not signed in");
    }
  };

  return (
    <Carousel className="relative h-96 w-4/6 ">
=======
  const [message, setMessage] = useState("");
  const [bookedEvents, setBookedEvents] = useState([]);

  // CHECK IF EVENTS ARE BOOKED 
  useEffect(() => {
    const fetchBookedEvents = async () => {
      const bookedEventIds = await checkIfBooked(isLoaded, isSignedIn, user, userId, events, updateUsers);
      setBookedEvents(bookedEventIds);
    };
    fetchBookedEvents();
  }, [isLoaded, isSignedIn, user, userId, events]);

  // EN EXTRA HANDLER FÖR BÅDE CANCEL OCH UPDATE 

  const handleUpdateEvent = async (eventId) => {
    if (isLoaded && isSignedIn && user && userId) {
      try {
        const response = await updateUsers('events', eventId, userId);
        setMessage(response.message);
        if (response.success) {
          setBookedEvents([...bookedEvents, eventId]);
        }
      } catch (error) {
        console.error("Error updating event:", error);
        setMessage("Error updating event");
      }
    } else {
      const message = "You need to be signed in to book an event";
      setMessage(message);
      console.log(message);
    }
  };

  
  const handleCancelBooking = async (eventId) => {
    if (isLoaded && isSignedIn && user && userId) {
      try {
        const response = await cancelBooking('events', eventId, userId);
        setMessage(response.message);
        if (response.success) {
          setBookedEvents(bookedEvents.filter(id => id !== eventId));
        }
      } catch (error) {
        console.error("Error canceling booking:", error);
        setMessage("Error canceling booking");
      }
    } else {
      const message = "You need to be signed in to cancel a booking";
      setMessage(message);
      console.log(message);
    }
  };

  return (
    <Carousel className="mt-12 w-2/3">
>>>>>>> fde490e0126f6af7e769643ae3442cd2fab595b5
      <CarouselContent>
        {events.map((event, index) => (
          <CarouselItem key={index}>
            <CardTitle>
              <span className="text-xl">{event.name}</span>
              <p>{event.uid}</p>
            </CardTitle>
            <Card>
              <CardContent className="flex items-center justify-center">
                <img
                  src={event.image}
                  alt={event.name}
                  className="text-4xl font-semibold max-w-full max-h-full object-contain"
                />
              </CardContent>
            </Card>

            <Card className="m-2">
              <CardDescription className="h-36 overflow-auto">
                <span className="text-xl">
                  On {event.date} {event.description} in {event.location} there
                  are {event.seats} seats available
                </span>
              </CardDescription>
            </Card>
<<<<<<< HEAD
            <div className="flex items-center justify-center text-center">
              {isSignedIn && !isBooked ? (
                <Button
                  className={cn(
                    buttonVariants({ variant: "default", size: "button" })
                  )}
                  onClick={() => handleUpdateEvent(event.id)}
                >
                  Boka här
                </Button>
              ) : (
                <SignInButton>
                  <button>Logga in för att boka</button>
=======
            <div className="items-center text-center">
              {message && <p>{message}</p>}
              {isSignedIn ? (
                bookedEvents.includes(event.id) ? (
                  <Button onClick={() => handleCancelBooking(event.id)}>Cancel Booking</Button>
                ) : (
                  <Button onClick={() => handleUpdateEvent(event.id)}>Book Now</Button>
                )
              ) : (
                <SignInButton>
                  <button>Log in to book</button>
>>>>>>> fde490e0126f6af7e769643ae3442cd2fab595b5
                </SignInButton>
              )}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default EventCarousel;

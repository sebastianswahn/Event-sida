"use client";

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
import { updateEvent, updateUsers } from "@lib/eventHandler";
import { useAuthContext } from "./auth-provider";
import { cn } from "@lib/utils";
import {
  useEmblaCarousel,
  EmblaCarouselType,
  EmblaViewPortRefType,
} from "@node_modules/embla-carousel";
import { cancelBooking, updateUsers } from "@/lib/eventHandler";
import { useAuthContext } from "./auth-provider";
import { checkIfBooked } from "@/lib/checkIfBooked";

const EventCarousel = ({ events }) => {
  const { isLoaded, isSignedIn } = useAuth();
  const { user, userId } = useAuthContext();
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
  const handleCancelBooking = async (eventId) => {
    if (isLoaded && isSignedIn && user && userId) {
      try {
        const cancelled = await cancelBooking("events", eventId, userId);
        console.log("Booking cancelled successfully:", cancelled);
      } catch (error) {
        console.error("Error cancelling booking:", error);
      }
    } else {
      console.error("User is not signed in");
    }
  };

  return (
    <Carousel className="mt-12 w-2/3">
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
              ) : isSignedIn && isBooked ? (
                <Button
                  className={cn(
                    buttonVariants({ variant: "default", size: "button" })
                  )}
                  onClick={() => handleCancelBooking(event.id)}
                >
                  Avboka
                </Button>
              ) : (
                <SignInButton>
                  <button>Logga in för att boka</button>
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

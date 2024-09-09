"use client";
import { SignInButton, SignOutButton } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import * as React from "react";
import { UserButton, useAuth } from "@clerk/nextjs";
import { useAuthContext } from "@components/auth-provider";
import { ModeToggle } from "@components/ModeToggle";
import { getEvents } from "@lib/eventHandler";
import DropdownMenuComponent from "@components/DropDownComponent";
import EventCarousel from "@components/EventCarousel";
import Link from "next/link";
import { Button } from "@components/ui/button";
import { buttonVariants } from "@components/ui/button";
import { dark } from "@clerk/themes";

// SLUT PÅ IMPORT

export default function CarouselDemo() {
  const { user, userId } = useAuthContext();
  const { isAdmin } = useAuthContext();

  const [events, setEvents] = useState([]);

  console.log(user);

  // HÄMTAR EVENTS

  useEffect(() => {
    getEvents("events").then((events) => {
      setEvents(events);
    });
  }, []);
  console.log(events);
  return (
    <div className="w-screen flex flex-col ">
      <div className="flex mt-12 justify-evenly">
        <div className="pl-8 px-4">
          <ModeToggle />
        </div>
        <div className="flex px-4">
          <DropdownMenuComponent />
        </div>
        <div
          style={{
            position: "fixed",
            zIndex: 900,
            top: "7%",
            left: "84%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <UserButton />
        </div>
        <div
          className="rounded-md ml-36 border"
          style={{
            position: "fixed",
            zIndex: 900,
            top: "17%",
            left: "78%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <SignInButton
            className={buttonVariants({ variant: "default", size: "default" })}
          >
            {user && userId && (
              <SignOutButton
                className={buttonVariants({
                  variant: "default",
                  size: "button",
                })}
              >
                Logout
              </SignOutButton>
            )}
          </SignInButton>
        </div>
        <div
          className="rounded-md ml-36 border"
          style={{
            position: "fixed",
            zIndex: 900,
            top: "17%",
            left: "90%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {isAdmin && (
            <Link
              href="./admin/dashboard"
              className={buttonVariants({
                variant: "default",
                size: "default",
              })}
            >
              Admin
            </Link>
          )}
        </div>
      </div>
      <div className="flex justify-center items-center">
        <EventCarousel events={events} />
      </div>
    </div>
  );
}

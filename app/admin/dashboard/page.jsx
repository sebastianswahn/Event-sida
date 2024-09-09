"use client";

import { useAuthContext } from "@components/auth-provider";
import { ModeToggle } from "@components/mode-toggle";
import { UserButton } from "@clerk/nextjs";
import React from "react";

function Dashboard() {
  const { userId } = useAuthContext();

  return (
    <div className="flex justify-between items-center p-4">
      <h1 className=" text-2xl font-bold">Dashboard</h1>

      {/* TEST FÖR ATT SE ATT AUTHCONTEXT FUNGERAR */}
      {userId ? <p>{userId}</p> : <p>Not logged in</p>}
      {/* TEST FÖR ATT SE ATT AUTHCONTEXT FUNGERAR */}
    </div>
  );
}

export default Dashboard;

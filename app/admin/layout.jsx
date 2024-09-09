"use client";

import { useAuthContext } from "@components/auth-provider";
import { NavbarRoutes } from "./_components/navbar-routes";
import { Button } from "@components/ui/button";
import Link from "next/link";

function AdminLayout({ children }) {
  const { isAdmin } = useAuthContext();

  if (!isAdmin) {
    return (
      <div className=" flex flex-col justify-center items-center gap-3 mt-20">
        <h1>You are not authorized </h1>{" "}
        <Button>
          {" "}
          <Link href="/"> Go Back home page </Link>{" "}
        </Button>
      </div>
    );
  }

  return (
    <div>
      <main>
        <NavbarRoutes />
        {children}
      </main>
    </div>
  );
}
export default AdminLayout;

//user_2h3PI2nBj4Nk4B7JbmIJHEfCyZl

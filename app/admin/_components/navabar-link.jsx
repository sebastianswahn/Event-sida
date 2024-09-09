"use client";

import { cn } from "@lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavbarLink = ({ label, href }) => {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-4 hover:bg-slate-500/10 cursor-pointer text-xl rounded-lg p-4 border-b-4 border-transparent",
        isActive && "border-slate-500 bg-slate-500/5"
      )}
    >
      {label}
    </Link>
  );
};

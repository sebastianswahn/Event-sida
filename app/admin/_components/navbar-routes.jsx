import { UserButton } from "@clerk/nextjs";
import { NavbarLink } from "./navabar-link";
import { ModeToggle } from "@components/mode-toggle";

const routes = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
  },
  {
    label: "Events",
    href: "/admin/events",
  },
  {
    label: "Admins",
    href: "/admin/admins",
  },
  {
    label: "Home",
    href: "/",
  },
];

export const NavbarRoutes = () => {
  return (
    <div className="flex justify-around p-4 border-b">
      {routes.map((route) => (
        <NavbarLink key={route.label} label={route.label} href={route.href} />
      ))}
      <div className="flex justify-center items-center gap-2">
        <ModeToggle />
        <UserButton />
      </div>
    </div>
  );
};

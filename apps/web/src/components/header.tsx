import { NavLink } from "react-router";

import { ModeToggle } from "./mode-toggle";
import useAuth from "@/hooks/useAuth";

export default function Header() {
  const { user } = useAuth();

  const links = [
    { to: "/", label: "Home" },
    { to: "/login", label: "Login" },
    { to: "/dashboard", label: "Dashboard" },
  ];

  return (
    <div>
      <div className="flex flex-row items-center justify-between px-2 py-1">
        <nav className="flex gap-4 text-lg">
          {links.map(({ to, label }) => {
            return (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => (isActive ? "font-bold" : "")}
                end
              >
                {label}
              </NavLink>
            );
          })}
          {user && (
            <NavLink
              to={"/profile"}
              className={({ isActive }) => (isActive ? "font-bold" : "")}
              end
            >
              Profile
            </NavLink>
          )}
        </nav>
        <div className="flex items-center gap-2">
          <ModeToggle />
        </div>
      </div>
      <hr />
    </div>
  );
}

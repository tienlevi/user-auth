import { Outlet } from "react-router";
import Header from "./components/header";
import { Toaster } from "sonner";
import useAuth from "./hooks/useAuth";
import { useEffect } from "react";
import { logoutCallback } from "./utils/auth";

function Main() {
  const { logout } = useAuth();

  useEffect(() => {
    logoutCallback(logout);
  }, []);
  return (
    <>
      <div className="grid grid-rows-[auto_1fr] h-svh">
        <Header />
        <Outlet />
      </div>
      <Toaster richColors />
    </>
  );
}

export default Main;

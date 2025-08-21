import useAuth from "@/hooks/useAuth";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";

function Profile() {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  if (isLoading) {
    return <>Loading...</>;
  }

  return <div>Profile</div>;
}

export default Profile;

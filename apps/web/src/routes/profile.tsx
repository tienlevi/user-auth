import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { formatDateWithTime } from "@/utils/format";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router";

function Profile() {
  const navigate = useNavigate();
  const { user, isLoading, logout } = useAuth();

  const handleLogout = useCallback(() => {
    logout();
  }, [user]);
  useEffect(() => {
    if (!user && !isLoading) {
      navigate("/");
    }
  }, [user, isLoading]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-3">
      <div>Profile</div>
      <div className="">
        <div className="flex">User: {user?.name}</div>
        <div className="flex">Email: {user?.email}</div>
        <div className="flex">
          Created at: {formatDateWithTime(user?.createdAt || "")}
        </div>
      </div>
      <Button variant="destructive" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}

export default Profile;

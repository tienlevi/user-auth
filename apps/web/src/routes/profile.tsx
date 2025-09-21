import useAuth from "@/hooks/useAuth";
import { formatDateWithTime } from "@/utils/format";

function Profile() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <div className="">
      <div>Profile</div>
      <div className="">
        <div className="flex">User: {user?.name}</div>
        <div className="flex">Email: {user?.email}</div>
        <div className="flex">
          Created at: {formatDateWithTime(user?.createdAt || "")}
        </div>
      </div>
    </div>
  );
}

export default Profile;

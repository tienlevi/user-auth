import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

export default function Login() {
  const {} = useForm();

  return (
    <div className="container mx-auto px-4 py-2">
      <div className="text-3xl text-center font-bold">Login</div>
      <form className="mt-5 w-1/2 mx-auto space-y-3">
        <Input placeholder="Email" />
        <Input placeholder="Password" />
        <div className="flex items-center gap-2">
          <Button>Submit</Button>
          <Link to={"/register"}>
            <Button>Register</Button>
          </Link>
        </div>
      </form>
    </div>
  );
}

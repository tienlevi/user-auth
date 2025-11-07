import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

interface Inputs {
  email: string;
  password: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const { user, login, loadingLogin } = useAuth();
  const navigate = useNavigate();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const onSubmit = (data: Inputs) => {
    login(data);
  };

  useEffect(() => {
    if (user && !loadingLogin) {
      navigate("/profile");
    }
  }, [user, loadingLogin]);

  return (
    <div className="container mx-auto px-4 py-2">
      <div className="text-3xl text-center font-bold">Login</div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-5 w-1/2 mx-auto space-y-3"
      >
        <Input
          {...register("email", {
            required: "Enter email",
            pattern: {
              value: emailRegex,
              message: "Please enter a valid email address",
            },
          })}
          placeholder="Email"
          type="email"
        />
        {errors.email && (
          <div className="text-red-500 text-sm">{errors.email.message}</div>
        )}
        <Input
          {...register("password", {
            required: "Enter password",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          placeholder="Password"
          type="password"
        />
        {errors.password && (
          <div className="text-red-500 text-sm">{errors.password.message}</div>
        )}
        <div className="flex items-center justify-end mb-2">
          <Link
            to="/forgot-password"
            className="text-sm text-blue-600 hover:underline dark:text-blue-400"
          >
            Forgot Password?
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Button type="submit" disabled={loadingLogin}>
            {loadingLogin ? "Loading..." : "Submit"}
          </Button>
          <Link to={"/register"}>
            <Button>Register</Button>
          </Link>
        </div>
      </form>
    </div>
  );
}

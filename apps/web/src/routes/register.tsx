import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

interface Inputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const password = watch("password");

  const onSubmit = (data: Inputs) => {
    // Remove confirmPassword from data before sending to API
    const { confirmPassword, ...submitData } = data;
    console.log(submitData);
  };

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return (
    <div className="container mx-auto px-4 py-2">
      <div className="text-3xl text-center font-bold">Register</div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-5 w-1/2 mx-auto space-y-3"
      >
        <Input
          {...register("name", {
            required: "Enter name",
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters",
            },
          })}
          placeholder="Name"
          type="text"
        />
        {errors.name && (
          <div className="text-red-500 text-sm">{errors.name.message}</div>
        )}

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

        <Input
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) => {
              if (!value) return "Please confirm your password";
              if (value !== password) return "Passwords do not match";
              return true;
            },
          })}
          placeholder="Confirm password"
          type="password"
        />
        {errors.confirmPassword && (
          <div className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </div>
        )}

        <div className="flex items-center gap-2">
          <Button type="submit">Submit</Button>
          <Link to={"/login"}>
            <Button type="button" variant="outline">
              Back to login
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Register;

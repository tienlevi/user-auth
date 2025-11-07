import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForgotPassword } from "@/hooks/useForgotPassword";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { mutate: forgotPassword, isPending } = useForgotPassword();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      return;
    }

    forgotPassword(
      { email },
      {
        onSuccess: () => {
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        },
      }
    );
  };

  return (
    <div className="container mx-auto space-y-2">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          Forgot Password
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit} className="w-1/2 mx-auto space-y-4">
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isPending}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Sending..." : "Send Reset Link"}
          </Button>
          <div className="text-sm text-center text-gray-600 dark:text-gray-400">
            Remember your password?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              Back to login
            </Link>
          </div>
        </CardFooter>
      </form>
    </div>
  );
};

export default ForgotPassword;

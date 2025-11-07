import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
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
import { useResetPassword } from "@/hooks/useResetPassword";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const { mutate: resetPassword, isPending } = useResetPassword();

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      return;
    }

    if (newPassword !== confirmPassword) {
      return;
    }

    if (newPassword.length < 6) {
      return;
    }

    resetPassword(
      { token, newPassword },
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
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          Reset Password
        </CardTitle>
        <CardDescription className="text-center">
          Enter your new password below
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={6}
              disabled={isPending}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Password must be at least 6 characters
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
              disabled={isPending}
            />
            {newPassword &&
              confirmPassword &&
              newPassword !== confirmPassword && (
                <p className="text-xs text-red-600 dark:text-red-400">
                  Passwords do not match
                </p>
              )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            type="submit"
            className="w-full"
            disabled={
              isPending ||
              newPassword !== confirmPassword ||
              newPassword.length < 6
            }
          >
            {isPending ? "Resetting..." : "Reset Password"}
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
    </Card>
  );
};

export default ResetPassword;

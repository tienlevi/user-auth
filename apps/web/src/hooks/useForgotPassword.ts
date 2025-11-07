import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "@/services/auth";
import { toast } from "sonner";

interface ForgotPasswordData {
  email: string;
}

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (data: ForgotPasswordData) => forgotPassword(data),
    onSuccess: (data) => {
      toast.success(data.message || "Password reset link sent to your email");
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to send reset link";
      toast.error(errorMessage);
    },
  });
};

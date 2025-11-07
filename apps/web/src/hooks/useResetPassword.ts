import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "@/services/auth";
import { toast } from "sonner";

interface ResetPasswordData {
  token: string;
  newPassword: string;
}

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (data: ResetPasswordData) => resetPassword(data),
    onSuccess: (data) => {
      toast.success(data.message || "Password reset successfully");
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to reset password";
      toast.error(errorMessage);
    },
  });
};

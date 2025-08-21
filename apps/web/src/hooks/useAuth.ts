import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@/constants/query-key";
import { toast } from "sonner";
import { loginAuth } from "@/services/auth";
import { setAccessToken } from "@/utils/auth";
import { useNavigate } from "react-router";

function useAuth() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending: loadingLogin } = useMutation({
    mutationKey: [QUERY_KEY.LOGIN],
    mutationFn: async (data: any) => {
      return await loginAuth(data);
    },
    onSuccess: (data) => {
      setAccessToken(data.token);
      return toast.success("Login success");
    },
    onError(error: any) {
      console.log(error);

      return toast.error(error.response.data.message || "Login failed");
    },
  });

  const logout = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USER] });
    localStorage.removeItem(QUERY_KEY.USER);
    navigate("/login");
  };

  return { login, logout, loadingLogin };
}

export default useAuth;

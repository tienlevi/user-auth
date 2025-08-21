import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@/constants/query-key";
import { toast } from "sonner";
import { getAuthToken, loginAuth } from "@/services/auth";
import { getAccessToken, setAccessToken } from "@/utils/auth";
import { useNavigate } from "react-router";
import IUser from "@/interfaces/user";
import { getUserById } from "@/services/user";
import IToken from "@/interfaces/token";

function useAuth() {
  const accessToken = getAccessToken();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: token } = useQuery<IToken>({
    queryKey: [QUERY_KEY.TOKEN],
    queryFn: async () => {
      return await getAuthToken(accessToken || "");
    },
  });
  const { data: user, isLoading } = useQuery<IUser[]>({
    queryKey: [QUERY_KEY.USERS],
    queryFn: async () => {
      return await getUserById(token?.id || "");
    },
    enabled: !!token,
  });

  const { mutate: login, isPending: loadingLogin } = useMutation({
    mutationKey: [QUERY_KEY.LOGIN],
    mutationFn: async (data: any) => {
      return await loginAuth(data);
    },
    onSuccess: (data) => {
      setAccessToken(data.token);
      navigate("/profile");
      return toast.success("Login success");
    },
    onError(error: any) {
      console.log(error);

      return toast.error(error.response.data.message || "Login failed");
    },
  });

  const logout = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USERS] });
    queryClient.removeQueries({ queryKey: [QUERY_KEY.USERS] });
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return { user, isLoading, login, logout, loadingLogin };
}

export default useAuth;

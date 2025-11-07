import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@/constants/query-key";
import { toast } from "sonner";
import { getAuthToken, loginAuth } from "@/services/auth";
import { getAccessToken, setAccessToken } from "@/utils/auth";
import IUser from "@/interfaces/user";
import { getUserById } from "@/services/user";
import IToken from "@/interfaces/token";

function useAuth() {
  const accessToken = getAccessToken();
  const queryClient = useQueryClient();

  const { data: token } = useQuery<IToken>({
    queryKey: [QUERY_KEY.TOKEN],
    queryFn: async () => {
      return await getAuthToken(accessToken || "");
    },
    enabled: !!accessToken,
  });
  const { data: user, isLoading } = useQuery<IUser | null>({
    queryKey: [QUERY_KEY.USERS, token?.id],
    queryFn: async () => {
      return await getUserById(token?.id || "");
    },
    enabled: !!accessToken,
  });

  const { mutate: login, isPending: loadingLogin } = useMutation({
    mutationKey: [QUERY_KEY.LOGIN],
    mutationFn: async (data: any) => {
      return await loginAuth(data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.USERS, QUERY_KEY.TOKEN],
      });
      setAccessToken(data.token);
      return toast.success("Login success");
    },
    onError(error: any) {
      console.log(error);

      return toast.error(error.response.data.message || "Login failed");
    },
  });

  const logout = () => {
    localStorage.removeItem("accessToken");
    queryClient.setQueryData([QUERY_KEY.USERS, token?.id], null);
    queryClient.removeQueries({
      queryKey: [QUERY_KEY.USERS, QUERY_KEY.TOKEN],
    });
    queryClient.removeQueries({
      queryKey: [token?.id, accessToken],
    });
    queryClient.clear();
  };

  return { user, isLoading, login, logout, loadingLogin };
}

export default useAuth;

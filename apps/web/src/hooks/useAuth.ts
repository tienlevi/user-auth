import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@/constants/query-key";
import { toast } from "sonner";
import { getAuthToken, loginAuth } from "@/services/auth";
import { getAccessToken, setAccessToken } from "@/utils/auth";
import IUser from "@/interfaces/user";
import { getUserById } from "@/services/user";
import IToken from "@/interfaces/token";
import { useDispatch } from "react-redux";
import { loginSlice, logoutSlice } from "@/stores/slices/authSlice";

function useAuth() {
  const accessToken = getAccessToken();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { data: token } = useQuery<IToken>({
    queryKey: [QUERY_KEY.TOKEN],
    queryFn: async () => {
      return await getAuthToken(accessToken || "");
    },
  });
  const { data: user, isLoading } = useQuery<IUser | null>({
    queryKey: [QUERY_KEY.USERS, token?.id],
    queryFn: async () => {
      return await getUserById(token?.id || "");
    },
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
      dispatch(loginSlice(data));
      return toast.success("Login success");
    },
    onError(error: any) {
      console.log(error);

      return toast.error(error.response.data.message || "Login failed");
    },
  });

  const logout = () => {
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEY.USERS, QUERY_KEY.TOKEN],
    });
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    dispatch(logoutSlice());
  };

  return { user, isLoading, login, logout, loadingLogin };
}

export default useAuth;

import { QUERY_KEY } from "@/constants/query-key";
import IUser from "@/interfaces/user";
import { register } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

function useRegister() {
  return useMutation({
    mutationKey: [QUERY_KEY.REGISTER],
    mutationFn: async (data: IUser) => {
      return await register(data);
    },
    onSuccess: () => {
      return toast.success("Register success");
    },
    onError(error: any) {
      console.log(error);
      if (error.response.status === 401) {
        return toast.error(error.response.data.message);
      }
      return toast.error("Register failed");
    },
  });
}

export default useRegister;

import { VERIFY_USER } from "@/constants/endpoints";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useVerifyUser() {
  return useQuery({
    queryKey: ["verifyUser"],
    retry: 0,
    queryFn: async () => {
      const response = await axios.get(VERIFY_USER, {
        withCredentials: true,
      });
      return response.data.data;
    },
  });
}

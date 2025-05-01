import { LOGIN_USER } from "@/constants/endpoints";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export function useLoginMutation(){
    return useMutation({
        mutationKey: ["LOGIN_USER"],
        mutationFn: async (data: {email: string; password: string }) => {
            const response = await axios.post(LOGIN_USER, data, {
                withCredentials: true
            })
            return response.data.data;
        },
    })
}
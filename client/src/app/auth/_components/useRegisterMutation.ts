import { REGISTER_USER } from "@/constants/endpoints";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export function useRegisterMutation(){
    return useMutation({
        mutationKey: ["REGISTER_USER"],
        mutationFn: async (data: { name: string; email: string; password: string }) => {
            const response = await axios.post(REGISTER_USER, data, {
                withCredentials: true
            })
            return response.data.data;
        },
    })
}
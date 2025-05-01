import { CREATE_CHAT_ROOM } from "@/constants/endpoints";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export function useCreateChatRoomMutation(){
    return useMutation({
        mutationKey: ["CREATE_CHAT_ROOM"],
        mutationFn: async (data: {roomName: string, password?: string, isGroup: boolean}) => {
            const response = await axios.post(CREATE_CHAT_ROOM, data, {
                withCredentials: true
            })
            return response.data.data;
        },
    })
}
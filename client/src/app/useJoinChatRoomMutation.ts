import { JOIN_CHAT_ROOM } from '@/constants/endpoints';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

type JoinChatRoomPayload = {
  roomName: string;
  password: string;
};

type JoinChatRoomResponse = boolean; // Your controller returns true on success

type ErrorResponse = {
  error: string;
  message: string;
};

export const useJoinChatRoomMutation = () => {
  return useMutation<JoinChatRoomResponse, AxiosError<ErrorResponse>, JoinChatRoomPayload>({
    mutationFn: async (payload) => {
      const response = await axios.post(JOIN_CHAT_ROOM, payload, {
        withCredentials: true, // for cookie-based token
      });
      return response.data;
    },
  });
};

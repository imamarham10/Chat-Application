import { WebSocket } from 'ws';
import url from 'url';
import { markUserOffline, markUserOnline } from '../dal/chatRoom.dal';
import { publishMessageToRoom, subscribeToRoom } from './pubsub';

const activeConnections = new Map<string, WebSocket>();

export const handleConnection = (ws: WebSocket, req: any) => {
  const { query } = url.parse(req.url, true);
  const roomId = query.roomId as string;
  const userId = query.userId as string;

  if (!roomId || !userId) return ws.close(1008, 'Invalid connection');

  const connectionKey = `${roomId}:${userId}`;
  activeConnections.set(connectionKey, ws);

  markUserOnline(roomId, userId);

  subscribeToRoom(roomId, (message:unknown) => {
    ws.send(JSON.stringify(message));
  });

  ws.on('message', async (data) => {
    const parsed = JSON.parse(data.toString());

    // message from user
    if (parsed.type === 'chat-message') {
      await publishMessageToRoom(roomId, {
        type: 'chat-message',
        content: parsed.content,
        senderId: userId,
        timestamp: new Date().toISOString(),
      });
    }
  });

  ws.on('close', () => {
    activeConnections.delete(connectionKey);
    markUserOffline(roomId, userId);
  });
};

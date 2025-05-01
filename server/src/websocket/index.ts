import { WebSocketServer } from 'ws';
import http from 'http';
import { handleConnection } from './handlers';

const setupWebSocket = (server: http.Server) => {
  const wss = new WebSocketServer({ noServer: true });

  wss.on('connection', handleConnection);

  server.on('upgrade', (req, socket, head) => {
    wss.handleUpgrade(req, socket, head, (ws) => {
      wss.emit('connection', ws, req);
    });
  });

  return wss;
};

export default setupWebSocket;

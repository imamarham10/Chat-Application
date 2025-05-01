import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http"; // 👈 required for WebSocket setup

import config from "./config";
import setupWebSocket from "./src/websocket";
import { apiRouter } from "./api.route";

const { PORT } = config;
const app = express();

app.use(cors({ origin: `http://localhost:3000`, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(`/api`, apiRouter);

// Create HTTP server
const server = http.createServer(app);

// Setup WebSocket on top of HTTP server
setupWebSocket(server);

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

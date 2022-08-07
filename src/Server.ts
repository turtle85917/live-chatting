import express from "express";
import { Server } from "socket.io";

import socket from "./socket";

import http from "http";

const app = express();
const server = http.createServer(app);

const socketIo = new Server(server, { cors: { credentials: true } });

app.use(require("cors")({ credentials: true }));
socket(socketIo);

server.listen(2134, () => {
  console.log("Server listen : http://localhost:2134");
});
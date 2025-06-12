// src/socket.js
import { io } from "socket.io-client";

export const socket = io("http://localhost:5000", {
  transports: ["websocket"], // or leave empty if not needed
});

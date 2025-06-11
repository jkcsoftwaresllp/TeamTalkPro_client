import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

export const socket = io(SOCKET_URL, {
  auth: {
    token: localStorage.getItem("token"),
  },
});

export const joinRoom = (conversationId) => {
  socket.emit("join", { conversationId });
};

export const emitTyping = (conversationId, senderId, isTyping) => {
  socket.emit("user:typing", { conversationId, senderId, isTyping });
};

export const listenTyping = (callback) => {
  socket.on("user:typing", callback);
};

import { io } from 'socket.io-client';

export const createSocket = () => {
  const token = localStorage.getItem('token');
  return io('http://localhost:5000', {
    auth: { token },
    withCredentials: true,
  });
};

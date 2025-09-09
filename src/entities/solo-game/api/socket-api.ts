import { io, Socket } from 'socket.io-client';

type SocketApiType = {
  socket: Socket | null;
  createConnection: () => void;
  disconnect: () => void;
};

export const socketApi: SocketApiType = {
  socket: null,
  createConnection() {
    if (!this.socket) {
      this.socket = io('http://localhost:8080/');

      this.socket.on('connect', () => {
        console.log('CLIENT CONNECTED');
      });

      this.socket.on('disconnect', () => {
        console.log('CLIENT DISCONNECTED');
        this.socket = null;
      });

      this.socket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
      });

      this.socket.on('error', (error) => {
        console.error('Socket error:', error);
      });
    }
  },
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  },
};

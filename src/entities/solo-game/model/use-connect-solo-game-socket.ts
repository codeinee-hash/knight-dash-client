import { useEffect, useState } from 'react';
import { socketApi } from '../api/socket-api';
import type { SoloGameSession } from '../types/solo-game.types';

export function useConnectSoloGameSocket() {
  const [resData, setResData] = useState<SoloGameSession | null>(null);
  const [error, setError] = useState<string | null>(null);

  function connectSocket() {
    console.log('socketApi.socket: ', socketApi.socket);
    if (!socketApi.socket) {
      socketApi.createConnection();
    }

    socketApi.socket?.on(
      'server-submit-score-path',
      (data: SoloGameSession) => {
        setResData((prev) => {
          if (JSON.stringify(prev) !== JSON.stringify(data)) {
            return data;
          }
          return prev;
        });

        if (data.finished) {
          socketApi.socket?.disconnect();
          socketApi.disconnect();
        }
      }
    );

    socketApi.socket?.on(
      'server-error',
      (error: { message: string; status: number }) => {
        setError(error.message);
        if (error.message === 'Игра уже закончена') {
          socketApi.socket?.disconnect();
          socketApi.disconnect();
        }
      }
    );
  }

  function handleGameEnd() {
    socketApi.socket?.off('server-submit-score-path');
    socketApi.socket?.off('server-error');
    socketApi.disconnect();
  }

  function reconnectSocket() {
    socketApi.disconnect();
    connectSocket();
  }

  useEffect(() => {
    connectSocket();

    return () => {
      console.log('Cleaned socket connect');
      socketApi.socket?.off('server-submit-score-path');
      socketApi.socket?.off('server-error');
      socketApi.disconnect();
    };
  }, []);

  return { resData, error, handleGameEnd, reconnectSocket };
}

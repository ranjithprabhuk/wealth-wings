import { createContext, useEffect, useState } from 'react';
import { getLocalStorageValue } from '../utils/localStorage/getLocalStorageValue';

export const WebsocketContext = createContext<{
  socketData: Record<string, string>;
  unSubscribeToInstrument: (exchange: string, token: string) => void;
  subscribeToInstrument: (exchange: string, token: string) => void;
  isSocketReady: boolean;
}>({
  socketData: {},
  subscribeToInstrument: () => {},
  unSubscribeToInstrument: () => {},
  isSocketReady: false,
});

export const WebsocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isSocketReady, setIsSocketReady] = useState(false);
  const [socketData, updateSocketData] = useState<Record<string, string>>({});

  function subscribeToInstrument(exchange: string, token: string) {
    if (socket.readyState === socket.OPEN) {
      socket.send(
        JSON.stringify({
          k: `${exchange}|${token}#`,
          t: 't',
        }),
      );
    }
  }

  function unSubscribeToInstrument(exchange: string, token: string) {
    if (socket.readyState === socket.OPEN) {
      socket.send(
        JSON.stringify({
          k: `${exchange}|${token}#`,
          t: 'u',
        }),
      );
    }
  }

  useEffect(() => {
    const webSocket = new WebSocket(import.meta.env.VITE_WS_URL);

    webSocket.onopen = () => {
      webSocket.send(
        JSON.stringify({
          t: 'c',
          uid: getLocalStorageValue('userId'),
          actid: getLocalStorageValue('userId'),
          susertoken: getLocalStorageValue('token'),
          source: 'API',
        }),
      );
    };

    webSocket.onmessage = event => {
      const response = JSON.parse(event.data);
      if (!socket && response.s === 'OK') {
        setSocket(webSocket);
        setIsSocketReady(x => !x);
      }
      if (response.t === 'tf') {
        updateSocketData(existingData => {
          return { ...existingData, [response.tk]: response };
        });
      }

      // if(result.t == 'ck')
      // {
      //      trigger("open", [result]);
      // }
      // if( result.t == 'tk' || result.t == 'tf')
      // {
      //      trigger("quote", [result]);
      // }
      // if( result.t == 'dk' || result.t == 'df')
      // {
      //      trigger("quote", [result]);
      // }
      // if(result.t == 'om')
      // {
      //      trigger("order", [result]);
      // }
    };

    return () => {
      webSocket.close();
    };
  }, []);

  return (
    <WebsocketContext.Provider value={{ socketData, subscribeToInstrument, unSubscribeToInstrument, isSocketReady }}>
      {children}
    </WebsocketContext.Provider>
  );
};

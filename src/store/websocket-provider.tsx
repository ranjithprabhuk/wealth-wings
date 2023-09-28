import { createContext, useEffect, useState } from 'react';

export const WebsocketContext = createContext<{ socket: WebSocket | null; socketData: Record<string, string> }>({
  socket: null,
  socketData: {},
});

export const WebsocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [socketData, updateSocketData] = useState<Record<string, string>>({});

  useEffect(() => {
    const webSocket = new WebSocket(import.meta.env.VITE_WS_URL);

    webSocket.onopen = () => {
      webSocket.send(
        JSON.stringify({
          t: 'c',
          uid: window.localStorage.getItem('userId'),
          actid: window.localStorage.getItem('userId'),
          susertoken: window.localStorage.getItem('token'),
          source: 'API',
        }),
      );
    };

    webSocket.onmessage = event => {
      const response = JSON.parse(event.data);
      if (!socket && response.s === 'OK') {
        setSocket(webSocket);
      }
console.log('sadsadsadsadkjksadk asjdksajdjas', socket, response)
      if (response.t === 'tf') {
        updateSocketData(existingData => {
          return { ...existingData, [response.tk]: response };
        });
      }
    };

    return () => {
      webSocket.close();
    };
  }, []);

  return <WebsocketContext.Provider value={{ socket, socketData }}>{children}</WebsocketContext.Provider>;
};

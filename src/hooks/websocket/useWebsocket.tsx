import React, { ReactNode, useContext, useEffect, useState } from "react";
import { Websocket } from "./websocket";
import { appConfig } from "../../config";

function getWsUrl() {
  const root = "wss://ws.zerodha.com/";
  const url =
    root +
    "?api_key=" +
    appConfig.apiKey +
    "&user_id=" +
    appConfig.userId +
    "&enctoken=" +
    encodeURIComponent(appConfig.accessToken) +
    "&uid=" +
    new Date().getTime().toString();

  return url;
}

export type WebSocketContextType = [
  (event: any, filter?: string) => void,
  (event: any) => void
];
export const WebSocketContext = React.createContext<WebSocketContextType>([
  () => {},
  () => {},
]);

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
  const [listeners, setListeners] = useState<{
    [key: string]: ((event: any) => void)[];
  }>({});

  const addListener = (fn: any, filter = "any") => {
    setListeners((currentListeners) => {
      console.log(currentListeners);
      return {
        ...currentListeners,
        [filter]: [...(currentListeners[filter] || []), fn],
      };
    });
  };

  const sendMessage = (message: string) => {
    if (webSocket) {
      webSocket.send(message);
    }
  };

  const onMessage = (event: any) => {
    console.log("adadasda", event);
    const { data } = event;
    if (listeners[data]) {
      listeners[data].forEach((listener) => listener(event));
    }

    if (listeners.any) {
      listeners.any.forEach((listener) => listener(event));
    }
  };
  return (
    <WebSocketContext.Provider value={[addListener, sendMessage]}>
      <Websocket
        url={getWsUrl()}
        onOpen={(_event, socket) => {
          setWebSocket(socket);
          console.log("Connected to websocket");
        }}
        onMessage={onMessage}
      />
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = (
  listener?: (event: any) => void,
  filter = "any"
) => {
  const [addListener, sendMessage] = useContext(WebSocketContext);
  useEffect(() => {
    if (listener) {
      addListener(listener, filter);
    }
  }, []);

  return { sendMessage };
};

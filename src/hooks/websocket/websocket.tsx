import { useEffect, useState } from "react";
// import { parseBinary, parseTextMessage } from "../../kite-connect/ticker";

export interface WebsocketProps {
  url: string;
  onMessage: (event: MessageEvent, websocket: WebSocket) => void;
  onOpen: (event: Event, websocket: WebSocket) => void;
  keepAliveInterval?: number;
  onClose?: (event: Event, websocket: WebSocket) => void;
}

const keepAlive = (websocket: WebSocket, interval: number) => {
  setTimeout(() => {
    websocket.send(
      JSON.stringify({
        method: "ping",
      })
    );
    keepAlive(websocket, interval);
  }, interval);
};

export const Websocket = ({
  url,
  onMessage,
  onOpen,
  keepAliveInterval,
  onClose,
}: WebsocketProps) => {
  const [websocket, setWebsocket] = useState<any>(null);

  useEffect(() => {
    const websocket = new WebSocket(url);
    websocket.onmessage = (event: MessageEvent) => {
      onMessage(event, websocket);
    };
    if (onClose) {
      websocket.onclose = (event: Event) => {
        onClose(event, websocket);
      };
    }

    websocket.onopen = (event: Event) => {
      setWebsocket(websocket);
      onOpen(event, websocket);
      if (keepAliveInterval) {
        keepAlive(websocket, keepAliveInterval);
      }
    };
  }, []);

  useEffect(() => {
    if (websocket) {
      websocket.onmessage = (e: MessageEvent) => {
        // console.log("event", e);
        // if (e.data instanceof ArrayBuffer) {
        //   // Trigger on message event when binary message is received
        //   onMessage([e.data] as any, websocket);
        //   if (e.data.byteLength > 2) {
        //     const d = parseBinary(e.data);
        //     if (d) onMessage([d] as any, websocket);
        //   }
        // } else {
        //   parseTextMessage(e.data);
        // }
        onMessage(e, websocket);
      };
    }
  }, [onMessage]);

  return null;
};

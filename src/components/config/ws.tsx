import { useEffect } from "react";
import { KiteTicker } from "../../../server/kite-connect/kite-ticker";

// import {
//   WebSocketProvider,
//   useWebSocket,
// } from "../../hooks/websocket/useWebsocket";

export default function WebSocketDemo () {
  // const { sendMessage } = useWebSocket((response) => {
  //   console.log("response", response);
  // });

  function subscribe() {
    const niftyFuturesInstrumentToken = 8972290;
    KiteTicker.subscribe([niftyFuturesInstrumentToken]);

    KiteTicker.getTickerInstance().on("ticks", async (ticks) => {
      console.log("ticks", ticks);
      // const tick = getTickValue(ticks, niftyFuturesInstrumentToken);
      // if (tick) {
      //   logTicksToCsv(niftyFuturesInstrumentToken, tick);
      //   await handleOnTick(ticks);
      // }
    });
  }
  // useEffect(())

  return (
    <div>
      {/* <WebSocketProvider>Web socket testing</WebSocketProvider> */}

      <button onClick={subscribe}>Click Me to change Socket Url</button>
      {/*<button
        onClick={handleClickSendMessage}
        disabled={readyState !== ReadyState.OPEN}
      >
        Click Me to send 'Hello'
      </button>
      <span>The WebSocket is currently {connectionStatus}</span> */}
      {/* {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
      <ul>
        {messageHistory.map((message, idx) => (
          <span key={idx}>{message ? message.data : null}</span>
        ))}
      </ul> */}
    </div>
  );
};

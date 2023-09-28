import { Box } from '@mantine/core';
import { useCallback, useContext, useEffect, useState } from 'react';
import { IChartApi, OhlcData } from 'lightweight-charts';
import { ChartContainer } from '../../charts/chart-container';
import { CandlestickComponent } from '../../charts/candlestick-component';
import { calculateSMA } from '../../../algo/calculateSMA';
import { LineComponent } from '../../charts/line-component';
import { WebsocketContext } from '../../../store/websocket-provider';

interface IFtRenkoChart {
  brickSize: number;
  tickerId: string;
  exchange: string;
}
export const FtRenkoChart = (props: IFtRenkoChart) => {
  const { socket, socketData } = useContext(WebsocketContext);
  const [chart, setChart] = useState<IChartApi>();
  const [data, setData] = useState({ data: [], sma: [], sma2: [] });
  // const [index, setIndex] = useState(0);

  const handleOnInit = useCallback(chartInfo => {
    if (chartInfo) {
      setChart(chartInfo);
    }
  }, []);

  const updateData = (price: number) => {
    setData(prevData => {
      const prevSma2 = prevData.sma2[prevData.sma2.length - 1];
      const time = prevSma2?.time ? prevSma2.time + 1 : Date.now();
      let candle = null;
      if (prevData.data.length === 0) {
        candle = createCandle(price, price, price, price, Date.now());

        // return [...prevData, candle];
      } else {
        const previousCandle = prevData.data[prevData.data.length - 1];
        console.log(
          'price >= previousCandle.close + props.brickSize',
          price >= previousCandle.close + props.brickSize,
          price <= previousCandle.close - props.brickSize,
        );
        if (price >= previousCandle.close + props.brickSize) {
          candle = createCandle(price, price, previousCandle.close, previousCandle.close, time);

          // return [...prevData, candle];
        } else if (price <= previousCandle.close - props.brickSize) {
          candle = createCandle(price, previousCandle.close, previousCandle.close, price, time);

          // return [...prevData, candle];
        }

        // return prevData;
      }

      if (candle) {
        return {
          data: [...prevData.data, { ...candle }],
          sma: [
            ...prevData.sma,
            {
              time,
              value: calculateSMA(price, prevData.sma[prevData.sma.length - 1]?.value || price, prevData.sma.length, 9),
            },
          ],
          sma2: [
            ...prevData.sma2,
            { time, value: calculateSMA(price, prevSma2?.value || price, prevData.sma2.length, 18) },
          ],
        };
      } else {
        return prevData;
        // return {
        //   data: [...prevData.data],
        //   sma: [...prevData.sma],
        //   sma2: [
        //     ...prevData.sma2,
        //     { time, value: calculateSMA(price, prevSma2?.value || price, prevData.sma2.length, 29) },
        //   ],
        // };
      }
    });
  };

  useEffect(() => {
    if (props.tickerId && socket) {
      if (socket.readyState === socket.OPEN) {
        socket.send(
          JSON.stringify({
            k: `${props.exchange}|${props.tickerId}#`,
            t: 't',
          }),
        );
      }
    }

    return () => {
      if (socket)
        socket.send(
          JSON.stringify({
            k: `${props.exchange}|${props.tickerId}#`,
            t: 'u',
          }),
        );
    };
  }, [socket]);

  useEffect(() => {
    const tick: any = socketData[props.tickerId];
    if (tick && tick.tk === props.tickerId && tick.lp) {
      updateData(parseFloat(tick.lp));
    }
  }, [socketData[props.tickerId]]);

  return (
    <Box>
      <Box>
        <ChartContainer id={'985458474'} onInit={handleOnInit} />
        {chart && <CandlestickComponent chart={chart} data={data.data} />}
        {chart && <LineComponent chart={chart} data={data.sma} options={{ color: 'rgba(250, 111, 0, 1)' }} />}
        {chart && <LineComponent chart={chart} data={data.sma2} />}
      </Box>
    </Box>
  );
};

function createCandle(close, high, open, low, time): OhlcData {
  return {
    close,
    high,
    low,
    open,
    time,
  };
}

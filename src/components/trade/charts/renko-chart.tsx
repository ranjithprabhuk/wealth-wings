import { Box } from '@mantine/core';
import { useCallback, useContext, useEffect, useState } from 'react';
import { IChartApi, OhlcData } from 'lightweight-charts';
import { ChartContainer } from '../../charts/chart-container';
import { CandlestickComponent } from '../../charts/candlestick-component';
import { calculateSMA } from '../../../algo/calculateSMA';
import { LineComponent } from '../../charts/line-component';
import { WebsocketContext } from '../../../store/websocket-provider';

interface IRenkoChart {
  brickSize: number;
  tickerId: string;
  exchange: string;
}
export const RenkoChart = (props: IRenkoChart) => {
  const { socketData, subscribeToInstrument, unSubscribeToInstrument } = useContext(WebsocketContext);
  const [chart, setChart] = useState<IChartApi>();
  const [data, setData] = useState({ candle: [], sma: [], sma2: [] });

  const handleOnInit = useCallback(chartInfo => {
    if (chartInfo) {
      setChart(chartInfo);
    }
  }, []);

  const updateData = (price: number) => {
    setData(prevData => {
      const prevSma2 = prevData.sma2[prevData.sma2.length - 1];
      const time = prevSma2?.time ? prevSma2.time + 1 : Date.now();
      let newCandle = null;
      if (prevData.candle.length === 0) {
        newCandle = createCandle(price, price, price, price, Date.now());
      } else {
        const previousCandle = prevData.candle[prevData.candle.length - 1];

        if (previousCandle.open > previousCandle.close) {
          if (price >= previousCandle.close + 2 * props.brickSize) {
            newCandle = createCandle(price, previousCandle.close, price, previousCandle.open, time);
          } else if (price <= previousCandle.close - props.brickSize) {
            newCandle = createCandle(price, previousCandle.close, price, previousCandle.close, time);
          }
        } else {
          if (price >= previousCandle.close + props.brickSize) {
            newCandle = createCandle(price, price, previousCandle.close, previousCandle.close, time);
          } else if (price <= previousCandle.close - 2 * props.brickSize) {
            newCandle = createCandle(price, previousCandle.open, price, previousCandle.open, time);
          }
        }
      }

      if (newCandle) {
        return {
          candle: [...prevData.candle, { ...newCandle }],
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
      }
    });
  };

  useEffect(() => {
    if (props.tickerId) {
      subscribeToInstrument(props.exchange, props.tickerId);
    }

    return () => {
      unSubscribeToInstrument(props.exchange, props.tickerId);
    };
  }, []);

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
        {chart && <CandlestickComponent chart={chart} data={data.candle} />}
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

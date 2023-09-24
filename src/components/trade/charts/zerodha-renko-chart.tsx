import { Box } from '@mantine/core';
import { useCallback, useEffect, useState } from 'react';
import { IChartApi, OhlcData } from 'lightweight-charts';
import { ChartContainer } from '../../charts/chart-container';
import { CandlestickComponent } from '../../charts/candlestick-component';
import { KiteTicker } from '../../../kite-connect/kite-ticker';
import { getTickValue } from '../../../kite-connect/getTickValue';
import { calculateSMA } from '../../../algo/calculateSMA';
import { LineComponent } from '../../charts/line-component';

interface IZerodhaRenkoChart {
  brickSize: number;
  tickerId: number;
}
export const ZerodhaRenkoChart = (props: IZerodhaRenkoChart) => {
  const [chart, setChart] = useState<IChartApi>();
  const [data, setData] = useState({ data: [], sma: [], sma2: [] });
  // const [index, setIndex] = useState(0);

  const handleOnInit = useCallback(chartInfo => {
    if (chartInfo) {
      setChart(chartInfo);
    }
  }, []);

  const updateData = (price: number) => {
    // const time = Date.now() ;

    // setData(prevData => {
    //   const prevSma = prevData.sma[prevData.sma.length - 1];
    //   const time = prevSma?.time ? prevSma.time + 1 : Date.now();

    //   const updatedPrice = [...prevData.price, { time, value: price }];
    //   const updatedSma = [
    //     ...prevData.sma,
    //     { time, value: calculateSMA(price, prevSma?.value, prevData.sma.length, 9) },
    //   ];

    //   return { price: updatedPrice, sma: updatedSma };
    // });

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
    if (props.tickerId) {
      // KiteTicker.subscribe([props.tickerId]);

      KiteTicker.getTickerInstance().on('ticks', async ticks => {
        if (ticks && ticks.length > 0) {
          const tick = getTickValue(ticks, props.tickerId);
          if (tick) {
            updateData(tick.last_price);
          }
        }
      });
    }

    // return () => {
    //   KiteTicker.unsubscribe([props.tickerId]);
    // };
  }, []);

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

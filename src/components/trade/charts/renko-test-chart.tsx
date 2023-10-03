import { Box } from '@mantine/core';
import { useCallback, useEffect, useState } from 'react';
import { IChartApi, OhlcData } from 'lightweight-charts';
import { calculateSMA } from '../../../algo/calculateSMA';
import { ChartContainer } from '../../charts/chart-container';
import { CandlestickComponent } from '../../charts/candlestick-component';
import { niftyData } from '../stock-charts/nifty-data';
import { LineComponent } from '../../charts/line-component';
import { calculateStandardDeviation } from '../../../algo/calculateStandardDeviation';

let index = 0;
let interval = null;
const initialData = { candle: [], sma: [], sma2: [], sma3: [], bollingerBand: { upper: [], lower: [], middle: [] } };
interface IRenkoCharts {
  brickSize: number;
}
export const RenkoTestChart = (props: IRenkoCharts) => {
  const [chart, setChart] = useState<IChartApi>();
  const [data, setData] = useState(initialData);
  // const [index, setIndex] = useState(0);

  const handleOnInit = useCallback(chartInfo => {
    if (chartInfo) {
      setChart(chartInfo);
    }
  }, []);

  const updateData = () => {
    const price = niftyData[index]?.price;
    if (!price) {
      clearInterval(interval);
    }
    index++;

    setData(prevData => {
      let newCandle = null;
      const prevSma2 = prevData.sma2[prevData.sma2.length - 1];
      const time = prevSma2?.time ? prevSma2.time + 1 : Date.now();

      if (prevData.candle.length === 0) {
        newCandle = createCandle(price, price, price, price, time);
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
        const sma20 = calculateSMA(
          price,
          prevData.bollingerBand.middle[prevData.sma.length - 1]?.value || price,
          prevData.sma.length,
          20,
        );
        const standardDeviation = calculateStandardDeviation(
          prevData.candle.map(c => c.close),
          20,
        );
        return {
          candle: [...prevData.candle, { ...newCandle }],
          bollingerBand: {
            lower: [
              ...prevData.bollingerBand.lower,
              {
                time,
                value: sma20 - standardDeviation,
              },
            ],
            upper: [
              ...prevData.bollingerBand.upper,
              {
                time,
                value: sma20 + standardDeviation,
              },
            ],
            middle: [
              ...prevData.bollingerBand.middle,
              {
                time,
                value: sma20,
              },
            ],
          },
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
          sma3: [
            ...prevData.sma3,
            {
              time,
              value: calculateSMA(
                price,
                prevData.sma3[prevData.sma3.length - 1]?.value || price,
                prevData.sma3.length,
                27,
              ),
            },
          ],
        };
      } else {
        return prevData;
      }
    });
  };

  useEffect(() => {
    interval = setInterval(() => {
      updateData();
    }, 10);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <Box>
      <Box>
        <ChartContainer id={'12321321'} onInit={handleOnInit} />
        {chart && <CandlestickComponent chart={chart} data={data?.candle || []} />}
        {chart && <LineComponent chart={chart} data={data?.sma || []} options={{ color: 'rgba(0, 255, 47, 1)' }} />}
        {chart && <LineComponent chart={chart} data={data?.sma2 || []} />}
        {chart && <LineComponent chart={chart} data={data?.sma3 || []} options={{ color: 'rgba(250, 111, 0, 1)' }} />}

        {/* {chart && (
          <LineComponent chart={chart} data={data?.bollingerBand.upper || []} options={{ color: 'rgb(255, 0, 255)' }} />
        )}
        {chart && (
          <LineComponent
            chart={chart}
            data={data?.bollingerBand.middle || []}
            options={{ color: 'rgb(255, 128, 0)' }}
          />
        )}
        {chart && (
          <LineComponent chart={chart} data={data?.bollingerBand.lower || []} options={{ color: 'rgb(0, 0, 255)' }} />
        )} */}
      </Box>
    </Box>
  );
};

function createCandle(close, high, low, open, time): OhlcData {
  return {
    close,
    high,
    low,
    open,
    time,
  };
}

import { Box } from '@mantine/core';
import { useCallback, useEffect, useState } from 'react';
import { IChartApi } from 'lightweight-charts';
import { calculateSMA } from '../../../algo/calculateSMA';
import { ChartContainer } from '../../charts/chart-container';
import { AreaComponent } from '../../charts/area-component';
import { BaselineComponent } from '../../charts/baseline-component';
import { niftyData } from '../stock-charts/nifty-data';

let index = 0;
let interval = null;

export const TickerTestChart = () => {
  const [chart, setChart] = useState<IChartApi>();
  const [data, setData] = useState({ price: [], sma: [] });

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
      const prevSma = prevData.sma[prevData.sma.length - 1];
      const time = prevSma?.time ? prevSma.time + 1 : Date.now();

      const updatedPrice = [...prevData.price, { time, value: price }];
      const updatedSma = [
        ...prevData.sma,
        { time, value: calculateSMA(price, prevSma?.value, prevData.sma.length, 20) },
      ];

      return { price: updatedPrice, sma: updatedSma };
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
        <ChartContainer id={'1234'} onInit={handleOnInit} />
        {chart && <AreaComponent chart={chart} data={data.price} />}
        {chart && <BaselineComponent chart={chart} data={data.sma} />}
      </Box>
    </Box>
  );
};

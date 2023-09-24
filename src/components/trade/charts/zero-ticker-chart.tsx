import { Box } from '@mantine/core';
import { useCallback, useEffect, useState } from 'react';
import { IChartApi } from 'lightweight-charts';
import { calculateSMA } from '../../../algo/calculateSMA';
import { ChartContainer } from '../../charts/chart-container';
import { AreaComponent } from '../../charts/area-component';
import { BaselineComponent } from '../../charts/baseline-component';
import { KiteTicker } from '../../../kite-connect/kite-ticker';
import { getTickValue } from '../../../kite-connect/getTickValue';

interface IZerodhaTickerChart {
  tickerId: number;
}

export const ZerodhaTickerChart = (props: IZerodhaTickerChart) => {
  const [chart, setChart] = useState<IChartApi>();
  const [data, setData] = useState({ price: [], sma: [] });

  const handleOnInit = useCallback(chartInfo => {
    if (chartInfo) {
      setChart(chartInfo);
    }
  }, []);

  const updateData = price => {
    // const time = Date.now() ;

    setData(prevData => {
      const prevSma = prevData.sma[prevData.sma.length - 1];
      const time = prevSma?.time ? prevSma.time + 1 : Date.now();

      const updatedPrice = [...prevData.price, { time, value: price }];
      const updatedSma = [
        ...prevData.sma,
        { time, value: calculateSMA(price, prevSma?.value, prevData.sma.length, 29) },
      ];

      return { price: updatedPrice, sma: updatedSma };
    });
  };

  useEffect(() => {
    console.log('tickef', props.tickerId);
    if (props.tickerId) {
      KiteTicker.subscribe([props.tickerId]);

      KiteTicker.getTickerInstance().on('ticks', async ticks => {
        if (ticks && ticks.length > 0) {
          const tick = getTickValue(ticks, props.tickerId);
          if (tick) {
            updateData(tick.last_price);
          }
        }
      });
    }

    return () => {
      KiteTicker.unsubscribe([props.tickerId]);
    };
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

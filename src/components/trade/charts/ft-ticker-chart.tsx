import { Box } from '@mantine/core';
import { useCallback, useContext, useEffect, useState } from 'react';
import { IChartApi } from 'lightweight-charts';
import { calculateSMA } from '../../../algo/calculateSMA';
import { ChartContainer } from '../../charts/chart-container';
import { AreaComponent } from '../../charts/area-component';
import { BaselineComponent } from '../../charts/baseline-component';
import { WebsocketContext } from '../../../store/websocket-provider';

interface IFtTickerChart {
  tickerId: string;
  exchange: string;
}

export const FtTickerChart = (props: IFtTickerChart) => {
  const { socket, socketData } = useContext(WebsocketContext);
  const [chart, setChart] = useState<IChartApi>();
  const [data, setData] = useState({ price: [], sma: [] });

  const handleOnInit = useCallback(chartInfo => {
    if (chartInfo) {
      setChart(chartInfo);
    }
  }, []);

  const updateData = price => {
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
    if (props.tickerId) {
      if (socket) {
        if (socket.readyState === socket.OPEN) {
          console.log('socket.readyState === socket.OPEN', props.tickerId);
          socket.send(
            JSON.stringify({
              k: `${props.exchange}|${props.tickerId}#`,
              t: 't',
            }),
          );
        }
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
    console.log('asdad', socketData, props.tickerId);
    const tick: any = socketData[props.tickerId];
    if (tick && tick.tk === props.tickerId && tick.lp) {
      updateData(parseFloat(tick.lp));
    }
  }, [socketData[props.tickerId]]);

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

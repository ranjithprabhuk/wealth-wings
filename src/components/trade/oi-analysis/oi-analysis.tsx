import { Box, Button, Select } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useContext, useEffect, useState } from 'react';
import { TradeContext } from '../../../store/trade-provider';
import { ChartInterval } from '../../../constants/chart-interval';
import { getInstrumentToken } from '../../../services/zerodha/getInstrumentQuote';
import * as dayjs from 'dayjs';
import { getInstrumentData } from '../../../services/zerodha/getInstrumentData';
import OiAnalysisTable from './oi-analysis-table';
import '@mantine/dates/styles.css';
import TaMath from 'ta-math';
import { TREND } from '../../../enum/trend';

function calculateSuperTrend(high, low, close, atr, period = 10, multiplier = 2) {
  const supertrend = [];
  let prevSupertrend = (high[0] + low[0]) / 2; // Initial supertrend

  for (let i = 0; i < atr.length; i++) {
    const upperBand = (high[i + 1] + low[i + 1]) / 2 + multiplier * atr[i];
    const lowerBand = (high[i + 1] + low[i + 1]) / 2 - multiplier * atr[i];

    let currentSupertrend;
    if (close[i + 1] > prevSupertrend) {
      currentSupertrend = lowerBand;
    } else if (close[i + 1] < prevSupertrend) {
      currentSupertrend = upperBand;
    } else {
      currentSupertrend = prevSupertrend;
    }

    supertrend.push(currentSupertrend);
    prevSupertrend = currentSupertrend;
  }

  return supertrend.reverse();
}

export default function OiAnalysis() {
  const { currentTrend, selectedIndex, selectedFutures, setCurrentTrend } = useContext(TradeContext);
  const [dateValue, setDateValue] = useState<Date | null>(new Date());
  const [selectedChartInterval, setSelectedChartInterval] = useState('minute');
  const [candles, setCandles] = useState([]);
  const [technicalIndicators, setTechnicalIndicators] = useState<Record<string, number[]>>({});

  async function getOiData() {
    if (selectedFutures.exch && selectedFutures.tsym) {
      const instrumentWithExchange = `${selectedIndex.zname}${dayjs(dateValue).format('YYMMM').toUpperCase()}FUT`;
      const zerodhaInstrumentToken = await getInstrumentToken(instrumentWithExchange);
      if (zerodhaInstrumentToken) {
        const instrumentData = await getInstrumentData(
          zerodhaInstrumentToken,
          selectedChartInterval,
          dayjs(dateValue).startOf('day').format('YYYY-MM-DD'),
          dayjs(dateValue).endOf('day').format('YYYY-MM-DD'),
        );

        const technicalAnalysis = new TaMath([...instrumentData.data.candles], simpleFormat);
        const superTrend = calculateSuperTrend(
          technicalAnalysis.$high,
          technicalAnalysis.$low,
          technicalAnalysis.$close,
          technicalAnalysis.atr(10),
          10,
          1,
        );
        const computedCurrentTrend = superTrend[0] < technicalAnalysis?.$close?.reverse()?.[0] ? TREND.UP : TREND.DOWN;

        if (computedCurrentTrend && superTrend[0] && superTrend[1]) {
          if (computedCurrentTrend !== currentTrend) {
            setCurrentTrend(computedCurrentTrend);
          }
        }

        setCandles(instrumentData.data.candles.reverse());
        setTechnicalIndicators({
          rsi: technicalAnalysis.rsi(14).reverse(),
          atr: technicalAnalysis.atr(10).reverse(),
          sd: technicalAnalysis.stdev(10).reverse(),
          superTrend,
        });
      }
    }
  }

  // useEffect(() => {
  //   if (selectedFutures) {
  //     const getOiDataInInterval = setInterval(getOiData, 1000 * 20);

  //     getOiData();
  //     return () => {
  //       clearInterval(getOiDataInInterval);
  //     };
  //   }
  // }, [selectedFutures, selectedChartInterval, selectedIndex, dateValue]);

  return (
    <Box>
      <Box display={'flex'} style={{ justifyContent: 'space-between' }}>
        <Box>
          <DateInput value={dateValue} onChange={setDateValue} placeholder="Date input" />
        </Box>
        <Box>
          <Select
            data={ChartInterval}
            value={selectedChartInterval}
            onChange={setSelectedChartInterval}
            placeholder="Interval"
          />
        </Box>
        <Box>
          <Button onClick={getOiData}>Go</Button>
        </Box>
      </Box>
      <Box>
        {candles.length > 0 ? (
          <OiAnalysisTable candles={candles} technicalIndicators={technicalIndicators} />
        ) : (
          'No data found'
        )}
      </Box>
    </Box>
  );
}

const simpleFormat: any = (x: any) => {
  return {
    length: x.length,
    time: (i: number) => x[i][0],
    open: (i: number) => x[i][1],
    high: (i: number) => x[i][2],
    low: (i: number) => x[i][3],
    close: (i: number) => x[i][4],
    volume: (i: number) => x[i][5],
  };
};

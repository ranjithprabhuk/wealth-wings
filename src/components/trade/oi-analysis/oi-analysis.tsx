import { Box, Button, Select } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useContext, useEffect, useState } from 'react';
import { TradeContext } from '../../../store/trade-provider';
import { ChartInterval } from '../../../constants/chart-interval';
import { getInstrumentQuote } from '../../../services/zerodha/getInstrumentQuote';
import * as dayjs from 'dayjs';
import { getInstrumentData } from '../../../services/zerodha/getInstrumentData';
import OiAnalysisTable from './oi-analysis-table';
import '@mantine/dates/styles.css';
import TaMath from 'ta-math';

export default function OiAnalysis() {
  const { selectedIndex, selectedFutures } = useContext(TradeContext);
  const [dateValue, setDateValue] = useState<Date | null>(new Date());
  const [selectedChartInterval, setSelectedChartInterval] = useState('minute');
  const [candles, setCandles] = useState([]);
  const [technicalIndicators, setTechnicalIndicators] = useState<Record<string, number[]>>({});

  async function getOiData() {
    if (selectedFutures.exch && selectedFutures.tsym) {
      const instrumentWithExchange = `${selectedFutures.exch}:${selectedIndex.zname}${dayjs(dateValue)
        .format('YYMMM')
        .toUpperCase()}FUT`;
      const zerodhaInstrumentQuote = await getInstrumentQuote(instrumentWithExchange);
      const instrumentData = await getInstrumentData(
        zerodhaInstrumentQuote.data[instrumentWithExchange].instrument_token,
        selectedChartInterval,
        dayjs(dateValue).startOf('day').format('YYYY-MM-DD'),
        dayjs(dateValue).endOf('day').format('YYYY-MM-DD'),
      );

      const technicalAnalysis = new TaMath([...instrumentData.data.candles], simpleFormat);

      setCandles(instrumentData.data.candles.reverse());
      setTechnicalIndicators({
        rsi: technicalAnalysis.rsi(14).reverse(),
      });
    }
  }

  useEffect(() => {
    if (selectedFutures) {
      getOiData();
    }
  }, [selectedFutures]);

  return (
    <Box>
      <Box display={'flex'} style={{ justifyContent: 'space-between' }}>
        <Box>
          <DateInput value={dateValue} onChange={setDateValue} label="Date input" placeholder="Date input" />
        </Box>
        <Box>
          <Select
            data={ChartInterval}
            value={selectedChartInterval}
            onChange={setSelectedChartInterval}
            label="Interval"
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

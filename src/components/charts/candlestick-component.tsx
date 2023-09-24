import { useEffect, useState } from 'react';
import { IChartApi, CandlestickSeriesPartialOptions, SeriesDataItemTypeMap, ISeriesApi } from 'lightweight-charts';
import { candlestickSeriesOptions } from './config/candlestickSeriesOptions';

export interface ICandlestickComponent {
  chart: IChartApi;
  data: SeriesDataItemTypeMap['Candlestick'][];
  options?: CandlestickSeriesPartialOptions;
}

export const CandlestickComponent = (props: ICandlestickComponent) => {
  const [chartSeries, setChartSeries] = useState<ISeriesApi<'Candlestick'>>();

  useEffect(() => {
    if (props.chart) {
      const newSeries = props.chart.addCandlestickSeries({
        ...candlestickSeriesOptions,
        ...props.options,
      } as CandlestickSeriesPartialOptions);
      setChartSeries(newSeries);
    }
  }, [props.chart]);

  useEffect(() => {
    if (chartSeries) {
      chartSeries.setData(props.data);
    }
  }, [props.data]);

  return <></>;
};

import { useEffect, useState } from 'react';
import { IChartApi, HistogramSeriesPartialOptions, SeriesDataItemTypeMap, ISeriesApi } from 'lightweight-charts';
import { histogramSeriesOptions } from './config/histogramSeriesOptions';

export interface IHistogramComponent {
  chart: IChartApi;
  data: SeriesDataItemTypeMap['Histogram'][];
  options?: HistogramSeriesPartialOptions;
}

export const HistogramComponent = (props: IHistogramComponent) => {
  const [chartSeries, setChartSeries] = useState<ISeriesApi<'Histogram'>>();

  useEffect(() => {
    if (props.chart) {
      const newSeries = props.chart.addHistogramSeries({
        ...histogramSeriesOptions,
        ...props.options,
      } as HistogramSeriesPartialOptions);
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

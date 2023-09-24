import { useEffect, useState } from 'react';
import { IChartApi, BarSeriesPartialOptions, SeriesDataItemTypeMap, ISeriesApi } from 'lightweight-charts';
import { barSeriesOptions } from './config/barSeriesOptions';

export interface IBarComponent {
  chart: IChartApi;
  data: SeriesDataItemTypeMap['Bar'][];
  options?: BarSeriesPartialOptions;
}

export const BarComponent = (props: IBarComponent) => {
  const [chartSeries, setChartSeries] = useState<ISeriesApi<'Bar'>>();

  useEffect(() => {
    if (props.chart) {
      const newSeries = props.chart.addBarSeries({ ...barSeriesOptions, ...props.options });
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

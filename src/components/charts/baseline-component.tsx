import { useEffect, useState } from 'react';
import { IChartApi, BaselineSeriesPartialOptions, SeriesDataItemTypeMap, ISeriesApi } from 'lightweight-charts';
import { baselineSeriesOptions } from './config/baselineSeriesOptions';

export interface IBaselineComponent {
  chart: IChartApi;
  data: SeriesDataItemTypeMap['Baseline'][];
  options?: BaselineSeriesPartialOptions;
}

export const BaselineComponent = (props: IBaselineComponent) => {
  const [chartSeries, setChartSeries] = useState<ISeriesApi<'Baseline'>>();

  useEffect(() => {
    if (props.chart) {
      const newSeries = props.chart.addBaselineSeries({
        ...baselineSeriesOptions,
        ...props.options,
      } as BaselineSeriesPartialOptions);
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

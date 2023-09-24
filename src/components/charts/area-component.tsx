import { useEffect, useState } from 'react';
import { IChartApi, AreaSeriesPartialOptions, SeriesDataItemTypeMap, ISeriesApi } from 'lightweight-charts';
import { areaSeriesOptions } from './config/areaSeriesOptions';

export interface IAreaComponent {
  chart: IChartApi;
  data: SeriesDataItemTypeMap['Area'][];
  options?: AreaSeriesPartialOptions;
}

export const AreaComponent = (props: IAreaComponent) => {
  const [chartSeries, setChartSeries] = useState<ISeriesApi<'Area'>>();

  useEffect(() => {
    if (props.chart) {
      const newSeries = props.chart.addAreaSeries({
        ...areaSeriesOptions,
        ...props.options,
      } as AreaSeriesPartialOptions);
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

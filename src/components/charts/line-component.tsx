import { useEffect, useState } from 'react';
import { IChartApi, LineSeriesPartialOptions, SeriesDataItemTypeMap, ISeriesApi } from 'lightweight-charts';
import { lineSeriesOptions } from './config/lineSeriesOptions';

export interface ILineComponent {
  chart: IChartApi;
  data: SeriesDataItemTypeMap['Line'][];
  options?: LineSeriesPartialOptions;
}

export const LineComponent = (props: ILineComponent) => {
  const [chartSeries, setChartSeries] = useState<ISeriesApi<'Line'>>();

  useEffect(() => {
    if (props.chart) {
      const newSeries = props.chart.addLineSeries({
        ...lineSeriesOptions,
        ...props.options,
      } as LineSeriesPartialOptions);
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

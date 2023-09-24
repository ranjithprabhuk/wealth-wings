import { useCallback, useEffect, useRef, useState } from 'react';
import { createChart, IChartApi, ChartOptions } from 'lightweight-charts';
import { Box } from '@mantine/core';
import { chartOptions } from './config/chartOptions';

export interface IChartComponent {
  id: string;
  options?: Partial<ChartOptions>;
  onInit: (chart: IChartApi) => void;
}

export const ChartContainer = (props: IChartComponent) => {
  const [chart, setChart] = useState<IChartApi>();
  const chartContainerRef = useRef<HTMLDivElement>();

  const handleResize = useCallback(() => {
    setChart(prev => {
      if (prev) {
        prev.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
      return prev;
    });
  }, []);

  useEffect(() => {
    if (!chart && !chartContainerRef?.current?.children?.length) {
      const createdChart = createChart(chartContainerRef.current, { ...chartOptions, ...props.options });
      createdChart.timeScale().fitContent();
      props.onInit(createdChart);
      setChart(createdChart);
      handleResize();
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (chart) {
        chart.remove();
      }
    };
  }, []);

  return <Box id={`chart-container-${props.id}`} ref={chartContainerRef} style={{ overflow: 'hidden' }} />;
};

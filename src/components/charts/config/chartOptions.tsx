import { ChartOptions, ColorType, CrosshairMode, LineStyle } from 'lightweight-charts';

export const chartOptions: Partial<ChartOptions> = {
  height: 400,
  crosshair: {
    mode: CrosshairMode.Normal,
  } as any,
  layout: {
    background: {
      type: ColorType.Solid,
      color: '#000000',
    },
    textColor: '#d1d4dc',
    fontFamily: '',
    fontSize: 12,
  },
  grid: {
    vertLines: {
      visible: true,
      color: 'rgba(42, 46, 57, 0.5)',
      style: LineStyle.Solid,
    },
    horzLines: {
      visible: true,
      color: 'rgba(42, 46, 57, 0.5)',
      style: LineStyle.Solid,
    },
  },
  // rightPriceScale: {
  //   borderVisible: false,
  // },
  // timeScale: {
  //   borderVisible: false,
  // },
  // crosshair: {
  //   horzLine: {
  //     visible: false,
  //   },
  // },
};

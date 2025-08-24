import { Grid, Skeleton, useMantineTheme, rem } from '@mantine/core';
import { useEffect } from 'react';
import { getInstrumentData } from '../../services/zerodha/getInstrumentData';
import { FyersService } from '../../services/fyers/fyers-service';

const PRIMARY_COL_HEIGHT = rem(300);

export default function Dashboard() {
  const theme = useMantineTheme();
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - ${theme.spacing.md} / 2)`;

  useEffect(() => {
    // getInstrumentData(8980226, '3minute', '2023-10-04', '2023-10-07').then(res => console.log('ree', res));
    FyersService.getHistoricalData({
      symbol: 'NSE:SBIN-EQ',
      resolution: '3',
      date_format: 1,
      range_from: '2023-10-01',
      range_to: '2023-10-07',
    });
  }, []);

  return (
    <Grid gutter="md">
      <Grid.Col>
        <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
      </Grid.Col>
      <Grid.Col span={6}>
        <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
      </Grid.Col>
      <Grid.Col span={6}>
        <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
      </Grid.Col>
    </Grid>
  );
}

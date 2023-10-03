import { Container, Grid, SimpleGrid, Skeleton, useMantineTheme, rem } from '@mantine/core';

const PRIMARY_COL_HEIGHT = rem(300);

export default function Dashboard() {
  const theme = useMantineTheme();
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - ${theme.spacing.md} / 2)`;

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

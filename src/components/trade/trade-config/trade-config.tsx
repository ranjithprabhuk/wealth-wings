import { Box, Grid } from '@mantine/core';
import IndexSelector from './index-selector';
import OrderConfig from './order-config';
import ExpirySelector from './expiry-selector';

export default function TradeConfig() {
  return (
    <Box>
      <Grid>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Box>
            <Box display={'flex'} style={{ justifyContent: 'space-between' }}>
              <IndexSelector />
              <ExpirySelector />
            </Box>
          </Box>
        </Grid.Col>

        <Grid.Col span={'auto'}>
          <OrderConfig />
        </Grid.Col>
        
      </Grid>
    </Box>
  );
}

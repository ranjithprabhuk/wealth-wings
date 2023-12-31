import { useState } from 'react';
import { Box, Accordion } from '@mantine/core';
import TradeConfig from './trade-config/trade-config';
import OptionChain from './option-chain/option-chain';
import OiAnalysis from './oi-analysis/oi-analysis';
import Orders from './orders/orders';

export default function Trade() {
  const [value, setValue] = useState<string[]>(['option-chain', 'orders']);

  return (
    <Box>
      <Box>
        <Box>
          <TradeConfig />
        </Box>
        <Box mt={12}>
          <Accordion multiple value={value} onChange={setValue}>
            <Accordion.Item value="option-chain">
              <Accordion.Control>Option Chain</Accordion.Control>
              <Accordion.Panel>
                <OptionChain />
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="built-up">
              <Accordion.Control>OI Analysis</Accordion.Control>
              <Accordion.Panel>
                <OiAnalysis />
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value="orders">
              <Accordion.Control>Orders</Accordion.Control>
              <Accordion.Panel>
                <Orders />
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </Box>
      </Box>
    </Box>
  );
}

import { Autocomplete, Box, SimpleGrid, TextInput } from '@mantine/core';

export function TradePanel() {
  return (
    <Box>
      <SimpleGrid
        cols={4}
        spacing="lg"
        breakpoints={[
          { maxWidth: 'md', cols: 3, spacing: 'md' },
          { maxWidth: 'sm', cols: 2, spacing: 'sm' },
          { maxWidth: 'xs', cols: 1, spacing: 'sm' },
        ]}
      >
        <div>
          <Box>
            <TextInput label="Nifty FUT" />
          </Box>
        </div>
        <div>
          <Box>
            <TextInput label="Bank Nifty FUT" />
          </Box>
        </div>
        <div>
          <Box>
            <TextInput label="CALL Symbol" />
          </Box>
        </div>
        <div>
          <Box>
            <TextInput label="PUT Symbol" />
          </Box>
        </div>
        <div>
          <Box>
            <TextInput label="Qty" />
          </Box>
        </div>
      </SimpleGrid>
    </Box>
  );
}

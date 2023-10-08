import { Box, Select } from '@mantine/core';
import { useContext, useMemo } from 'react';
import { TradeContext } from '../../../store/trade-provider';

export default function ExpirySelector() {
  const { expiryList, selectedExpiryDate, setSelectedExpiryDate } = useContext(TradeContext);

  async function handleExpiryChange(value: string) {
    const expiryDate = expiryList.find(item => item.exd === value);
    setSelectedExpiryDate(expiryDate);
  }

  const expiryListOptions = useMemo(
    () =>
      expiryList.map(item => {
        return { value: item.exd, label: item.exd };
      }),
    [expiryList],
  );

  return (
    <Box>
      <Select
        placeholder={'Expiry Date'}
        data={expiryListOptions}
        onChange={handleExpiryChange}
        value={selectedExpiryDate?.exd}
      />
    </Box>
  );
}

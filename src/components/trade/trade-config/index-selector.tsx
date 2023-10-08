import { Box, Select } from '@mantine/core';
import { useContext, useEffect, useMemo } from 'react';
import { NseDerivativesIndexList } from '../../../constants/nse-derivatives-index-list';
import { TradeContext } from '../../../store/trade-provider';
import { IInstrument } from '../../../types/instrument';
import { getLinkedScrips } from '../../../services/scrips/getLinkedScrips';

export default function IndexSelector() {
  const { selectedIndex, setSelectedIndex, setSelectedFutures, setSelectedExpiryDate, setFuturesList, setExpiryList } =
    useContext(TradeContext);

  async function handleIndexChange(value: string) {
    const index = NseDerivativesIndexList.find(item => item.token === value);
    const linkedScrips = await getLinkedScrips(index.exch, index.token);
    linkedScrips.opt_exp.sort((a, b) => (new Date(a.exd) < new Date(b.exd) ? -1 : 1));
    linkedScrips.fut.sort((a, b) => (new Date(a.exd) < new Date(b.exd) ? -1 : 1));

    setFuturesList(linkedScrips.fut);
    setExpiryList(linkedScrips.opt_exp);
    setSelectedFutures(linkedScrips.fut[0]);
    setSelectedExpiryDate(linkedScrips.opt_exp[0]);
    setSelectedIndex(index as unknown as IInstrument);
  }

  useEffect(() => {
    handleIndexChange(NseDerivativesIndexList[0].token);
  }, []);

  const indexList = useMemo(
    () =>
      NseDerivativesIndexList.map(item => {
        return { value: item.token, label: item.cname };
      }),
    [],
  );

  return (
    <Box>
      <Select placeholder={'Index'} data={indexList} onChange={handleIndexChange} value={selectedIndex?.token} />
    </Box>
  );
}

import { Table } from '@mantine/core';
import { useContext, useEffect, useState } from 'react';
import { TradeContext } from '../../../store/trade-provider';
import { getQuotes } from '../../../services/scrips/getQuotes';
import { IOptionScrips } from '../../../types/option-scrips';
import { getOptionChain } from '../../../services/scrips/getOptionChain';
import { OptionChainRows } from './option-chain-rows';

export type IOptionList = Record<string, Record<string, IOptionScrips[]>>;

export default function OptionChain() {
  const { selectedFutures, selectedIndex, selectedExpiryDate } = useContext(TradeContext);
  const [optionList, setOptionList] = useState<IOptionList>({});
  const [strikePrice, setStrikePrice] = useState('');

  async function getOptionChainData() {
    if (selectedExpiryDate.exch && selectedExpiryDate.tsym) {
      const price = await (await getQuotes(selectedIndex.exch, selectedIndex.token)).lp;
      setStrikePrice(price);
      getOptionChain(selectedExpiryDate.exch, selectedExpiryDate.tsym, price).then(res => {
        const options = {};
        res.values
          .sort((a, b) => (a.strprc < b.strprc ? -1 : 1))
          .forEach(opt => {
            if (options[opt.strprc]) {
              options[opt.strprc][opt.optt] = opt;
            } else {
              options[opt.strprc] = { [opt.optt]: opt };
            }
          });
        setOptionList(options);
      });
    }
  }

  useEffect(() => {
    if (selectedExpiryDate) {
      getOptionChainData();
    }
  }, [selectedExpiryDate]);

  return (
    <Table.ScrollContainer minWidth={800}>
      <Table verticalSpacing="xs">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>CE Symbol</Table.Th>
            <Table.Th>Buy</Table.Th>
            <Table.Th>Sell</Table.Th>
            <Table.Th style={{ textAlign: 'center' }}>Strike</Table.Th>
            <Table.Th>Buy</Table.Th>
            <Table.Th>Sell</Table.Th>
            <Table.Th>Put Symbol</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <OptionChainRows optionList={optionList} currentStrike={strikePrice} />
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}

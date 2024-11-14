import { Table, Text } from '@mantine/core';
import { OptionsType } from '../../../enum/option-type';
import OrderWidget from '../order-widget';
import { OrderType } from '../../../enum/order-type';
import { IOptionList } from './option-chain';
import classes from './option.module.css';

interface IOptionChainRows {
  optionList: IOptionList;
  currentStrike: string;
}

export function OptionChainRows(props: IOptionChainRows) {
  return Object.keys(props.optionList).map((strikePrice: string) => {
    const option = (props.optionList as any)?.[strikePrice];
    // @ts-ignore
    const isStrikeLine = props.currentStrike - strikePrice > 0 && props.currentStrike - strikePrice < 50;
    return (
      <Table.Tr key={strikePrice}>
        <Table.Td>
          <Text>{option[OptionsType.CE].tsym}</Text>
        </Table.Td>
        <Table.Td>
          <OrderWidget
            currentStrike={strikePrice}
            instrument={option[OptionsType.CE]}
            optionType={OptionsType.CE}
            orderType={OrderType.Buy}
          />
        </Table.Td>
        <Table.Td>
          <OrderWidget
            currentStrike={strikePrice}
            instrument={option[OptionsType.CE]}
            optionType={OptionsType.CE}
            orderType={OrderType.Sell}
          />
        </Table.Td>

        <Table.Td className={isStrikeLine && classes.strike_price_cell} style={{ textAlign: 'center' }}>
          {strikePrice}
        </Table.Td>
        <Table.Td>
          <OrderWidget
            currentStrike={strikePrice}
            instrument={option[OptionsType.PE]}
            optionType={OptionsType.PE}
            orderType={OrderType.Buy}
          />
        </Table.Td>
        <Table.Td>
          <OrderWidget
            currentStrike={strikePrice}
            instrument={option[OptionsType.PE]}
            optionType={OptionsType.PE}
            orderType={OrderType.Sell}
          />
        </Table.Td>
        <Table.Td>
          <Text>{option[OptionsType.PE].tsym}</Text>
        </Table.Td>
      </Table.Tr>
    );
  });
}

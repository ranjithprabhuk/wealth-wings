import { Box, Select } from '@mantine/core';
import { useContext, useMemo, useState } from 'react';
import { OptionsType } from '../../enum/option-type';
import { WebsocketContext } from '../../store/websocket-provider';
import OrderWidget from './order-widget';
import { OrderType } from '../../enum/order-type';
import { IOrderConfiguration } from '../../types/order-configuration';
import { IInstrument } from '../../types/instrument';

interface IOptionsWidget {
  marketWatchList: IInstrument[];
  optionType: OptionsType;
  orderConfig: IOrderConfiguration;
  onSelect?: (selectedOption: IInstrument) => void;
}

export default function OptionWidget(props: IOptionsWidget) {
  const { subscribeToInstrument, unSubscribeToInstrument } = useContext(WebsocketContext);
  const [selectedOption, setSelectedOption] = useState<IInstrument>();

  function handleOptionChange(selectedValue: string) {
    if (selectedOption) {
      unSubscribeToInstrument(selectedOption.exch, selectedOption.token);
    }
    const updatedOption = props.marketWatchList.find(instrument => instrument.token === selectedValue);
    setSelectedOption(props.marketWatchList.find(instrument => instrument.token === selectedValue));
    subscribeToInstrument(updatedOption.exch, updatedOption.token);
  }

  const optionsList = useMemo(() => {
    return props.marketWatchList
      .filter(instrument => instrument.optt === props.optionType)
      .map(instrument => {
        return { label: instrument.dname, value: instrument.token };
      });
  }, [props.marketWatchList]);

  const label = useMemo(() => {
    return props.optionType === OptionsType.CE ? 'Call Symbol' : 'Put Symbol';
  }, [props.optionType]);

  return (
    <Box>
      <Box>
        <Box display={'flex'} style={{ justifyContent: 'space-between' }}>
          {selectedOption && (
            <Box>
              <OrderWidget optionType={props.optionType} orderType={OrderType.Buy} instrument={selectedOption} />
            </Box>
          )}
          <Box style={{ width: 260 }}>
            <Select
              placeholder={label}
              data={optionsList || []}
              onChange={handleOptionChange}
              value={selectedOption?.token}
            />
          </Box>
          <Box>
            {selectedOption && (
              <OrderWidget optionType={props.optionType} orderType={OrderType.Sell} instrument={selectedOption} />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

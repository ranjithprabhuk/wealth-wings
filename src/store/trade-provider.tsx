import { createContext, useState } from 'react';
import { ProductName } from '../enum/product-name';
import { ProductType } from '../enum/product-type';
import { IOrderConfiguration } from '../types/order-configuration';
import { IInstrument } from '../types/instrument';
import { IFuturesInstrument } from '../types/futures-instrument';
import { IOptionExpiry } from '../types/option-expiry';

interface ITradeContext {
  orderConfig: IOrderConfiguration;
  selectedIndex: IInstrument;
  selectedFutures: IFuturesInstrument;
  selectedExpiryDate: IOptionExpiry;
  futuresList: IFuturesInstrument[];
  expiryList: IOptionExpiry[];
  handleOrderConfigUpdate: (key: string, value: number | string) => void;
  setSelectedIndex: (instrument: IInstrument) => void;
  setSelectedFutures: (instrument: IFuturesInstrument) => void;
  setSelectedExpiryDate: (expiry: IOptionExpiry) => void;
  setFuturesList: (list: IFuturesInstrument[]) => void;
  setExpiryList: (list: IOptionExpiry[]) => void;
}

const initialTradeContextData: ITradeContext = {
  orderConfig: {
    profitTarget: 3,
    stopLoss: 3,
    quantity: 50,
    productName: ProductName.NRML,
    productType: ProductType.Market,
  },
  selectedIndex: null,
  selectedFutures: null,
  selectedExpiryDate: null,
  futuresList: [],
  expiryList: [],
  handleOrderConfigUpdate: () => {},
  setSelectedIndex: () => {},
  setSelectedFutures: () => {},
  setSelectedExpiryDate: () => {},
  setFuturesList: () => {},
  setExpiryList: () => {},
};

export const TradeContext = createContext<ITradeContext>(initialTradeContextData);

export const TradeProvider = ({ children }) => {
  const [selectedIndex, setSelectedIndex] = useState<IInstrument>();
  const [selectedFutures, setSelectedFutures] = useState<IFuturesInstrument>();
  const [selectedExpiryDate, setSelectedExpiryDate] = useState<IOptionExpiry>();
  const [futuresList, setFuturesList] = useState<IFuturesInstrument[]>([]);
  const [expiryList, setExpiryList] = useState<IOptionExpiry[]>([]);
  const [orderConfig, setOrderConfig] = useState<IOrderConfiguration>({
    profitTarget: 3,
    stopLoss: 3,
    quantity: 50,
    productName: ProductName.NRML,
    productType: ProductType.Market,
  });

  function handleOrderConfigUpdate(key: string, value: number | string) {
    setOrderConfig(prevState => {
      return { ...prevState, [key]: value };
    });
  }

  return (
    <TradeContext.Provider
      value={{
        orderConfig,
        selectedIndex,
        selectedFutures,
        selectedExpiryDate,
        futuresList,
        expiryList,
        handleOrderConfigUpdate,
        setSelectedIndex,
        setSelectedFutures,
        setSelectedExpiryDate,
        setFuturesList,
        setExpiryList,
      }}
    >
      {children}
    </TradeContext.Provider>
  );
};

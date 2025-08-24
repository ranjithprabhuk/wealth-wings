import { createContext, useState } from 'react';
import { ProductName } from '../enum/product-name';
import { ProductType } from '../enum/product-type';
import { IOrderConfiguration } from '../types/order-configuration';
import { IInstrument } from '../types/instrument';
import { IFuturesInstrument } from '../types/futures-instrument';
import { IOptionExpiry } from '../types/option-expiry';
import { TREND } from '../enum/trend';

interface ITradeContext {
  orderConfig: IOrderConfiguration;
  selectedIndex: IInstrument;
  selectedFutures: IFuturesInstrument;
  selectedExpiryDate: IOptionExpiry;
  futuresList: IFuturesInstrument[];
  expiryList: IOptionExpiry[];
  recentOrderId: string;
  currentTrend: TREND;
  handleOrderConfigUpdate: (key: string, value: number | string) => void;
  setSelectedIndex: (instrument: IInstrument) => void;
  setSelectedFutures: (instrument: IFuturesInstrument) => void;
  setSelectedExpiryDate: (expiry: IOptionExpiry) => void;
  setFuturesList: (list: IFuturesInstrument[]) => void;
  setExpiryList: (list: IOptionExpiry[]) => void;
  setRecentOrderId: (orderId: string) => void;
  setCurrentTrend: (trend: TREND) => void;
}

export const TradeContext = createContext<ITradeContext>(null);

export const TradeProvider = ({ children }) => {
  const [selectedIndex, setSelectedIndex] = useState<IInstrument>();
  const [selectedFutures, setSelectedFutures] = useState<IFuturesInstrument>();
  const [selectedExpiryDate, setSelectedExpiryDate] = useState<IOptionExpiry>();
  const [futuresList, setFuturesList] = useState<IFuturesInstrument[]>([]);
  const [expiryList, setExpiryList] = useState<IOptionExpiry[]>([]);
  const [recentOrderId, setRecentOrderId] = useState('');
  const [currentTrend, setCurrentTrend] = useState<TREND>(null);
  const [orderConfig, setOrderConfig] = useState<IOrderConfiguration>({
    profitTarget: 5,
    stopLoss: 10,
    quantity: 250,
    productName: ProductName.BO,
    productType: ProductType.Limit,
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
        recentOrderId,
        currentTrend,
        handleOrderConfigUpdate,
        setSelectedIndex,
        setSelectedFutures,
        setSelectedExpiryDate,
        setFuturesList,
        setExpiryList,
        setRecentOrderId,
        setCurrentTrend,
      }}
    >
      {children}
    </TradeContext.Provider>
  );
};

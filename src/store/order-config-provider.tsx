import { createContext, useState } from 'react';
import { ProductName } from '../enum/product-name';
import { ProductType } from '../enum/product-type';
import { IOrderConfiguration } from '../types/order-configuration';

type OrderConfigContextType = {
  orderConfig: IOrderConfiguration;
  handleOrderConfigUpdate: (key: string, value: number | string) => void;
};

export const OrderConfigContext = createContext<OrderConfigContextType>({
  orderConfig: {
    profitTarget: 3,
    stopLoss: 3,
    quantity: 50,
    productName: ProductName.NRML,
    productType: ProductType.Market,
  },
  handleOrderConfigUpdate: () => {},
});

export const OrderConfigProvider = ({ children }) => {
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
    <OrderConfigContext.Provider value={{ orderConfig, handleOrderConfigUpdate }}>
      {children}
    </OrderConfigContext.Provider>
  );
};

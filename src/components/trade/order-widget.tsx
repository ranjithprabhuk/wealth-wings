import { Box, Button } from '@mantine/core';
import { useContext, useEffect, useMemo, useState } from 'react';
import { WebsocketContext } from '../../store/websocket-provider';
import { OrderType } from '../../enum/order-type';
import { placeOrder } from '../../services/order/placeOrder';
import { IMarketWatch } from '../../types/marketwatch';
import { ProductName } from '../../enum/product-name';
import { ProductType } from '../../enum/product-type';
import { RetentionType } from '../../enum/rentention-type';
import { OrderConfiguration } from '../../types/order-configuration';
import { OptionsType } from '../../enum/option-type';

interface IOrderWidget {
  optionType: OptionsType;
  orderType: OrderType;
  instrument: IMarketWatch;
  orderConfig: OrderConfiguration;
}

export default function OrderWidget(props: IOrderWidget) {
  const { socketData } = useContext(WebsocketContext);
  const [price, setPrice] = useState('12.50');

  async function handlePlaceOrder() {
    const { productName, productType, quantity, stopLoss, profitTarget } = props.orderConfig;
    if (props.orderType === OrderType.Buy) {
      if (productName === ProductName.BO) {
        await placeOrder(
          props.instrument.exch,
          props.instrument.tsym,
          quantity.toString(),
          productName,
          productType,
          props.orderType,
          productType === ProductType.Market || productType === ProductType.SL_Market ? '0' : price,
          RetentionType.Day,
          null,
          profitTarget.toString(),
          stopLoss.toString(),
        );
      } else {
        await placeOrder(
          props.instrument.exch,
          props.instrument.tsym,
          quantity.toString(),
          productName,
          productType,
          props.orderType,
          productType === ProductType.Market || productType === ProductType.SL_Market ? '0' : price,
          RetentionType.Day,
          stopLoss.toString(),
        );
      }
    } else {
      await placeOrder(
        props.instrument.exch,
        props.instrument.tsym,
        quantity.toString(),
        productName,
        productType,
        props.orderType,
        productType === ProductType.Market || productType === ProductType.SL_Market ? '0' : price,
        RetentionType.Day,
        stopLoss.toString(),
      );
    }
  }

  const key = useMemo(() => {
    return props.orderType === OrderType.Buy ? 'sp1' : 'bp1';
  }, [props.orderType]);

  useEffect(() => {
    if (key && socketData?.[props.instrument.token] && socketData?.[props.instrument.token]?.[key]) {
      setPrice(socketData?.[props.instrument.token]?.[key]);
    }
  }, [key, socketData?.[props.instrument.token]]);

  return (
    <Box>
      <Button color={props.orderType === OrderType.Buy ? 'green' : 'red'} onClick={handlePlaceOrder}>
        {props.orderType} {price ? ` - ${price}` : ''}
      </Button>
    </Box>
  );
}

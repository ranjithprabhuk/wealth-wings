import { Box, Button } from '@mantine/core';
import { useContext, useEffect, useMemo, useState } from 'react';
import { WebsocketContext } from '../../store/websocket-provider';
import { OrderType } from '../../enum/order-type';
import { placeOrder } from '../../services/order/placeOrder';
import { ProductName } from '../../enum/product-name';
import { ProductType } from '../../enum/product-type';
import { RetentionType } from '../../enum/rentention-type';
import { IOrderConfiguration } from '../../types/order-configuration';
import { OptionsType } from '../../enum/option-type';
import { IInstrument } from '../../types/instrument';
import { TradeContext } from '../../store/trade-provider';

interface IOrderWidget {
  optionType: OptionsType;
  orderType: OrderType;
  instrument: IInstrument;
}

export default function OrderWidget(props: IOrderWidget) {
  const { socketData, subscribeToInstrument, unSubscribeToInstrument } = useContext(WebsocketContext);
  const { orderConfig } = useContext(TradeContext);
  const [price, setPrice] = useState();

  async function handlePlaceOrder() {
    const { productName, productType, quantity, stopLoss, profitTarget } = orderConfig;
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

  useEffect(() => {
    if (props.instrument.exch && props.instrument.token) {
      subscribeToInstrument(props.instrument.exch, props.instrument.token);
    }

    return () => {
      unSubscribeToInstrument(props.instrument.exch, props.instrument.token);
    };
  }, [props.instrument]);

  return (
    <Box>
      <Button size="compact-xs" color={props.orderType === OrderType.Buy ? 'green' : 'red'} onClick={handlePlaceOrder}>
        {props.orderType} {price ? ` - ${price}` : ''}
      </Button>
    </Box>
  );
}

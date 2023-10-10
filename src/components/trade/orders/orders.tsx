import { Box } from '@mantine/core';
import { useContext, useEffect, useState } from 'react';
import { TradeContext } from '../../../store/trade-provider';
import { Order } from '../../../types/order';
import OrderTable from './order-table';
import { getOrderBook } from '../../../services/order/getOrderBook';

export default function Orders() {
  const { recentOrderId } = useContext(TradeContext);
  const [orderList, setOrderList] = useState<Order[]>([]);

  async function getOrderDetails() {
    const orderResponse = await getOrderBook();
    setOrderList(
      // orderResponse.filter(order => order.status === OrderStatus.OPEN || order.status === OrderStatus.TRIGGER_PENDING),
      orderResponse,
    );
  }

  useEffect(() => {
    getOrderDetails();
  }, [recentOrderId]);

  return (
    <Box>
      <Box>{orderList.length > 0 ? <OrderTable orderList={orderList} /> : 'No data found'}</Box>
    </Box>
  );
}

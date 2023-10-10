import { Table } from '@mantine/core';
import { Order } from '../../../types/order';
import { OrderRows } from './order-rows';

interface IOrderTable {
  orderList: Order[];
}

export default function OrderTable(props: IOrderTable) {
  return (
    <Table.ScrollContainer minWidth={800}>
      <Table verticalSpacing={0}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Instrument</Table.Th>
            {/* <Table.Th>Open</Table.Th>
            <Table.Th>High</Table.Th>
            <Table.Th>Low</Table.Th> */}
            <Table.Th>B / S</Table.Th>
            <Table.Th>Product</Table.Th>
            <Table.Th>Qty</Table.Th>
            <Table.Th>Price</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Action</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {props.orderList.map(order => (
            <OrderRows order={order} />
          ))}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}

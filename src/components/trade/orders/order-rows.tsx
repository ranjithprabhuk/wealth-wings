import { Badge, Box, Button, NumberInput, Table, Text, Tooltip } from '@mantine/core';
import { Order } from '../../../types/order';
import { useContext, useEffect, useState } from 'react';
import { modifyOrder } from '../../../services/order/modifyOrder';
import { TradeContext } from '../../../store/trade-provider';
import { IconHelpHexagon } from '@tabler/icons-react';
import { OrderStatus } from '../../../enum/order-status';

interface IOrderRows {
  order: Order;
}

export function OrderRows(props: IOrderRows) {
  return (
    <Table.Tr key={props.order.snonum}>
      <Table.Td>
        <Text>{props.order.dname}</Text>
      </Table.Td>
      <Table.Td>
        <Text>{props.order.trantype}</Text>
      </Table.Td>
      <Table.Td>
        <Text>{props.order.s_prdt_ali}</Text>
      </Table.Td>
      <Table.Td>
        <Text>{props.order.qty}</Text>
      </Table.Td>
      <Table.Td>{props.order.prc}</Table.Td>
      <Table.Td>
        <Box display={'flex'}>
          <Text>{props.order.status}</Text>
          {(props.order.rejreason || props.order.remarks) && (
            <Box ml={4}>
              <Tooltip label={`${props.order.rejreason}\n${props.order.remarks}`}>
                <IconHelpHexagon />
              </Tooltip>
            </Box>
          )}
        </Box>
      </Table.Td>
      <Table.Td>
        {props.order.status === OrderStatus.TRIGGER_PENDING && <ManageStopLoss order={props.order} />}
      </Table.Td>
      <Table.Td></Table.Td>
    </Table.Tr>
  );
}

function ManageStopLoss(props: { order: Order }) {
  const { setRecentOrderId } = useContext(TradeContext);
  const [price, setPrice] = useState<number>(0);

  async function modifyStopLossOrder() {
    const orderUpdateResponse = await modifyOrder(
      props.order.norenordno,
      props.order.exch,
      props.order.tsym,
      props.order.qty,
      props.order.prctyp,
      price.toString(),
      props.order.ret,
      (price + 1).toString(),
    );
    setRecentOrderId(Math.random().toString());
  }

  useEffect(() => {
    setPrice(parseFloat(props.order.prc));
  }, [props.order]);

  return (
    <Box display={'flex'} style={{ alignItems: 'center', justifyContent: 'space-between', width: 150 }}>
      <Box style={{ width: 80 }}>
        <NumberInput size="xs" placeholder="Stop Loss" value={price} onChange={e => setPrice(e as number)} />
      </Box>
      <Button size="compact-sm" onClick={modifyStopLossOrder}>
        Update
      </Button>
    </Box>
  );
}

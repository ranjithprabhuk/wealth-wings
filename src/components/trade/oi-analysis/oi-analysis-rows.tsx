import { Badge, Table, Text } from '@mantine/core';
import dayjs from 'dayjs';

interface IOiAnalysisRows {
  previousCandle: number[];
  candle: number[];
  rsi: number;
}

export function OiAnalysisRows(props: IOiAnalysisRows) {
  return (
    <Table.Tr key={props.candle[0]}>
      <Table.Td>
        <Text>{dayjs(props.candle[0]).format('hh:mm A')}</Text>
      </Table.Td>
      {/* <Table.Td>
        <Text>{props.candle[1]}</Text>
      </Table.Td>
      <Table.Td>
        <Text>{props.candle[2]}</Text>
      </Table.Td>
      <Table.Td>
        <Text>{props.candle[3]}</Text>
      </Table.Td> */}
      <Table.Td>
        <Text>{props.candle[4]}</Text>
      </Table.Td>
      <Table.Td>{volumeInference(props.candle)}</Table.Td>
      {/* <Table.Td>
        <Text>{props.candle[5]}</Text>
      </Table.Td> */}
      <Table.Td>
        <Text>{(props.previousCandle[6] as any) - (props.candle[6] as any)}</Text>
      </Table.Td>
      <Table.Td>{calculateOiInference(props.previousCandle, props.candle)}</Table.Td>
      <Table.Td>
        <Text>{props.rsi}</Text>
      </Table.Td>
    </Table.Tr>
  );
}

function calculateOiInference(previousCandle: number[], candle: number[]) {
  const priceTrend = candle[1] > candle[4] && previousCandle[4] > candle[4];
  const volumeTrend = previousCandle[5] > candle[5];
  const oiTrend = previousCandle[6] - candle[6];

  if (oiTrend !== 0 && (oiTrend >= 10000 || oiTrend <= -10000)) {
    if (priceTrend && oiTrend > 0) {
      return <Badge color="green">Long Buildup</Badge>;
    }

    if (!priceTrend && oiTrend > 0) {
      return <Badge color="red">Short Buildup</Badge>;
    }
  }

  if (!priceTrend && oiTrend < 0) {
    return <Badge color="yellow">Long Unwinding</Badge>;
  }
  if (priceTrend && oiTrend < 0) {
    return <Badge color="yellow">Short Covering</Badge>;
  }
}

function volumeInference(candle: number[]) {
  if (candle[5] > 20000) {
    return <Badge color="green">{candle[5]}</Badge>;
  }
}

import { Badge, Table, Text } from '@mantine/core';
import dayjs from 'dayjs';

interface IOiAnalysisRows {
  previousCandle: number[];
  candle: number[];
  rsi: number;
  atr: number;
  sd: number;
  superTrend: string;
  prevSuperTrend: string;
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
      <Table.Td>
        <Text>{(props.previousCandle[6] as any) - (props.candle[6] as any)}</Text>
      </Table.Td>
      <Table.Td>{calculateOiInference(props.previousCandle, props.candle)}</Table.Td>
      <Table.Td>
        <Badge color={props.superTrend === 'UP' ? 'green' : 'red'}>{props.candle[4]}</Badge>
      </Table.Td>
    </Table.Tr>
  );
}

function calculateOiInference(previousCandle: number[], candle: number[]) {
  const priceTrend = candle[1] > candle[4] || previousCandle[4] > candle[4];
  const oiTrend = previousCandle[6] - candle[6];

  if (oiTrend !== 0) {
    if (priceTrend && oiTrend > 0) {
      return <Badge color="green">Long Buildup</Badge>;
    }

    if (!priceTrend && oiTrend > 0) {
      return <Badge color="red">Short Buildup</Badge>;
    }

    if (!priceTrend && oiTrend < 0) {
      return <Badge color="yellow">Long Unwinding</Badge>;
    }
    if (priceTrend && oiTrend < 0) {
      return <Badge color="yellow">Short Covering</Badge>;
    }
  }
}

function volumeInference(candle: number[]) {
  if (candle[5] > 10000) {
    return <Badge color="green">{candle[5]}</Badge>;
  } else {
    return candle[5];
  }
}

// function calculateTrend(superTrend: string, candle: number[]) {
//   const priceTrend = candle[1] > candle[4] && previousCandle[4] > candle[4];
//   const oiTrend = previousCandle[6] - candle[6];

//   if (superTrend < candle[4]) {
//     return <Badge color="green">Up</Badge>;
//   }

//   return <Badge color="red">Down</Badge>;
// }

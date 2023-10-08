import { Table } from '@mantine/core';
import { OiAnalysisRows } from './oi-analysis-rows';

interface IOiAnalysisTable {
  candles: Array<number[]>;
  technicalIndicators: Record<string, number[]>
}

export default function OiAnalysisTable(props: IOiAnalysisTable) {
  return (
    <Table.ScrollContainer minWidth={800}>
      <Table verticalSpacing="xs">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Time</Table.Th>
            {/* <Table.Th>Open</Table.Th>
            <Table.Th>High</Table.Th>
            <Table.Th>Low</Table.Th> */}
            <Table.Th>Price</Table.Th>
            <Table.Th>Volume</Table.Th>
            <Table.Th>OI</Table.Th>
            <Table.Th>Trend</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {props.candles.map((candle, index) => (
            <OiAnalysisRows candle={candle} previousCandle={props.candles[index - 1] || candle} rsi={props.technicalIndicators.rsi[index]} />
          ))}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}

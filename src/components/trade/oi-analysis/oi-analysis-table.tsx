import { Table } from '@mantine/core';
import { OiAnalysisRows } from './oi-analysis-rows';

interface IOiAnalysisTable {
  candles: Array<number[]>;
  technicalIndicators: Record<string, number[]>;
}

export default function OiAnalysisTable(props: IOiAnalysisTable) {
  return (
    <Table.ScrollContainer minWidth={800}>
      <Table verticalSpacing={0}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Time</Table.Th>
            {/* <Table.Th>Open</Table.Th>
            <Table.Th>High</Table.Th>
            <Table.Th>Low</Table.Th> */}
            <Table.Th>Price</Table.Th>
            <Table.Th>Volume</Table.Th>
            <Table.Th>OI</Table.Th>
            <Table.Th>OI Trend</Table.Th>
            <Table.Th>Super Trend</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {props.candles
            // .filter((d, i) => i < 8)
            .map((candle, index) => (
              <OiAnalysisRows
                candle={candle}
                previousCandle={props.candles[index - 1] || candle}
                rsi={props.technicalIndicators.rsi[index]}
                atr={props.technicalIndicators.atr[index]}
                sd={props.technicalIndicators.sd[index]}
                superTrend={props.technicalIndicators.superTrend[index] < candle[4] ? 'UP' : 'DOWN'}
                prevSuperTrend={
                  props.technicalIndicators.superTrend[index - 1] <
                  (props.candles[index - 1] ? props.candles[index - 1][4] : candle[4])
                    ? 'UP'
                    : 'DOWN'
                }
              />
            ))}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}

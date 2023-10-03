import { Box, NumberInput, Select, Grid, TextInput } from '@mantine/core';
import { useEffect, useMemo, useState } from 'react';
import { getMarketWatchList } from '../../services/market/marketwatch';
import { IMarketWatch } from '../../types/marketwatch';
import OptionWidget from './options-widget';
import { OptionsType } from '../../enum/option-type';
import { OrderConfiguration } from '../../types/order-configuration';
// import { TickerChart } from './charts/ticker-chart';
// import { RenkoChart } from './charts/renko-chart';
import { RenkoTestChart } from './charts/renko-test-chart';
import { ProductName } from '../../enum/product-name';
import { ProductType } from '../../enum/product-type';
import { useHotkeys } from '@mantine/hooks';

export default function Trade() {
  const [marketWatchList, setMarketWatchList] = useState<IMarketWatch[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<string>('2');
  const [orderConfig, setOrderConfig] = useState<OrderConfiguration>({
    profitTarget: 3,
    stopLoss: 3,
    quantity: 50,
    productName: ProductName.NRML,
    productType: ProductType.Market,
  });

  function handleChange(key: string, value: number | string) {
    setOrderConfig(prevState => {
      return { ...prevState, [key]: value };
    });
  }

  async function handleIndexChange(value: string) {
    const response = await getMarketWatchList(value);
    setMarketWatchList(response.values);
    setSelectedIndex(value);
  }

  useEffect(() => {
    handleIndexChange(selectedIndex);
  }, []);

  const selectedFutures = useMemo(() => {
    if (marketWatchList && marketWatchList.length > 0) {
      return marketWatchList.find(instrument => instrument.optt === 'XX' && instrument.instname === 'FUTIDX');
    }
  }, [marketWatchList]);

  return (
    <Box>
      <Box>
        <Box>
          <Grid>
            <Grid.Col span="auto">
              <Box>
                <OptionWidget orderConfig={orderConfig} marketWatchList={marketWatchList} optionType={OptionsType.CE} />
              </Box>
            </Grid.Col>

            <Grid.Col span={{ base: 12, xs: 12, sm: 12, md: 6 }}>
              <Box>
                <Box display={'flex'} style={{ justifyContent: 'space-around' }}>
                  <Box>
                    <Select
                      placeholder={'Index'}
                      data={[
                        { value: '1', label: 'Nifty' },
                        { value: '2', label: 'Bank Nifty' },
                        { value: '3', label: 'Fin Nifty' },
                      ]}
                      onChange={handleIndexChange}
                      value={selectedIndex}
                    />
                  </Box>
                  <Box style={{ width: 80 }}>
                    <NumberInput
                      placeholder="Quantity"
                      value={orderConfig.quantity}
                      onChange={value => handleChange('quantity', value as number)}
                      step={50}
                    />
                  </Box>
                  <Box style={{ width: 80 }}>
                    <NumberInput
                      placeholder="Target"
                      value={orderConfig.profitTarget}
                      onChange={value => handleChange('profitTarget', value as number)}
                      style={{ borderLeft: '3px solid green', borderRadius: 4 }}
                    />
                  </Box>
                  <Box style={{ width: 80 }}>
                    <NumberInput
                      placeholder="Stop Loss"
                      value={orderConfig.stopLoss}
                      onChange={value => handleChange('stopLoss', value as number)}
                      style={{ borderLeft: '3px solid red', borderRadius: 4 }}
                    />
                  </Box>
                  <Box style={{ width: 100 }}>
                    <Select
                      data={Object.keys(ProductName).map(name => {
                        return { value: ProductName[name], label: name };
                      })}
                      placeholder="Product Name"
                      value={orderConfig.productName}
                      onChange={value => handleChange('productName', value)}
                    />
                  </Box>
                  <Box style={{ width: 120 }}>
                    <Select
                      data={[
                        { value: ProductType.Limit, label: 'Limit' },
                        { value: ProductType.Market, label: 'Market' },
                      ]}
                      placeholder="Product Type"
                      value={orderConfig.productType}
                      onChange={value => handleChange('productType', value)}
                    />
                  </Box>
                </Box>
              </Box>
            </Grid.Col>
            <Grid.Col span="auto">
              <OptionWidget orderConfig={orderConfig} marketWatchList={marketWatchList} optionType={OptionsType.PE} />
            </Grid.Col>
          </Grid>
        </Box>
      </Box>
      {false && (
        <Box mt={12}>
          <Box>
            <RenkoTestChart brickSize={3} />
          </Box>
          <Box>{/* <RenkoTestChart brickSize={2} /> */}</Box>
        </Box>
      )}
      {/* <Box mt={12}>
        {selectedFutures?.token && selectedFutures?.exch && (
          <Box>
            <Box>
              <TickerChart exchange={selectedFutures.exch} tickerId={selectedFutures.token} />
            </Box>
            <Box>
              <RenkoChart brickSize={3} exchange={selectedFutures.exch} tickerId={selectedFutures.token} />
            </Box>
          </Box>
        )}
      </Box> */}
    </Box>
  );
}

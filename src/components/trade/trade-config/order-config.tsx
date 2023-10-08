import { Box, NumberInput, Select } from '@mantine/core';
import { useContext } from 'react';
import { TradeContext } from '../../../store/trade-provider';
import { ProductName } from '../../../enum/product-name';
import { ProductType } from '../../../enum/product-type';

export default function OrderConfig() {
  const { orderConfig, handleOrderConfigUpdate, selectedFutures } = useContext(TradeContext);

  function handleChange(key: string, value: number | string) {
    handleOrderConfigUpdate(key, value);
  }

  return (
    <Box display={'flex'} style={{ justifyContent: 'space-around' }}>
      <Box style={{ width: 80 }}>
        <NumberInput
          placeholder="Quantity"
          value={orderConfig.quantity}
          onChange={value => handleChange('quantity', value as number)}
          step={parseInt(selectedFutures?.ls) || 50}
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
  );
}

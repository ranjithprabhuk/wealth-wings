import { ProductName } from '../enum/product-name';
import { ProductType } from '../enum/product-type';

export interface OrderConfiguration {
  profitTarget: number;
  stopLoss: number;
  quantity: number;
  productName: ProductName;
  productType: ProductType;
}

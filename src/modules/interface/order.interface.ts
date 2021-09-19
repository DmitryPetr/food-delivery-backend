import { ProductI } from '@/modules/interface/product.interface';

export interface BasketItemOutputI {
  product: ProductI;
  weight: number;
}

export interface BasketOutputI {
  basket: BasketItemOutputI[];
  extendedOrder: string;
  name: string;
  phone: string;
  district: string;
  street: string;
  house: string;
  flat: string;
}

export interface BasketItemInputServerI {
  productId: string;
  weight: number;
}

export interface BasketInputI {
  basket: BasketItemInputServerI[];
  extendedOrder: string;
  name: string;
  phone: string;
  district: string;
  street: string;
  house: string;
  flat: string;
}

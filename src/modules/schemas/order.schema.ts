import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Product } from '@/modules/schemas/product.schema'
import { BasketItemInputServerI } from "@/modules/interface/order.interface";

export type OrderDocument = Order & Document;

@Schema()
export class OrderBasket {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  productId: string;

  @Prop()
  weight: number;
}

export const OrderBasketSchema = SchemaFactory.createForClass(OrderBasket);

@Schema()
export class Order {
  @Prop( {type: [OrderBasketSchema], defauld: []} )
  basket: BasketItemInputServerI[];

  @Prop()
  extendedOrder: string;

  @Prop()
  name: string;

  @Prop()
  phone: string;

  @Prop()
  district: string;

  @Prop()
  street: string;

  @Prop()
  house: string;

  @Prop()
  flat: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

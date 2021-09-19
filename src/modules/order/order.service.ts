import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as _ from 'lodash'

import { Order, OrderDocument } from '@/modules/schemas/order.schema';
import {
  BasketInputI,
  BasketItemInputServerI,
  BasketItemOutputI,
  BasketOutputI
} from '@/modules/interface/order.interface';
import { ProductService } from "@/modules/product/product.service";

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModule: Model<OrderDocument>,
    private readonly productService: ProductService
  ) {}

  async getAllOrders(): Promise<BasketOutputI[]> {
    const allOrders: BasketInputI[] = await this.orderModule.find().exec();
    const allOrdersOutput: BasketOutputI[] = []
    for (const order of allOrders) {
      allOrdersOutput.push({
        ...(_.pick(order, ['extendedOrder', 'name', 'phone', 'district', 'street', 'house', 'flat', '_id'])),
        basket: await this.getProductsFromBasket(order.basket)
      })
    }
    return allOrdersOutput
  }

  async getOrder(id: string): Promise<BasketOutputI> {
    const order: BasketInputI = await this.orderModule.findById(id);
    return {
      ...(_.pick(order, ['extendedOrder', 'name', 'phone', 'district', 'street', 'house', 'flat', '_id'])),
      basket: await this.getProductsFromBasket(order.basket)
    };
  }

  private async getProductsFromBasket(orderB: BasketItemInputServerI[]):  Promise<BasketItemOutputI[]> {
    const arrayProducts: BasketItemOutputI[] = []
    for (const orderI of orderB) {
      arrayProducts.push({
        product: await this.productService.getProduct(orderI.productId),
        weight: orderI.weight
      })
    }
    return arrayProducts
  }

  async addOrder(addOrder: BasketInputI): Promise<Order> {
    const newUser = new this.orderModule(addOrder);
    return newUser.save();
  }

  async removeOrder(id: string): Promise<Order> {
    return this.orderModule.findByIdAndRemove(id);
  }

  async updateOrder(
    id: string,
    updateOrder: BasketInputI,
  ): Promise<Order> {
    const test = Order
    return this.orderModule.findByIdAndUpdate(id, updateOrder, {
      new: true,
    });
  }
}

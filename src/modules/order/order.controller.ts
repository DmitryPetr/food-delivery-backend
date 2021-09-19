import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common";

import { OrderService } from '@/modules/order/order.service';
import { Order } from '@/modules/schemas/order.schema';
import { BasketInputI, BasketOutputI } from "@/modules/interface/order.interface";

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  getAllOrders(): Promise<BasketOutputI[]> {
    return this.orderService.getAllOrders();
  }

  @Get(':id')
  getOneOrder(@Param('id') id: string): Promise<BasketOutputI> {
    return this.orderService.getOrder(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  addOrder(@Body() addUser: BasketInputI): Promise<Order> {
    return this.orderService.addOrder(addUser);
  }

  @Delete(':id')
  removeOrder(@Param('id') id: string): Promise<Order> {
    return this.orderService.removeOrder(id);
  }

  @Put(':id')
  updateOrderInfo(
    @Body() updateOrder: BasketInputI,
    @Param('id') id: string,
  ): Promise<Order> {
    return this.orderService.updateOrder(id, updateOrder);
  }
}

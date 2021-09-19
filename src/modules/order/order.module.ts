import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from '@/modules/schemas/order.schema';
import { OrderController } from '@/modules/order/order.controller';
import { OrderService } from '@/modules/order/order.service';
import { Product, ProductSchema } from '@/modules/schemas/product.schema';
import { ProductService } from '@/modules/product/product.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: Product.name, schema: ProductSchema }
    ])
  ],
  controllers: [OrderController],
  providers: [OrderService, ProductService],
})
export class OrderModule {}

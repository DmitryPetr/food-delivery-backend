import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { MongooseModule } from '@nestjs/mongoose';

import { CategoriesController } from '@/modules/categories/categories.controller';
import { Categories, CategoriesSchema } from '@/modules/schemas/categories.schema';
import { ProductService } from '@/modules/product/product.service';

import { Product, ProductSchema } from '@/modules/schemas/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Categories.name, schema: CategoriesSchema },
      { name: Product.name, schema: ProductSchema }
    ]),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService, ProductService],
})
export class CategoriesModule {}

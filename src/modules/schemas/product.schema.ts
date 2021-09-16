import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Categories } from '@/modules/schemas/categories.schema';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Categories' })
  categoriesId: string;

  @Prop()
  title: string;

  @Prop()
  price: number;

  @Prop()
  description: string;

  @Prop()
  filePath: string
}

export const ProductSchema = SchemaFactory.createForClass(Product);

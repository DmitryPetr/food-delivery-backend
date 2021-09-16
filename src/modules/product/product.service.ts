import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product, ProductDocument } from '../schemas/product.schema';
import { ProductI, ProductUploadImgI } from "@/modules/interface/product.interface";

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModule: Model<ProductDocument>,
  ) {}

  async getAllProduct(): Promise<Product[]> {
    return this.productModule.find().exec();
  }

  async getProduct(id: string): Promise<Product> {
    return this.productModule.findById(id);
  }

  async addProduct(addUser: ProductI): Promise<Product> {
    const newUser = new this.productModule(addUser);
    return newUser.save();
  }

  async removeProduct(id: string): Promise<Product> {
    return this.productModule.findByIdAndRemove(id);
  }

  async updateProduct(
    id: string,
    updateUser: ProductI | ProductUploadImgI,
  ): Promise<Product> {
    return this.productModule.findByIdAndUpdate(id, updateUser, { new: true });
  }
}

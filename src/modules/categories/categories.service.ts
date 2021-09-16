import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CategoriesI } from '@/modules/interface/categories.interface';
import { Categories, CategoriesDocument } from '@/modules/schemas/categories.schema';
import { ProductService } from '@/modules/product/product.service';
import { ProductI } from '@/modules/interface/product.interface';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Categories.name)
    private readonly categoriesModule: Model<CategoriesDocument>,
    private readonly productService: ProductService
  ) {}

  async getAllCategories(): Promise<Categories[]> {
    return this.categoriesModule.find().exec();
  }

  async getCategory(id: string): Promise<Categories> {
    return this.categoriesModule.findById(id);
  }

  async addCategory(addUser: CategoriesI): Promise<Categories> {
    const newUser = new this.categoriesModule(addUser);
    return newUser.save();
  }

  async removeCategory(id: string): Promise<Categories> {
    const arraProduct: ProductI[] = await this.productService.getAllProduct();
    for (const item of arraProduct) {
      if (item.categoriesId.toString() === id) {
        this.productService.removeProduct(item._id)
      }
    }
    return this.categoriesModule.findByIdAndRemove(id);
  }

  async updateCategory(
    id: string,
    updateUser: CategoriesI,
  ): Promise<Categories> {
    return this.categoriesModule.findByIdAndUpdate(id, updateUser, {
      new: true,
    });
  }
}

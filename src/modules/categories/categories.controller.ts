import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CategoriesService } from '@/modules/categories/categories.service';
import { CategoriesI } from '@/modules/interface/categories.interface';
import { Categories } from '@/modules/schemas/categories.schema';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly сategoriesService: CategoriesService) {}

  @Get()
  getAllCategories(): Promise<Categories[]> {
    return this.сategoriesService.getAllCategories();
  }

  @Get(':id')
  getOneCategory(@Param('id') id: string): Promise<Categories> {
    return this.сategoriesService.getCategory(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  addCategory(@Body() addUser: CategoriesI): Promise<Categories> {
    return this.сategoriesService.addCategory(addUser);
  }

  @Delete(':id')
  removeCategory(@Param('id') id: string): Promise<Categories> {
    return this.сategoriesService.removeCategory(id);
  }

  @Put(':id')
  updateCategoryInfo(
    @Body() updateCategory: CategoriesI,
    @Param('id') id: string,
  ): Promise<Categories> {
    return this.сategoriesService.updateCategory(id, updateCategory);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put, UploadedFile,
  UseInterceptors
} from "@nestjs/common";

import { ProductService } from './product.service';
import { Product } from '@/modules/schemas/product.schema';
import { ProductI, ProductUploadImgI } from "@/modules/interface/product.interface";
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from "multer";
import { Helper } from "@/helper/helpForFile";
import { pathServerDev } from "@/config/mainConfig";

  @Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService,
              ) {}

  @Get()
  getAllProduct(): Promise<Product[]> {
    return this.productService.getAllProduct();
  }

  @Get(':id')
  getOneProduct(@Param('id') id: string): Promise<Product> {
    return this.productService.getProduct(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  addProduct(@Body() addUser: ProductI): Promise<Product> {
    return this.productService.addProduct(addUser);
  }

  @Delete(':id')
  removeProduct(@Param('id') id: string): Promise<Product> {
    return this.productService.removeProduct(id);
  }

  @Put(':id')
  updateProductInfo(
    @Body() updateUser: ProductI,
    @Param('id') id: string,
  ): Promise<Product> {
    return this.productService.updateProduct(id, updateUser);
  }

  @Put(':id/upload_img')
  @UseInterceptors(
    FileInterceptor('files', {
      storage: diskStorage({
        destination: Helper.destinationPath,
        filename: Helper.customFileName,
      }),
    }),
  )
  //@UseInterceptors(FileInterceptor('files', { dest: '@/uploads/' }))
  uploadfile(@UploadedFile() files, @Param('id') id: string): Promise<Product> {
    const updateObj: ProductUploadImgI = {
      filePath: `${pathServerDev}/${files.newName}`
    }
    return this.productService.updateProduct(id, updateObj);
  }

}

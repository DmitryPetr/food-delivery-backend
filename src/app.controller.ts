import { Controller, Get, Post, Put, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { AppService } from '@/app.service';
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { Helper } from "@/helper/helpForFile";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test')
  getTestHello(): string {
    return this.appService.getHelloTest();
  }

  @Post('testUpload')
  @UseInterceptors(
    FileInterceptor('files', {
      storage: diskStorage({
        destination: Helper.destinationPath,
        filename: Helper.customFileName,
      }),
    }),
  )
  //@UseInterceptors(FileInterceptor('files', { dest: '@/uploads/' }))
  uploadfile(@UploadedFiles() files): string {
    console.log('test UploadedFiles main', files)
    return 'success';
  }
}

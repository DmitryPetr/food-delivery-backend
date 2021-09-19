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

import { UserService } from '@/modules/user/user.service';
import { User } from '@/modules/schemas/user.schema';
import { UserI, UserRegisterI } from "@/modules/interface/user.interface";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUser(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getOneUser(@Param('id') id: string): Promise<User> {
    return this.userService.getUser(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  addUser(@Body() addUser: UserRegisterI): Promise<User> {
    console.log('test addUser', addUser);
    return this.userService.addUser(addUser);
  }

  @Delete(':id')
  removeUser(@Param('id') id: string): Promise<User> {
    return this.userService.removeUser(id);
  }

  @Put(':id')
  updateUserInfo(
    @Body() updateUser: UserI,
    @Param('id') id: string,
  ): Promise<User> {
    return this.userService.updateUser(id, updateUser);
  }
}

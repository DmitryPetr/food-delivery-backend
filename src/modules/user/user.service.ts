import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from '@/modules/schemas/user.schema';
import { UserI } from '@/modules/interface/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModule: Model<UserDocument>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.userModule.find().exec();
  }

  async getUser(id: string): Promise<User> {
    return this.userModule.findById(id);
  }

  async addUser(addUser: UserI): Promise<User> {
    const newUser = new this.userModule(addUser);
    return newUser.save();
  }

  async removeUser(id: string): Promise<User> {
    return this.userModule.findByIdAndRemove(id);
  }

  async updateUser(id: string, updateUser: UserI): Promise<User> {
    return this.userModule.findByIdAndUpdate(id, updateUser, { new: true });
  }
}

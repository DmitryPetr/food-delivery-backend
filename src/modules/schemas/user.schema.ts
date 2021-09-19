import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  role: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  district: string;

  @Prop()
  street: string;

  @Prop()
  house: string;

  @Prop()
  flat: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

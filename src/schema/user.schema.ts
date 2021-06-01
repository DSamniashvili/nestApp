import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaFactory } from '@nestjs/mongoose';
import { UserRoles } from 'src/enum/user-roles.enum';

@Schema()
class User {
  @Prop({ required: true, type: 'string' })
  name: string;
  @Prop({ required: true, type: 'string', unique: true })
  email: string;
  @Prop({ required: true, type: 'string' })
  password: string;
  @Prop({ required: true, type: 'date' })
  registrationDate: Date;
  @Prop({ required: true, type: 'string', enum: UserRoles })
  role: UserRoles.admin;
  @Prop({ required: false, type: 'string' })
  token?: string;
  @Prop({ required: true, type: 'string' })
  salt: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

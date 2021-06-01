//  describe a schema
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from 'src/interface/user.interface';

@Schema()
class Song {
  @Prop({ type: 'string' })
  name: string;
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  author: User;
  @Prop({ type: 'string' })
  DateCreated: Date;
}

export const SongSchema = SchemaFactory.createForClass(Song);

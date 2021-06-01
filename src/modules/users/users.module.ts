import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SongSchema } from 'src/schema/song.schema';
import { UserSchema } from 'src/schema/User.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Song', schema: SongSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SongSchema } from 'src/schema/song.schema';
import { UserSchema } from 'src/schema/User.schema';
import { UsersModule } from '../users/users.module';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Song', schema: SongSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    UsersModule,
  ],
  controllers: [SongsController],
  providers: [SongsService],
})
export class SongsModule {}

import { Module } from '@nestjs/common';
import { SongsModule } from './modules/songs/songs.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

// decorator = AppModule is Module type
@Module({
  imports: [
    SongsModule,
    UsersModule,
    MongooseModule.forRoot(
      'mongodb+srv://dea:deadea14@cluster0.55bph.mongodb.net/nestapp?retryWrites=true&w=majority',
    ),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

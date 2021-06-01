import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/DTO/create-user.dto';
import { GetAllSongsDto } from 'src/DTO/get-all-songs.dto';
import { GetAllUserSongsDTO } from 'src/DTO/get-all-user-songs.dto';
import { LoginDTO } from 'src/DTO/login.dto';
import { Song } from 'src/interface/song.interface';
import {
  getErrorMessage,
  getSuccessMessage,
} from 'src/utils/response-functions.utils';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  @UsePipes(ValidationPipe)
  async createUser(@Body() data: CreateUserDto) {
    try {
      const result = await this.usersService.createUser(data);
      return getSuccessMessage(result);
    } catch (err) {
      console.log(err);
      if (err.code === 11000) {
        return getErrorMessage(
          `'Could not create user :: duplicate user :: ' ${err.message}`,
        );
      }
      return getErrorMessage('Could not create user');
    }
  }

  @Get()
  async getAllUsers() {
    const result = await this.usersService.getAllUsers();
    return getSuccessMessage(result);
  }

  @Get(':id/songs')
  @UseGuards(AuthGuard('bearer'))
  async getAllUserSongs(@Req() req) {
    try {
      const result = await this.usersService.getAllUserSongs(req.user.id);
      console.log('resultresultresult', result);
      return getSuccessMessage(result);
    } catch (err) {
      console.log(err);
      getErrorMessage('Could not get user songs');
    }
  }
  @Post('/login')
  async loginUser(@Body() data: LoginDTO) {
    const { email, password } = data;
    try {
      const result = await this.usersService.loginUser(email, password);
      if (result) {
        return getSuccessMessage(result);
      } else {
        console.log('result Could not find user', result);
        return getErrorMessage('Could not find user');
      }
    } catch (err) {
      console.log('result - error', err);
      return getErrorMessage('Could not find user');
    }
  }
}

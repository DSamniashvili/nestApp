import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateSong } from 'src/DTO/create-song.dto';
import { GetAllSongsDto } from 'src/DTO/get-all-songs.dto';
import { UpdateSong } from 'src/DTO/update-song.dto';
import {
  getErrorMessage,
  getSuccessMessage,
} from 'src/utils/response-functions.utils';
import { SongsService } from './songs.service';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {
    //
  }

  @Get()
  @UseGuards(AuthGuard('bearer'))
  async getSongs(@Query() data: GetAllSongsDto) {
    try {
      const result = await this.songsService.getSongs(data);
      return getSuccessMessage(result);
    } catch (err) {
      console.log('error occured: ', err);
      return getErrorMessage(err.message);
    }
  }

  @Get(':id')
  async getSong(@Param('id') id: string) {
    try {
      const result = await this.songsService.getSong(id);
      return getSuccessMessage(result);
    } catch (err) {
      console.log('error occured: ', err);
      return getErrorMessage(err);
    }
  }

  @Post()
  async addSong(@Body() data: CreateSong) {
    try {
      const result = await this.songsService.addSong(data);
      return getSuccessMessage(result);
    } catch (err) {
      console.log('error occured: ', err);
      return getErrorMessage(err.message);
    }
  }

  @Delete(':id')
  async removeSong(@Param('id') id: string) {
    try {
      const result = await this.songsService.removeSong(id);
      return getSuccessMessage(result);
    } catch (err) {
      console.log('error occured: ', err);
      return getErrorMessage(err);
    }
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  async updateSong(@Param('id') id: string, @Body() data: UpdateSong) {
    try {
      const result = await this.songsService.updateSong(id, data);
      return getSuccessMessage(result);
    } catch (err) {
      console.log('error occured: ', err);
      return getErrorMessage(err);
    }
  }
}

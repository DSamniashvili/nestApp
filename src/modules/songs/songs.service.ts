import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSong } from 'src/DTO/create-song.dto';
import { GetAllSongsDto } from 'src/DTO/get-all-songs.dto';
import { UpdateSong } from 'src/DTO/update-song.dto';
import { SongStatus } from 'src/enum/song.status.enum';
import { Song } from 'src/interface/song.interface';
import { User } from 'src/interface/user.interface';

@Injectable()
export class SongsService {
  constructor(
    @InjectModel('Song')
    private songModel: Model<Song>,

    @InjectModel('User')
    private userModel: Model<User>,
  ) {}

  async getSongs(data: GetAllSongsDto): Promise<Song[]> {
    const query = this.songModel.find(data.searchBy);

    if (data.fields) {
      query.select(data.fields);
    }

    if (data.sort) {
      query.sort(data.sort);
    }

    if (data.limit) {
      const page = data.page ? Number(data.page) - 1 : 0;
      const limit = Number(data.limit);

      query.limit(limit);
      query.skip(limit * page);
    } else {
      query.limit(25);
    }

    query.populate('author', 'name');

    const result = await query;

    return result.map((song) => ({
      id: song._id,
      name: song.name,
      author: song.author,
      status: song.status,
      DateCreated: song.DateCreated,
    }));
  }

  async getSong(id): Promise<Song> {
    const foundSong = await this.songModel.findById(id);

    console.log('foundSong', foundSong);

    return {
      id: foundSong.id,
      name: foundSong.name,
      author: foundSong.author,
      status: foundSong.status,
      DateCreated: foundSong.DateCreated,
    };
  }

  async addSong(data: CreateSong) {
    const { name, author, status, token } = data;
    const user = await this.userModel.findById(author);

    if (!user || user.token !== token) {
      throw new Error();
    }

    const createdSong = new this.songModel({
      name,
      author,
      status: status || SongStatus.liked,
      DateCreated: new Date(),
    });

    await createdSong.save();
    return createdSong;
  }

  async removeSong(id: string): Promise<Song> {
    const result = await this.songModel.findByIdAndDelete(id);

    return {
      id: result.id,
      name: result.name,
      author: result.author,
      status: result.status,
      DateCreated: result.DateCreated,
    };
  }

  async updateSong(id: string, data: UpdateSong) {
    const result = await this.songModel.findByIdAndUpdate(
      id,
      data,
      function (err, data) {
        if (err) {
          console.log(err);
        } else {
          console.log('Updated User : ', data);
        }
      },
    );

    return result;
  }
}

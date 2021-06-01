import { IsDate, IsEnum, IsString } from 'class-validator';
import { SongStatus } from 'src/enum/song.status.enum';
import { User } from 'src/interface/user.interface';

export class CreateSong {
  @IsString()
  name: string;
  @IsString()
  author: User;
  @IsEnum(SongStatus)
  status: SongStatus;
  @IsString()
  userId: string;
  @IsDate()
  DateCreated: string;
  @IsString()
  token: string;
}

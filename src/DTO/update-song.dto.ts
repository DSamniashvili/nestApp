import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { SongStatus } from 'src/enum/song.status.enum';
import { User } from 'src/interface/user.interface';

export class UpdateSong {
  @MaxLength(10)
  @IsString()
  @IsOptional()
  name?: string;
  author: User;
  @IsString()
  @IsOptional()
  @IsEnum(SongStatus)
  status?: SongStatus;
}

import { SongStatus } from 'src/enum/song.status.enum';
import { User } from './user.interface';

export interface Song {
  id: string;
  name: string;
  author: User;
  status?: SongStatus;
  DateCreated: string;
}

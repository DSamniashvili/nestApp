import { IsString } from 'class-validator';

export class GetAllUserSongsDTO {
  @IsString()
  token: string;
}

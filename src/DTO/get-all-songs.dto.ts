import { Type } from 'class-transformer';
import {
  IsInt,
  IsOptional,
  IsString,
  Validate,
  ValidateNested,
} from 'class-validator';
import { Song } from 'src/interface/song.interface';
import { User } from 'src/interface/user.interface';

class SearchFields {
  @IsString()
  name: string;

  author: User;
}

export class GetAllSongsDto {
  @IsString()
  @IsOptional()
  sort?: string;
  @IsString({
    each: true,
  })
  @IsOptional()
  fields?: string[];

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  limit?: number;
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  page?: number;

  @Type(() => SearchFields)
  @ValidateNested()
  searchBy: SearchFields;
}

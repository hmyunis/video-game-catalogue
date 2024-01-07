import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @MinLength(4)
  @MaxLength(16)
  username: string;

  @IsString()
  @IsOptional()
  @MinLength(8)
  @MaxLength(32)
  password: string;
}

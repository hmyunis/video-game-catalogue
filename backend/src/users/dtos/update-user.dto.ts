// import { IsEmail, IsString, IsOptional } from 'class-validator';

export class UpdateUserDto {
//   @IsEmail()
//   @IsOptional()
  username: string;

//   @IsString()
//   @IsOptional()
  password: string;
}

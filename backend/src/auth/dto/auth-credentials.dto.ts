import { IsString, MaxLength, MinLength } from 'class-validator';
import { Match } from '../decorators/passMatch.decorator';
export class AuthCredentialDto {
  @IsString()
  @MinLength(4)
  @MaxLength(16)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  password: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Match('password', { message: 'passwords must match' })
  Confirmpassword: string;
}

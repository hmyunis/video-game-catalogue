import { IsString, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto{
    @IsString()
    username: string;

    @MinLength(4)
    @MaxLength(20)
    password: string;
}
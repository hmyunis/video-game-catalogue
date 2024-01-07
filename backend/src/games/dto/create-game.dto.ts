import { IsString, IsDateString } from "class-validator";
export class CreateGameDto {
    @IsString()
    title: string;
    
    @IsString()
    description: string;
    
    @IsString()
    genre: string;
    
    @IsString()
    platform: string;
    
    @IsDateString()
    releaseDate: string;
}
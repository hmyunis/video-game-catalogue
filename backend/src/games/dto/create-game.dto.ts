import { IsString, IsDateString, IsUrl } from "class-validator";
export class CreateGameDto {
    @IsString()
    title: string;
    
    @IsString()
    description: string;
    
    @IsString()
    genre: string;
    
    @IsString()
    platform: string;

    @IsString()
    publisher: string;

    // @IsUrl()
    @IsString()
    imageUrl: string;
    
    @IsDateString()
    releaseDate: string;
}
import { Expose } from "class-transformer";

export class AuthDto {
    @Expose()
    id: number;
    @Expose()
    username: string;
}
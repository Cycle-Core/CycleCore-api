import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateLifelineDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}

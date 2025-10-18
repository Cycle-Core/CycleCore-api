import { IsNotEmpty, IsString } from "class-validator";

export class ImportObjectTypeDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}
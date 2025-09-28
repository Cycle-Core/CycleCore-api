import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateObjectDto {
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'name must not be an empty string' })
    @IsString()
    name: string;

    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'tracker must not be an empty string' })
    tracker: string;

    @IsNumber()
    @IsNotEmpty({message: 'objectTypeId is required'})
    objectTypeId: number;

    @IsNumber()
    @IsOptional()
    lifelineId: number;
}

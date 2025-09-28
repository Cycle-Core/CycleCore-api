import { IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateObjectTypeDto {
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'name must not be an empty string' })
    name: string;
}

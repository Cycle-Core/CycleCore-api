import { IsString, IsNotEmpty, IsInt, IsNumber } from 'class-validator';

export class CreateEpisodeDto {
    @IsString()
    name: string;

    @IsNotEmpty()
    index: number;

    @IsNumber()
    @IsNotEmpty({ message: 'lifelineId is required' })
    lifelineId: number;

    
    data?: Record<string, any>;
}

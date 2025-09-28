import { PartialType } from '@nestjs/mapped-types';
import { CreateLifelineDto } from './create-lifeline.dto';

export class UpdateLifelineDto extends PartialType(CreateLifelineDto) {}

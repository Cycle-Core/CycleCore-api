import { Optional } from "@nestjs/common";

export class UpdateObjectDto{
    @Optional()
    name?: string;
}
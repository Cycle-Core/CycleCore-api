import { Optional } from "@nestjs/common";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ObjectTypeEntity } from "../object-type.entity/object-type.entity";
import { LifelineEntity } from "../lifeline.entity/lifeline.entity";

@Entity()
export class ObjectEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => ObjectTypeEntity, { nullable: true })
    type: ObjectTypeEntity;

    @OneToOne(() => LifelineEntity, { nullable: true })
    lifeline: LifelineEntity;
}

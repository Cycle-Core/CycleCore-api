import { Lifeline } from "src/core/lifelines/entities/lifeline.entity";
import { ObjectEntity } from "../../objects/entities/object.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class ObjectType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => ObjectEntity, (object) => object.objectType)
    objects: ObjectEntity[];

    @OneToMany(() => Lifeline, (lifeline) => lifeline.objectType)
    lifelines: Lifeline[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

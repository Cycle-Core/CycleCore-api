import { Lifeline } from "src/core/lifelines/entities/lifeline.entity";
import { ObjectType } from "../../object-types/entities/object-type.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class ObjectEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => ObjectType, (objectType) => objectType.objects, { eager: true })
    objectType: ObjectType;

    @Column({ nullable: true })
    tracker: string;

    @OneToOne(() => Lifeline, (lifeline) => lifeline.object, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn()
    lifeline: Lifeline;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

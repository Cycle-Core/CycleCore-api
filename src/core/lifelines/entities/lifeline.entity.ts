import { ObjectType } from "src/core/object-types/entities/object-type.entity";
import { Episode } from "../../episodes/entities/episode.entity";
import { ObjectEntity } from "../../objects/entities/object.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Lifeline {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()   
    name: string;

    @OneToOne(() => ObjectEntity, (object) => object.lifeline, { nullable: true })
    object: ObjectEntity;

    @ManyToOne(() => ObjectType, (objectType) => objectType.lifelines, { nullable: true })
    objectType: ObjectType;

    @OneToMany(() => Episode, (episode) => episode.lifeline)
    episodes: Episode[];
    

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

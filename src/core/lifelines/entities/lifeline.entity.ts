import { Episode } from "../../episodes/entities/episode.entity";
import { ObjectEntity } from "../../objects/entities/object.entity";
import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Lifeline {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()   
    name: string;

    @OneToOne(() => ObjectEntity, (object) => object.lifeline, { nullable: false })
    object: ObjectEntity;

    @OneToMany(() => Episode, (episode) => episode.lifeline)
    episodes: Episode[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Obj } from "../obj/obj.entity";
import { EpiSchema } from "../epi-schema/epi-schema.entity";

export class Episode {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    trackerValue: any;

    @Column({ type: 'jsonb', nullable: true })
    attributes: Record<string, any>;

    @ManyToOne(() => Obj, (obj) => obj.episodes)
    obj: Obj;

    @ManyToOne(() => EpiSchema, (epiSchema) => epiSchema.episodes)
    epiSchema: EpiSchema;
}


import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Episode } from "../episode/episode.entity";

export class EpiSchema {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: 'jsonb', nullable: true })
    schema: Record<string, any>;

    @OneToMany(() => Episode, (episode) => episode.epiSchema)
    episodes: Episode[];
}

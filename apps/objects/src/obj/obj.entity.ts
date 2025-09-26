import { Column, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Tracker } from "../tracker/tracker.entity";
import { Episode } from "../episode/episode.entity";
import { ObjType } from "../obj-type/obj-type.entity";
import { Optional } from "@nestjs/common";

export class Obj {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Tracker, (tracker) => tracker.objs)
    @Optional()
    tracker: Tracker;

    @OneToMany(() => Episode, (episode) => episode.obj, { cascade: true })
    episodes: Episode[];

    @ManyToOne(() => ObjType, (objType) => objType.objs)
    objType: ObjType;

}

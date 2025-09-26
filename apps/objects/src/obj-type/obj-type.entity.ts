import { Column, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Obj } from "../obj/obj.entity";
import { Tracker } from "../tracker/tracker.entity";

export class ObjType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Obj, (obj) => obj.objType)
    objs: Obj[];

    @ManyToOne(() => Tracker, (tracker) => tracker.objType)
    tracker: Tracker;


}

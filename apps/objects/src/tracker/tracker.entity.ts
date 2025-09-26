import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Obj } from "../obj/obj.entity";
import { ObjType } from "../obj-type/obj-type.entity";

export class Tracker {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    datatype: string;

    @OneToMany(() => Obj, (obj) => obj.tracker, { cascade: true })
    objs: Obj[];

    @OneToMany(() => ObjType, (objType) => objType.tracker, { cascade: true })
    objType: ObjType[];




}

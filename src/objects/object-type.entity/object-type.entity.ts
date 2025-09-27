import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ObjectEntity } from '../object.entity/object.entity';


@Entity()
export class ObjectTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => ObjectEntity, object => object.type)
  objects: ObjectEntity[];

}

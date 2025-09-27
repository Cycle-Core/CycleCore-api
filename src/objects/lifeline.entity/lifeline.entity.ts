import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from 'typeorm';
import { ObjectEntity } from '../object.entity/object.entity';
import { EpisodeEntity } from '../episode.entity/episode.entity';

@Entity()
export class LifelineEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  tracker: string;

  @OneToOne(() => ObjectEntity, object => object.lifeline, { nullable: true })
  object: ObjectEntity;

  @OneToMany(() => EpisodeEntity, episode => episode.lifeline, { nullable: true })
  episodes: EpisodeEntity[];

}

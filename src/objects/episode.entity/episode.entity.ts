import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index } from 'typeorm';
import { LifelineEntity } from '../lifeline.entity/lifeline.entity';

@Entity()
export class EpisodeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: false })
  index: number;

  @ManyToOne(() => LifelineEntity, lifeline => lifeline.episodes, { nullable: true })
  lifeline: LifelineEntity;
}

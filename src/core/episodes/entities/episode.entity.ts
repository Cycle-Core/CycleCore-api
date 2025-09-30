import { Lifeline } from "../../lifelines/entities/lifeline.entity";
import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Episode {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    index: number;

    @ManyToOne(() => Lifeline, (lifeline) => lifeline.episodes, {
        eager: true,
        nullable: false,
        onDelete: 'CASCADE'
    })
    lifeline: Lifeline;

    @Column({ type: 'jsonb', nullable: true })
    data: Record<string, any>;


    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

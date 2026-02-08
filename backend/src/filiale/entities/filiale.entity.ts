import { Society } from "src/society/entities/society.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('Subsidiaries')
export class Filiale {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'country', type: 'varchar', length: 255, nullable: false })
    country: string


    @ManyToOne(() => Society, { nullable: false })
    @JoinColumn({ name: 'society_id' })
    society: Society

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt?: Date;
}

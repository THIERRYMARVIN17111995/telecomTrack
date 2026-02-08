import { Filiale } from "src/filiale/entities/filiale.entity";
import { Society } from "src/society/entities/society.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('Regions')
export class Region {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
    name: string


    @ManyToOne(() => Filiale, { nullable: false })
    @JoinColumn({ name: 'subsidiaryId' })
    subsidiary: Filiale

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt?: Date;
}

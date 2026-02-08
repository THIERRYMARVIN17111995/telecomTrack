import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { EquipmentCategory } from '../enum/equipment-category.enum';


@Entity('equipments')
export class Equipment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string; // CPRI Cable, Power Cable, Fiber Jumper

    @Column({ nullable: true })
    model: string;

    @Column()
    vendor: string; // Huawei

    @Column({
        type: 'enum',
        enum: EquipmentCategory,
    })
    category: EquipmentCategory;

    @Column()
    unit: string; // meter, piece

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}

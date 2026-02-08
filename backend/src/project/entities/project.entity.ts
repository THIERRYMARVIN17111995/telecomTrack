import { Customer } from 'src/customers/entities/customer.entity';
import { Filiale } from 'src/filiale/entities/filiale.entity';
import { ProjectStatus } from 'src/types/projectStatus';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';


@Entity('projects')
export class Project {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    code: string;

    @Column()
    name: string;

    @ManyToOne(() => Customer, { nullable: false })
    @JoinColumn({ name: 'customer_id' })
    customer: Customer


    @ManyToOne(() => Filiale, { nullable: false })
    @JoinColumn({ name: 'subsidiary_id' })
    subsidiary: Filiale


    @Column({ type: 'date', nullable: true })
    startDate: Date;


    @Column({ type: 'date', nullable: true })
    endDate: Date;


    @Column({
        type: 'enum',
        enum: ProjectStatus,
        default: ProjectStatus.PLANNED,
    })
    status: ProjectStatus;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt?: Date;
}

import { Filiale } from 'src/filiale/entities/filiale.entity';
import { Project } from 'src/project/entities/project.entity';
import { Region } from 'src/regions/entities/region.entity';
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


@Entity("sites")
export class Site {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    code: string;

    @Column()
    siteOwner: string;

    @Column()
    cluster?: string;

    @ManyToOne(() => Region, { nullable: false })
    @JoinColumn({ name: 'region_id' })
    region: Region

    @Column({ nullable: true })
    address?: string;


    @Column('decimal', { precision: 9, scale: 6, nullable: true })
    latitude?: number;

    @Column('decimal', { precision: 9, scale: 6, nullable: true })
    longitude?: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt?: Date;
}

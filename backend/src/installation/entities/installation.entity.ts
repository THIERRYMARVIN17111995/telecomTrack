import { Equipment } from 'src/equipment/entities/equipment.entity';
import { Project } from 'src/project/entities/project.entity';
import { Site } from 'src/sites/entities/site.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';


export enum InstallationStatus {
  ONGOING = 'ONGOING',
  COMPLETED = 'COMPLETED'
}

@Entity('installations')
export class Installation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Project, { eager: true })
  project: Project;

  @ManyToOne(() => Site, { eager: true })
  site: Site;

  // @Column('int')
  // quantity: number;

  // @Column({ type: 'date' })
  // dateInstallation: Date;

  @Column({
    type: 'enum',
    enum: InstallationStatus,
    default: InstallationStatus.ONGOING,
  })
  status: InstallationStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

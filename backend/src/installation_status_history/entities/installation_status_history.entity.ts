import { Equipment } from "src/equipment/entities/equipment.entity";
import { Installation, InstallationStatus } from "src/installation/entities/installation.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('installation_status_history')
export class InstallationStatusHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Installation, { eager: true })
  installation: Installation;

  @ManyToOne(() => Equipment, { eager: true })
  equipment: Equipment;

  @Column({
    type: 'enum',
    enum: InstallationStatus,
  })
  status: InstallationStatus;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  createdBy: string;
}

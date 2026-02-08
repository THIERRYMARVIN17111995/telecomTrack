import { User } from 'src/users/entities/user.entity'
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'

@Entity('society')
export class Society {
  @PrimaryGeneratedColumn('uuid')
  id: string; // ✅ Changed from number to string

  @Column({ name: 'nom_societe', type: 'varchar', length: 255, nullable: false })
  nomSociete: string

  @Column({ type: 'varchar', length: 100, unique: false, nullable: true })
  rccm?: string

  @Column({ type: 'varchar', length: 100, unique: false, nullable: true })
  nui?: string

  @ManyToOne(() => User, { nullable: false }) // ✅ Fixed relation
  @JoinColumn({ name: 'user_id' })
  user: User
}
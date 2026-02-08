import { Filiale } from 'src/filiale/entities/filiale.entity';
import { TeamMember } from 'src/team-member/entities/team-member.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';


@Entity('teams')
export class Team {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Filiale, { nullable: false })
    @JoinColumn({ name: 'subsidiary_id' })
    subsidiary: Filiale

    @Column()
    name: string;

    @Column()
    type: string;

    @Column({ nullable: true })
    description: string;

    @Column()
    nationality: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt?: Date;

    @OneToMany(() => TeamMember, member => member.team)
    members: TeamMember[];
}

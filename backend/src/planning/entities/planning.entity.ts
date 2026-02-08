import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Project } from 'src/project/entities/project.entity';
import { Site } from 'src/sites/entities/site.entity';
import { Team } from 'src/teams/entities/team.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('plannings')
export class Planning {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Project, { nullable: false })
    @JoinColumn({ name: 'project_id' })
    project: Project;

    @Column()
    scope: string;

    @Column()
    activityType: string;

    @Column()
    interventionType: string;

    @ManyToOne(() => Site, { nullable: false })
    @JoinColumn({ name: 'site_ne_id' })
    siteNE: Site;

    @ManyToOne(() => Site, { nullable: true })
    @JoinColumn({ name: 'site_fe_id' })
    siteFE?: Site;

    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: 'user_id' })
    user: User; 



    @ManyToOne(() => Team, { nullable: false })
    @JoinColumn({ name: 'team' })
    team: Team;

    @Column({ type: 'timestamp', nullable: true })
    plannedDate?: Date | null;



    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt?: Date;
}

import { Project } from "src/project/entities/project.entity";
import { Site } from "src/sites/entities/site.entity";
import { CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('projectSite')
export class ProjetSite {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Site, { nullable: false })
    @JoinColumn({ name: 'site_id' })
    site: Site

    @ManyToOne(() => Project, { nullable: false })
    @JoinColumn({ name: 'project_id' })
    project: Project

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt?: Date;
}

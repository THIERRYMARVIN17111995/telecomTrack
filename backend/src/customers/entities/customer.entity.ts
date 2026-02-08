import { Society } from "src/society/entities/society.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('Customers')
export class Customer {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 255 })
    name: string;

    @Column({ length: 100 })
    country: string;

    // Identifiants locaux
    @Column({ length: 50, nullable: true })
    rccm?: string;

    @Column({ length: 50, nullable: true })
    nui?: string;

    // Identifiants internationaux
    @Column({ length: 50, nullable: true })
    siren?: string;

    @Column({ length: 50, nullable: true })
    ein?: string;

    @Column({ length: 50, nullable: true })
    taxId?: string;

    // Contact
    @Column({ length: 255, nullable: true })
    address?: string;

    @Column({ length: 50, nullable: true })
    phone?: string;

    @Column({ length: 100, nullable: true })
    email?: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt?: Date;
}

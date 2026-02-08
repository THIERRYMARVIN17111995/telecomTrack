import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1766784056017 implements MigrationInterface {
    name = 'InitSchema1766784056017'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`userId\` varchar(36) NOT NULL, \`username\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`society\` (\`id\` varchar(36) NOT NULL, \`nom_societe\` varchar(255) NOT NULL, \`rccm\` varchar(100) NULL, \`nui\` varchar(100) NULL, \`user_id\` varchar(36) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Subsidiaries\` (\`id\` varchar(36) NOT NULL, \`country\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`society_id\` varchar(36) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Customers\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`country\` varchar(100) NOT NULL, \`rccm\` varchar(50) NULL, \`nui\` varchar(50) NULL, \`siren\` varchar(50) NULL, \`ein\` varchar(50) NULL, \`taxId\` varchar(50) NULL, \`address\` varchar(255) NULL, \`phone\` varchar(50) NULL, \`email\` varchar(100) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`society\` ADD CONSTRAINT \`FK_f5c5d50f9aa79d984463edfa8ed\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Subsidiaries\` ADD CONSTRAINT \`FK_fdc73f816343d79db85187f1137\` FOREIGN KEY (\`society_id\`) REFERENCES \`society\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Subsidiaries\` DROP FOREIGN KEY \`FK_fdc73f816343d79db85187f1137\``);
        await queryRunner.query(`ALTER TABLE \`society\` DROP FOREIGN KEY \`FK_f5c5d50f9aa79d984463edfa8ed\``);
        await queryRunner.query(`DROP TABLE \`Customers\``);
        await queryRunner.query(`DROP TABLE \`Subsidiaries\``);
        await queryRunner.query(`DROP TABLE \`society\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}

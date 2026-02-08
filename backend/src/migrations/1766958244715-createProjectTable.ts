import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProjectTable1766958244715 implements MigrationInterface {
    name = 'CreateProjectTable1766958244715'

    public async up(queryRunner: QueryRunner): Promise<void> {
      
        await queryRunner.query(`CREATE TABLE \`projects\` (\`id\` varchar(36) NOT NULL, \`code\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`startDate\` date NULL, \`endDate\` date NULL, \`status\` enum ('PLANNED', 'IN_PROGRESS', 'ON_HOLD', 'COMPLETED', 'ACCEPTED', 'CLOSED', 'CANCELLED') NOT NULL DEFAULT 'PLANNED', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`customer_id\` varchar(36) NOT NULL, \`subsidiary_id\` varchar(36) NOT NULL, UNIQUE INDEX \`IDX_d95a87318392465ab663a32cc4\` (\`code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`projectSite\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`site_id\` int NOT NULL, \`project_id\` varchar(36) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);

        await queryRunner.query(`ALTER TABLE \`projects\` ADD CONSTRAINT \`FK_8ee9cae5efccf846467e1cb005c\` FOREIGN KEY (\`customer_id\`) REFERENCES \`Customers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`projects\` ADD CONSTRAINT \`FK_46cd448dad98f5a9cb03b5dc847\` FOREIGN KEY (\`subsidiary_id\`) REFERENCES \`Subsidiaries\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`projectSite\` ADD CONSTRAINT \`FK_aae8c3e25b03d709dbf363c7668\` FOREIGN KEY (\`site_id\`) REFERENCES \`sites\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`projectSite\` ADD CONSTRAINT \`FK_30fa2423aacd34993c4d6ef6851\` FOREIGN KEY (\`project_id\`) REFERENCES \`projects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`projectSite\` DROP FOREIGN KEY \`FK_30fa2423aacd34993c4d6ef6851\``);
        await queryRunner.query(`ALTER TABLE \`projectSite\` DROP FOREIGN KEY \`FK_aae8c3e25b03d709dbf363c7668\``);
        await queryRunner.query(`ALTER TABLE \`projects\` DROP FOREIGN KEY \`FK_46cd448dad98f5a9cb03b5dc847\``);
        await queryRunner.query(`ALTER TABLE \`projects\` DROP FOREIGN KEY \`FK_8ee9cae5efccf846467e1cb005c\``);
          
        await queryRunner.query(`DROP TABLE \`projectSite\``);
        await queryRunner.query(`DROP INDEX \`IDX_d95a87318392465ab663a32cc4\` ON \`projects\``);
        await queryRunner.query(`DROP TABLE \`projects\``);
    }

}

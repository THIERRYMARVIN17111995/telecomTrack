import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRegionsTable1766789905325 implements MigrationInterface {
    name = 'CreateRegionsTable1766789905325'

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`CREATE TABLE \`Regions\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`subsidiaryId\` varchar(36) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Regions\` ADD CONSTRAINT \`FK_1a34a1741ebfe07202749836b4f\` FOREIGN KEY (\`subsidiaryId\`) REFERENCES \`Subsidiaries\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Regions\` DROP FOREIGN KEY \`FK_1a34a1741ebfe07202749836b4f\``);
        await queryRunner.query(`DROP TABLE \`Regions\``);
    
    }

}

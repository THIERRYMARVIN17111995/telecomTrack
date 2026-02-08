import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSitesTable1766957430923 implements MigrationInterface {
    name = 'CreateSitesTable1766957430923'

    public async up(queryRunner: QueryRunner): Promise<void> {
     
        await queryRunner.query(`CREATE TABLE \`sites\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`code\` varchar(255) NOT NULL, \`siteOwner\` varchar(255) NOT NULL, \`cluster\` varchar(255) NOT NULL, \`address\` varchar(255) NULL, \`latitude\` decimal(9,6) NULL, \`longitude\` decimal(9,6) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`region_id\` varchar(36) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`sites\` ADD CONSTRAINT \`FK_101e7e8c9789fb8518e10dbce06\` FOREIGN KEY (\`region_id\`) REFERENCES \`Regions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    
        await queryRunner.query(`ALTER TABLE \`sites\` DROP FOREIGN KEY \`FK_101e7e8c9789fb8518e10dbce06\``);
        await queryRunner.query(`DROP TABLE \`sites\``);
    }

}

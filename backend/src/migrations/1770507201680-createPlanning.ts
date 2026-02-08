import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePlanning1770507201680 implements MigrationInterface {
    name = 'CreatePlanning1770507201680'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`plannings\` (\`id\` varchar(36) NOT NULL, \`scope\` varchar(255) NOT NULL, \`activityType\` varchar(255) NOT NULL, \`interventionType\` varchar(255) NOT NULL, \`plannedDate\` timestamp NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`project_id\` varchar(36) NOT NULL, \`site_ne_id\` int NOT NULL, \`site_fe_id\` int NOT NULL, \`user_id\` varchar(36) NOT NULL, \`team\` varchar(36) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`plannings\` ADD CONSTRAINT \`FK_b2a729a502e4fa1f16bf49e8163\` FOREIGN KEY (\`project_id\`) REFERENCES \`projects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`plannings\` ADD CONSTRAINT \`FK_14e76ac6b5fe9db27c6a6e37f64\` FOREIGN KEY (\`site_ne_id\`) REFERENCES \`sites\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`plannings\` ADD CONSTRAINT \`FK_41569bbfab5f59cd74a9fd621f2\` FOREIGN KEY (\`site_fe_id\`) REFERENCES \`sites\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`plannings\` ADD CONSTRAINT \`FK_74b8aa3026971466a1a90dc67de\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`plannings\` ADD CONSTRAINT \`FK_4e374f05a4cb24858422a7be30a\` FOREIGN KEY (\`team\`) REFERENCES \`teams\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);


    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`ALTER TABLE \`plannings\` DROP FOREIGN KEY \`FK_4e374f05a4cb24858422a7be30a\``);
        await queryRunner.query(`ALTER TABLE \`plannings\` DROP FOREIGN KEY \`FK_74b8aa3026971466a1a90dc67de\``);
        await queryRunner.query(`ALTER TABLE \`plannings\` DROP FOREIGN KEY \`FK_41569bbfab5f59cd74a9fd621f2\``);
        await queryRunner.query(`ALTER TABLE \`plannings\` DROP FOREIGN KEY \`FK_14e76ac6b5fe9db27c6a6e37f64\``);
        await queryRunner.query(`ALTER TABLE \`plannings\` DROP FOREIGN KEY \`FK_b2a729a502e4fa1f16bf49e8163\``);
        
        await queryRunner.query(`DROP TABLE \`plannings\``);

    }

}

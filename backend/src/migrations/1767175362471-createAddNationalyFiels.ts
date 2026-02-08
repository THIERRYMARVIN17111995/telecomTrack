import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAddNationalyFiels1767175362471 implements MigrationInterface {
    name = 'CreateAddNationalyFiels1767175362471'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`teams\` ADD \`nationality\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`team_member\` ADD \`nationality\` varchar(255) NOT NULL`);  
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`team_member\` DROP COLUMN \`nationality\``);
        await queryRunner.query(`ALTER TABLE \`teams\` DROP COLUMN \`nationality\``);
       
    }

}

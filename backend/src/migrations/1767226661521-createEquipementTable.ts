import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEquipementTable1767226661521 implements MigrationInterface {
    name = 'CreateEquipementTable1767226661521'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`equipments\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`model\` varchar(255) NULL, \`vendor\` varchar(255) NOT NULL, \`category\` enum ('RADIO', 'MICROWAVE', 'POWER', 'CABLE', 'CIVIL') NOT NULL, \`unit\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`equipments\``);
    }

}

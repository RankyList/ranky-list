import { MigrationInterface, QueryRunner } from "typeorm";

export class test1668959915654 implements MigrationInterface {
    name = 'test1668959915654'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`tier_list\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`name\` varchar(255) NOT NULL,
                \`description\` varchar(255) NOT NULL,
                \`public\` tinyint NOT NULL DEFAULT 1,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`tier_list\`
            ADD \`slug\` varchar(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`tier_list\`
            ADD UNIQUE INDEX \`IDX_04b0c096ab55b6d368b7e0a93f\` (\`slug\`)
        `);
        await queryRunner.query(`
            ALTER TABLE \`tier_list\`
            ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
        `);
        await queryRunner.query(`
            ALTER TABLE \`tier_list\`
            ADD \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
        `);
        await queryRunner.query(`
            ALTER TABLE \`tier_list\` CHANGE \`description\` \`description\` varchar(255) NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`tier_list\` CHANGE \`description\` \`description\` varchar(255) NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`tier_list\` CHANGE \`description\` \`description\` varchar(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`tier_list\` CHANGE \`description\` \`description\` varchar(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`tier_list\` DROP COLUMN \`updated_at\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`tier_list\` DROP COLUMN \`created_at\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`tier_list\` DROP INDEX \`IDX_04b0c096ab55b6d368b7e0a93f\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`tier_list\` DROP COLUMN \`slug\`
        `);
        await queryRunner.query(`
            DROP TABLE \`tier_list\`
        `);
    }

}

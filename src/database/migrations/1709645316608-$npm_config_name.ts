import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1709645316608 implements MigrationInterface {
    name = ' $npmConfigName1709645316608'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "client_name" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "client_name" SET NOT NULL`);
    }

}

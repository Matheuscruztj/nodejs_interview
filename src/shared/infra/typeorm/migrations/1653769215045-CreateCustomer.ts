import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCustomer1653769215045 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "customers",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "name",
                        type: "varchar"
                    },
                    {
                        name: 'gender',
                        type: 'enum',
                        enum: ["male", "female"]
                    },
                    {
                        name: "name",
                        type: "timestamp"
                    },
                    {
                        name: "city_id",
                        type: "uuid"
                    }
                ],
                foreignKeys: [
                  {
                    name: 'FKCityCustomer',
                    columnNames: ['city_id'],
                    referencedTableName: 'cities',
                    referencedColumnNames: ['id'],
                    onUpdate: 'SET NULL',
                    onDelete: 'SET NULL'
                  }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("customers");
    }
}

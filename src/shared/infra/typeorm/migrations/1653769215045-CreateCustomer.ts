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
                        name: "birth_date",
                        type: "date"
                    },
                    {
                        name: "city_id",
                        type: "uuid"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
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

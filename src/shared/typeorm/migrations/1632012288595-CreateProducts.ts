import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateProducts1632012288595 implements MigrationInterface {

  
    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name:'products',
        columns:[ // Atributos para a coluna id
          {
            name:'id',
            type:'uuid', // id unico ou universal
            isPrimary:true,
            generationStrategy:'uuid',
            default:'uuid_generate_v4()' //
          },{
            name:'name',
            type:'varchar',
          },
          {
            name:'price',
            type:'decimal',
            precision:10,
            scale:2 // Duas casa decimais
          },
          {
            name:'quantity',
            type:'int',
          },
          {
            name:'created_at',
            type:'timestamp with time zone',
            default:'now()'
          },
          {
            name:'updated_at',
            type:'timestamp with time zone',
            default:'now()'
          }
        ]
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('products')
    }

}

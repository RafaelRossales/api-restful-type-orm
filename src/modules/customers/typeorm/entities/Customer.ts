import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


/**
 * @ignore
 */
@Entity('customers')
class Customer {
  @PrimaryGeneratedColumn('uuid')
  id:string;

  @Column()
  name:string;

  @Column()
  email:string;

  @CreateDateColumn()
  created_at:Date;

  @UpdateDateColumn()
  updated_at:Date;
}

export default Customer
;

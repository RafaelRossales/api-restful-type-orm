import Customer from "@modules/customers/typeorm/entities/Customer";
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn } from "typeorm";


/**
 * @ignore
 */
@Entity('orders')
class Order {
  @PrimaryGeneratedColumn('uuid')
  id:string;

  @ManyToOne(() => Customer)
  @JoinColumn({name:'customer_id'})
  customer:Customer;

  @CreateDateColumn()
  created_at:Date;

  @UpdateDateColumn()
  updated_at:Date;
}

export default Order
;

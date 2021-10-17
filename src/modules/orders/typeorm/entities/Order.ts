import Customer from "@modules/customers/typeorm/entities/Customer";
import {
  Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany} from "typeorm";
import OrdersProducts from "./OrdersProducts";


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

  @OneToMany(() => OrdersProducts,order_products => order_products.order, {
    cascade:true // Toda a vez que a ordem for salva as tabelas relacionadas serão atualizadas
  })

  orders_products:OrdersProducts[]

  @CreateDateColumn()
  created_at:Date;

  @UpdateDateColumn()
  updated_at:Date;
}

export default Order
;

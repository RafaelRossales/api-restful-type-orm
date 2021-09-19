import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';


/**
 * @ignore
 */
@Entity('products')

class Product{

  @PrimaryGeneratedColumn('uuid')
  id:string; // tipo string  porque é um uuid

  @Column()
  name:string;

  @Column('decimal')
  price:number;

  @Column('int')
  quantity:number;

  @CreateDateColumn()
  created_at:Date;

  @UpdateDateColumn()
  updated_at:Date
}

export default Product;

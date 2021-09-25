import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, Generated } from "typeorm";


/**
 * @ignore
 */
@Entity('user_tokens')
class UserToken {
  @PrimaryGeneratedColumn('uuid')
  id:string;

  @Column()
  @Generated('uuid')
  token:string;

  @Column()
  user_id:string;

  @CreateDateColumn()
  created_at:Date;

  @UpdateDateColumn()
  updated_at:Date;
}

export default UserToken;

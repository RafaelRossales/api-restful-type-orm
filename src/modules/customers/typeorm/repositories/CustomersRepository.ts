import { EntityRepository, Repository } from "typeorm";
import Customer from "../entities/Customer";


@EntityRepository(Customer)
class CustomersRepository extends Repository<Customer>{

  /**
   *@description
   * @param name
   */
  public async findByName(name:string):Promise<Customer | undefined>{

    const customer = await this.findOne({
      where:{
        name,
      }
    })

    return customer;
  }

    /**
   *@description
   * @param id
   */
  public async findById(id:string):Promise<Customer | undefined>{

    const customer = await this.findOne({
      where:{
        id,
      }
    })

    return customer;
  }

    /**
   *@description
   * @param email
   */
  public async findByEmail(email:string):Promise<Customer | undefined>{

    const customer = await this.findOne({
      where:{
        email,
      }
    })

    return customer;
  }
}

export default CustomersRepository;

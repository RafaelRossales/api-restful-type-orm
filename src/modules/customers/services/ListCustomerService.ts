'use strict'

import { getCustomRepository } from "typeorm"
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from "../typeorm/repositories/CustomersRepository";


interface IPaginateCustomer{
  from:number,
  to:number,
  per_page:number,
  total:number,
  current_page:number | null;
  prev_page:number | null;
  next_page:null
  data:Customer[]

}
/**
 * @description - Serviço de listagem de clientes
 */
class ListCustomerService{

  public async execute():Promise<IPaginateCustomer>{

    const customerRepository = getCustomRepository(CustomersRepository);

    const customers = await customerRepository.createQueryBuilder().paginate();

    return customers as IPaginateCustomer;
  }
}

export default ListCustomerService;

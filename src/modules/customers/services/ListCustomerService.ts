'use strict'

import { getCustomRepository } from "typeorm"
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from "../typeorm/repositories/CustomersRepository";


/**
 * @description - Serviço de listagem de clientes
 */
class ListCustomerService{

  public async execute():Promise<Customer[]>{

    const customerRepository = getCustomRepository(CustomersRepository);

    const customers = await customerRepository.find();

    return customers;
  }
}

export default ListCustomerService;

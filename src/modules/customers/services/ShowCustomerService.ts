'use strict'

import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm"
import Customer from "../typeorm/entities/Customer";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";


interface IResquest{
  id:string;
}

/**
 * @description - Serviço de listagem de cliente
 */
class ShowCostumerService{

  public async execute({id}:IResquest):Promise<Customer>{

    const customerRepository = getCustomRepository(CustomersRepository);

    const customer = await customerRepository.findById(id);

    if(!customer) throw new AppError('Customer not found')

    return customer;
  }
}

export default ShowCostumerService;

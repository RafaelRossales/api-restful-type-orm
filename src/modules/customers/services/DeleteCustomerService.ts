'use strict'

import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm"
import CustomersRepository from "../typeorm/repositories/CustomersRepository";


interface IResquest{
  id:string;
}

/**
 * @description
 */
class DeleteCustomerService{

  public async execute({id}:IResquest):Promise<void>{

    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findById(id);

    if(!customer) throw new AppError('customer not found')

    await customersRepository.remove(customer)
  }
}

export default DeleteCustomerService;

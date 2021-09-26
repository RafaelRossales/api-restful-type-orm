'use strict'

import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm"
import Customer from "../typeorm/entities/Customer";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";

interface IResquest{
  id:string;
  name:string,
  email:string,
}

/**
 * @description
 */
class UpdateCustomerService{

  public async execute({
    id,
    name,
    email,
  }:IResquest):Promise<Customer>{


    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findById(id);

    if(!customer) throw new AppError('customer not found');

    const customerExists = await customersRepository.findByEmail(email);

    if(customerExists && email !== customerExists.email){
        throw new AppError('Email is used already!');
    }

    customer.name = name;
    customer.email = email;

    await customersRepository.save(customer);

    return customer;
  }
}

export default UpdateCustomerService;

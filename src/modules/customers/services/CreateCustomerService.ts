'use strict'

import AppError from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm"
import Customer from "../typeorm/entities/Customer";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";

/**
 * @description - Dados informados pelo usuário
 * @interface
 */
interface IRequest{
  name:string,
  email:string,
}

/**
 * @description - Serviço de criação de produtos
 */
class CreateCustormerService{

  public async execute({name,email}:IRequest):Promise<Customer>{

    const customerRepository =  getCustomRepository(CustomersRepository);
    const emailExists = await customerRepository.findByEmail( email );

    if(emailExists) throw new AppError('This email address already exists!');

    const customer = customerRepository.create({
      name,
      email,
    });

    await customerRepository.save(customer);

    return customer;
  }
}


export default CreateCustormerService;

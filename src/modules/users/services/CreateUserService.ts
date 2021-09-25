'use strict'

import AppError from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm"
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/respositories/UsersRepository";

/**
 * @description - Dados informados pelo usuário
 * @interface
 */
interface IRequest{
  name:string,
  email:string,
  password:string
}

/**
 * @description - Serviço de criação de produtos
 */
class CreateUserService{

  public async execute({name,email,password}:IRequest):Promise<User>{

    const usersRepository =  getCustomRepository(UsersRepository);

    const emailExists = await usersRepository.findByEmail( email );

    if(emailExists) throw new AppError('This email address already exists!');

    const encryptPassword = await hash(password,8);

    const user = usersRepository.create({
      name,
      email,
      password:encryptPassword
    });

    await usersRepository.save(user);

    return user;
  }
}


export default CreateUserService;

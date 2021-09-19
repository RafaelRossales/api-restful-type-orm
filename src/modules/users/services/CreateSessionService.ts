'use strict'

import authConfig from '@config/auth';
import AppError from "@shared/errors/AppError";
import { compare, hash } from "bcryptjs";
import { sign } from 'jsonwebtoken'
import { getCustomRepository } from "typeorm"
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/respositories/UsersRepository";

/**
 * @description - Dados informados pelo usuário
 * @interface
 */
interface IRequest{
  email:string,
  password:string
}

/**
 *
 */
interface IResponse{
  user:User;
  token:string
}

/**
 * @description - Serviço de inicialização de seção
 */
class CreateSessionsService{

  public async execute({email,password}:IRequest):Promise<IResponse>{

    const usersRepository =  getCustomRepository(UsersRepository);
    const user = await usersRepository.findByEmail( email );

    if(!user) throw new AppError('Invalid email or password.',401);

    const passwordConfirm = await compare(password,user.password);

    if(!passwordConfirm) throw new AppError('Invalid email or password.',401);


    const token = sign({},authConfig.jwt.secret,{
      subject: user.id,
      expiresIn:authConfig.jwt.expiresIn
    })

    return {user,token};
  }
}


export default CreateSessionsService;

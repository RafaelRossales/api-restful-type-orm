'use strict'

import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm"
import UsersRepository from "../typeorm/respositories/UsersRepository";
import UserTokenRepository from "../typeorm/respositories/UserTokensRepository";



/**
 * @description - Dados informados pelo usuário
 * @interface
 */
interface IRequest{
  email:string,
}

/**
 * @description - Serviço de criação de produtos
 */
class SendForgotPasswordEmailService{

  public async execute({ email }:IRequest):Promise<void>{

    const usersRepository = getCustomRepository(UsersRepository);
    const userTokenRepository = getCustomRepository(UserTokenRepository);

    const user = await usersRepository.findByEmail(email);

    if(!user) throw new AppError('User does not exists');

    //Se usuário exitir, o token será gerado
    const token = await userTokenRepository.generateToken(user.id);

    console.log(token)

  }
}


export default SendForgotPasswordEmailService;

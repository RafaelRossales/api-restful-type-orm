'use strict'

import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm"
import path from 'path';
import UsersRepository from "../typeorm/respositories/UsersRepository";
import UserTokenRepository from "../typeorm/respositories/UserTokensRepository";
import EtherealMail from '@config/mail/EtherialMail';




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

    const forgorPasswordTemplate = path.resolve(__dirname,'..','views','forgot_password.hbs')

    console.log(forgorPasswordTemplate)

    await EtherealMail.sendMail({
      to:{
        name:user.name,
        email:user.email
      },
      subject:'Redefinição de Senha',
      templateData:{
        file:forgorPasswordTemplate,
        variables:{
          name:user.name,
          link:`http://localhost:3333/reset_password?token=${token.token}`
        }
      }
    })

  }
}


export default SendForgotPasswordEmailService;

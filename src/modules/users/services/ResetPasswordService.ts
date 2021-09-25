'use strict'

import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm"
import UsersRepository from "../typeorm/respositories/UsersRepository";
import UserTokenRepository from "../typeorm/respositories/UserTokensRepository";
import {isAfter,addHours } from 'date-fns'
import { hash } from 'bcryptjs'

/**
 * @description - Dados informados pelo usuário
 * @interface
 */
interface IRequest{
  password:string,
  token:string
}

/**
 * @description - Serviço de criação de produtos
 */
class ResetPasswordService{

  public async execute({ token,password }:IRequest):Promise<void>{
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokenRepository = getCustomRepository(UserTokenRepository);

    const userToken = await userTokenRepository.findByToken(token);

    if(!userToken) throw new AppError('User Token does not exists');

    const user = await usersRepository.findById(userToken.user_id);

    if(!user) throw new AppError('User does not exists');

    //Validação do token
    const tokenCreatedAt = userToken.created_at;
    //Adiciona mais duas horas ao valor que o token foi criado
    const compareDate = addHours(tokenCreatedAt,2);

    if(isAfter(Date.now(),compareDate)){
      throw new AppError('Token expirado')
    }

    user.password = await hash(password,8);

  }


}


export default ResetPasswordService;

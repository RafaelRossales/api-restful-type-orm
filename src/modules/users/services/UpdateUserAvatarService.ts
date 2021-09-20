'use strict'

import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm"
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/respositories/UsersRepository";
import path from 'path'
import uploadConfig from '@config/upload';
import fs from 'fs'
/**
 * @description - Dados informados pelo usuário
 * @interface
 */
interface IRequest{
  user_id:string;
  avatarFilename?: string;
}

/**
 * @description - Serviço de upload de imagens
 */
class UpdateUserAvatarService{

  public async execute({user_id,avatarFilename}:IRequest):Promise<User>{

    const usersRepository =  getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(user_id);

    if(!user) throw new AppError('User not found');

    if(user.avatar){
      const userAvatarFilepath = path.join(uploadConfig.directory,user.avatar);

      const userAvatarFileExists = await fs.promises.stat(userAvatarFilepath);

      if(userAvatarFileExists){
        await fs.promises.unlink(userAvatarFilepath);
      }
    }


    user.avatar = avatarFilename!;

    await usersRepository.save(user);

    return user;

  }
}


export default UpdateUserAvatarService;

import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";
import ListUserService from "../services/ListUserService";
import { classToClass } from 'class-transformer'

export default class UsersController{

  /**
   *
   * @param request
   * @param response
   * @returns User
   */
  public async index(request:Request,response:Response):Promise<Response>{

    const lisUsers = new ListUserService();

    console.log(request)

    const users = await lisUsers.execute();

    return response.json(classToClass(users));
  }

  /**
   *
   * @param request
   * @param response
   * @returns
   */
  public async create(request:Request,response:Response):Promise<Response>{
    const { name, email, password} = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password
    });

    return response.json(classToClass(user));
  }
}

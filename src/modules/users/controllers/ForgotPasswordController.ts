import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";
import ListUserService from "../services/ListUserService";
import SendForgotPasswordEmailService from "../services/SendForgotPasswordEmailService";

export default class ForgotPasswordController{

  /**
   *
   * @param request
   * @param response
   * @returns
   */
  public async create(request:Request,response:Response):Promise<Response>{

    const { email } = request.body;

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService();

    await sendForgotPasswordEmail.execute({ email });

    //204 - Não há conteudo para ser enviado
    return response.status(204).json();
  }
}

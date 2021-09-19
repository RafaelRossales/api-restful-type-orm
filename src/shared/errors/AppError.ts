'use strict'


class AppError{
  //Mensagem para o usuário
  public readonly message:string;
  //Código do estatus
  public readonly statusCode:number;

  /**
   *
   * @param message:string
   * @param statusCode:number
   */
  constructor(message:string,statusCode=400){
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default  AppError;

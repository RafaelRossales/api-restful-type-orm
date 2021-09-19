'use strict'

import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm"
import { ProductRepository } from "../typeorm/repositiories/PoductsRepository";

/**
 * @description - Dados informados pelo usuário
 */
 interface IRequest{
   id:string,
}

/**
 * @description - Serviço de criação de produtos
 */
class DeleteProductService{

  public async execute({id}:IRequest):Promise<void>{

    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);

    if(!product) throw new AppError('Product not found.');

    await productsRepository.remove(product);

  }
}

export default DeleteProductService;

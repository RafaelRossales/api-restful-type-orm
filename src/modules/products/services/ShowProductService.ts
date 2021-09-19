'use strict'

import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm"
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositiories/PoductsRepository";

interface IRequest{
  id:string
}

/**
 * @description - Serviço de criação de produtos
 */
class ShowProductService{

  public async execute({id }:IRequest):Promise<Product | undefined>{

    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);

    if(!product) throw new AppError('Product not found.');

    return product;
  }
}

export default ShowProductService;

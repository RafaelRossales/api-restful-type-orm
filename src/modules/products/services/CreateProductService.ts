'use strict'

import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm"
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositiories/PoductsRepository";

/**
 * @description - Dados informados pelo usuário
 */
interface IRequest{
  name:string,
  price:number,
  quantity:number
}

/**
 * @description - Serviço de criação de produtos
 */
class CreateProductService{

  public async execute({name,price,quantity}:IRequest):Promise<Product>{
    const productsRepository = getCustomRepository(ProductRepository);

    const productExists = await productsRepository.findByName(name);

    //Verifica se produto com determinado nome ja existe na base se dados
    if(productExists) throw new AppError('There is already  a product with this name');

    const product = productsRepository.create({
      name,
      price,
      quantity
    });

    await productsRepository.save(product);

    return product;
  }
}


export default CreateProductService;

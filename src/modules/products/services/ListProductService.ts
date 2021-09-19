'use strict'

import { getCustomRepository } from "typeorm"
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositiories/PoductsRepository";


/**
 * @description - Serviço de criação de produtos
 */
class ListProductService{

  public async execute():Promise<Product[]>{

    const productsRepository = getCustomRepository(ProductRepository);

    const products = await productsRepository.find();

    return products;
  }
}

export default ListProductService;

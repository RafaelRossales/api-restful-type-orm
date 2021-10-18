'use strict'

import { getCustomRepository } from "typeorm"
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositiories/PoductsRepository";
import RedisCache from "@shared/cache/RedisCache";


/**
 * @description - Serviço de criação de produtos
 */
class ListProductService{

  public async execute():Promise<Product[]>{

    const productsRepository = getCustomRepository(ProductRepository);

    const redisCache = new RedisCache();

    let products = await redisCache.recover<Product[]>(
      'api-vendas-PRODUCT-LIST'
    );

    if(!products){

      products = await productsRepository.find();

      await redisCache.save('api-vendas-PRODUCT_LIST',products)
    }


    return products;
  }
}

export default ListProductService;

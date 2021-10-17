'use strict'

import CustomersRepository from "@modules/customers/typeorm/repositories/CustomersRepository";
import { ProductRepository } from "@modules/products/typeorm/repositiories/PoductsRepository";
import AppError from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm"
import Order from "../typeorm/entities/Order";
import OrdersRepository from "../typeorm/repositories/OrderRepository";

interface IProducts{
  id:string,
  quantity:number
}
/**
 * @description - Dados informados pelo usuário
 * @interface
 */
interface IRequest{
  customer_id:string,
  products:IProducts[];
}

/**
 * @description - Serviço de criação de orders
 */
class CreateOrderServer{

  public async execute({customer_id,products}:IRequest):Promise<Order>{

    const orderRepository =  getCustomRepository(OrdersRepository);
    const customersRepository = getCustomRepository(CustomersRepository);
    const productsRepository = getCustomRepository(ProductRepository);

    const customerExists = await customersRepository.findById(customer_id);

    if(!customerExists) throw new AppError('Could not  find customer wirh the given id');

    const existsProducts = await productsRepository.findAllByIds(products);

    if(!existsProducts.length) throw new AppError('Could not find any products with the given id');

    const existsProductsIds = existsProducts.map( product => product.id);

    const checkInexistentProducts = products.filter(product => !existsProductsIds.includes(product.id));

    if(checkInexistentProducts.length > 0)  throw new AppError(`Could not find the following product ${checkInexistentProducts[0].id}`);

    const quantityAvailable = products.filter(
      product => existsProducts.filter(p => p.id === product.id)[0].quantity < product.quantity
    );

    if(quantityAvailable.length > 0) throw new AppError(`The quantity ${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0].id}`);


    const serializedProducts = products.map(product => ({
      product_id:product.id,
      quantity:product.quantity,
      price:existsProducts.filter(p => p.id === product.id)[0].price
    }));

    const order = await orderRepository.createOrder({
      customer:customerExists,
      products:serializedProducts
    });

    const { orders_products } = order;

    const updatedProductQuantity = orders_products.map(product => ({
      id:product.product_id,
      quantity:existsProducts.filter(p => p.id === product.id)[0].quantity - product.quantity,
    }));

    await productsRepository.save(updatedProductQuantity);

    return order;

  }
}


export default CreateOrderServer;

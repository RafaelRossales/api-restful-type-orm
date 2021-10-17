'use strict'

import CustomersRepository from "@modules/customers/typeorm/repositories/CustomersRepository";
import { ProductRepository } from "@modules/products/typeorm/repositiories/PoductsRepository";
import AppError from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm"
import Order from "../typeorm/entities/Order";
import OrdersRepository from "../typeorm/repositories/OrderRepository";

/**
 * @description - Dados informados pelo usuário
 * @interface
 */
interface IRequest{
  id:string,
}

/**
 * @description - Serviço de criação de orders
 */
class ShowOrderService{

  public async execute({id}:IRequest):Promise<Order>{

    const orderRepository =  getCustomRepository(OrdersRepository);

    const order = await orderRepository.findById(id);

    if(!order) throw new AppError('Order not found');

    return order;

  }
}


export default ShowOrderService;

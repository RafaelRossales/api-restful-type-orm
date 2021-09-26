import { Request, Response } from "express";
import CreateCustormerService from "../services/CreateCustomerService";
import DeleteCustomerService from "../services/DeleteCustomerService";
import ListCustomerService from "../services/ListCustomerService";
import ShowCostumerService from "../services/ShowCustomerService";
import UpdateCustomerService from "../services/UpdateCustomerService";

export default class CustomersController{

  /**
   *
   * @param request
   * @param response
   * @returns
   */
  public async index(request:Request,response:Response):Promise<Response>{

    const listCustomers = new ListCustomerService();
    const  customers = await listCustomers.execute();

    return response.json(customers);
  }

  /**
   *
   * @param request
   * @param response
   * @returns
   */
  public async show(request:Request,response:Response):Promise<Response>{
      const { id } = request.params;

      const showCustomer = new ShowCostumerService();

      const customer = await showCustomer.execute({ id });

      return response.json(customer)
  }

  /**
   *
   * @param request
   * @param response
   * @returns
   */
  public async create(request:Request,response:Response):Promise<Response>{
    const { name,email } = request.body;

    const createCustomer = new CreateCustormerService();

    const customer = await createCustomer.execute({
      name,
      email
    });

    return response.json(customer);
  }

/**
 *
 * @param request
 * @param response
 * @returns
 */
  public async update(request:Request,response:Response):Promise<Response>{
    const { name,email } = request.body;
    const { id } = request.params;

    const updateCustomer = new UpdateCustomerService();

    const customer = await updateCustomer.execute({
      id,
      name,
      email
    });

    return response.json(customer);
  }

  /**
   *
   * @param request
   * @param response
   * @returns
   */
  public async delete(request:Request,response:Response):Promise<Response>{
    const { id } = request.params;

    const deleteCustomer = new DeleteCustomerService();

    await deleteCustomer.execute({ id });

    return response.json([])
  }

}

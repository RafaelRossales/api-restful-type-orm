import { Router } from 'express'
import { celebrate , Joi, Segments} from 'celebrate'; // Validação de dados
import OrdersController from '../controllers/OrdersController';
import isAuthenticated from '@shared/http/middleware/isAuthenticated';


const orderRouter = Router();

const ordersController = new OrdersController()

orderRouter.use(isAuthenticated)
// customersRouter.get('/',customersController.index);

orderRouter.get(
'/:id',
  celebrate({
    [Segments.PARAMS]:{
      id:Joi.string().uuid().required()
    }
  }),
  ordersController.show
);

orderRouter.post(
  '/',
    celebrate({
      [Segments.BODY]:{
        customer_id:Joi.string().uuid().required(),
        products:Joi.required()
      }
    }),
    ordersController.create
  );


export default orderRouter;


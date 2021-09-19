import { Router } from 'express'
import PoductsController from '../controllers/ProductsController';

const productsRouter = Router();

const productsController = new PoductsController()

productsRouter.get('/',productsController.index);
productsRouter.get('/:id',productsController.show);
productsRouter.post('/',productsController.create);
productsRouter.put('/:id',productsController.update);
productsRouter.delete('/:id',productsController.delete);

export default productsRouter;

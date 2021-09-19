import { celebrate, Joi, Segments } from "celebrate"; // Validação dos campos
import { Router } from "express";
import UsersController from "../controllers/UsersController";
import isAuthenticated from "@shared/http/middleware/isAuthenticated";

const usersRouter = Router();
const usersController = new UsersController();


usersRouter.get('/',isAuthenticated,usersController.index);
usersRouter.post(
  '/',
    celebrate({
      [Segments.BODY]:{
        name:Joi.string().min(5).required(),
        email:Joi.string().email().required(),
        password:Joi.string().required()
      }
    }),
    usersController.create
  )


  export default usersRouter;

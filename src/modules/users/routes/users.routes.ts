import { celebrate, Joi, Segments } from "celebrate"; // Validação dos campos
import { Router } from "express";
import UsersController from "../controllers/UsersController";
import isAuthenticated from "@shared/http/middleware/isAuthenticated";
import multer from "multer";
import uploadConfig from '@config/upload';
import UserAvatarController from "../controllers/UserAvatarController";

const usersRouter = Router();
const usersController = new UsersController();
const usersAvatar = new UserAvatarController();

const upload = multer(uploadConfig);


usersRouter.get('/',isAuthenticated,usersController.index);

usersRouter.get('/',usersController.index);

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
  );

  //Adicionar avatar no perfil do usuário
  usersRouter.patch(
    '/avatar',
    isAuthenticated, // Middleware de autenticação de usuário
    upload.single('avatar'),
    usersAvatar.update
  );


  export default usersRouter;

import 'reflect-metadata';
import express, { NextFunction, Request, response, Response } from 'express'
import cors from 'cors';
import routes from './routes'
import AppError from '@shared/errors/AppError';
import '@shared/typeorm/';


const app = express();


app.use(cors());
app.use(express.json());
app.use(routes);

//Middleware // resposavel por interceptar os erros
app.use(
  (
    error:Error,
    request:Request,
    reponse:Response,
    next:NextFunction
  ) => {

    if(Error instanceof  AppError){
      return response.status(error.statusCode).json({
        status:'error',
        message:error.message
      });
    }


    return response.status(500).json({
      status:'error',
      message:'Internal server error'
    })
});

app.listen(333,() => {
  console.log('Server started on port 333! ')
})

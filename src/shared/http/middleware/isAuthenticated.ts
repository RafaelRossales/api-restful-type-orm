import { NextFunction, Request,Response }  from 'express';
import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';
import { verify } from 'jsonwebtoken';

/**
 *@interface
 */
interface TokenPayload{
    iat:number,
    exp:number,
    sub:string
}

export default function isAuthenticated(
    request:Request,
    response:Response,
    next:NextFunction
):void{
    const authHeader = request.headers.authorization

    if(!authHeader){
        throw new AppError('JWT Token is missing')
    }

    // const [,token] = authHeader.split(' ');
    const token = authHeader

    try {
      const decodedToken = verify(token,authConfig.jwt.secret);

        const { sub } = decodedToken as TokenPayload;

        request.user = {
            id:sub
        }

        return next();
    } catch (error) {

        throw new AppError('Invalid JWtT Token.');
    }
}

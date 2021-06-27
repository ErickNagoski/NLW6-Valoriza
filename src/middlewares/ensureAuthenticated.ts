import {Request,Response,NextFunction} from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub:string;
}

export function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
){
    //receber token
    const authtoken = request.headers.authorization;
    
    //validar se token está preenchido
    if(!authtoken){
        return response.status(401).end();
    }

    //validar se o token é válido
    const [,token] = authtoken.split(" ")
    
    try {
        const {sub}  = verify(token,"dd2bf38db13edaa617d87307c7b88fa6") as IPayload;

    //Recuperar informações do usuário

        request.user_id = sub;
        return next();

    } catch (error) {
        return response.status(401).end();
    }
    

    return next();
}
//Sobrescrita do metodo request do express

declare namespace Express{
    export interface Request{
        user:{
            id:string;
        }
    }
}

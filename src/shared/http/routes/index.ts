import { Router } from "express";

const routes = Router();

routes.get('/',(reqquest,response) =>{
  return response.json({ message:'Hello Dev!' })
})


export default routes;

import * as express from 'express';
import { Categories } from '../../models/category';
 
export class CategoriesController {
 
  getAllCategories = ((request: express.Request, response: express.Response) => {
    Categories.findAll().then(categories => response.json(categories)).catch((e) => {  
      response.send(e + 'Something went wrong');
  });
  });


}

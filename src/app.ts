import { Application } from "express";
import express, {Request, Response, NextFunction} from 'express';
import sequelizeConnection from "./config/config";
import dbInit from './db/init';
import { Categories } from "./models/category";

 export class App {
     public app: Application;
 
     /**
      * @param port Port Application listens on
      * @param middleware Array of middleware to be applied to app 
      * @param routes Array of express.Router objects for application routes
      * @param apiPath Base path for this api that will be prepended to all routes
      */
     constructor(
         private port: number,
         middleware: Array<any>,
         routes: Array<express.Router>,
         private apiPath: string = '/api',
     ) {
         //* Create a new express app
         this.app = express();
         
         //* Method calls `this.app.use()` for each middleware
         this.middleware(middleware);
         
         //* Method calls `this.app.use()` for each router, prepending `this.apiPath` to each router
         this.routes(routes);

         this.app.use((err: Error, req: Request, res:Response, next: NextFunction) => {
            res.status(500).json({message: err.message});
          });

          this.app.use(express.static('thumbnails')); 
          this.app.use('/thumbnails', express.static('thumbnails'));

         sequelizeConnection.authenticate().then(() => {
            console.log('Connection has been established successfully.');
         }).catch((error) => {
            console.error('Unable to connect to the database: ', error);
         });
        
         dbInit();
     }
    /**
     * @param mware Array of middlewares to be loaded into express app
     */
     private middleware(mware: any[]) {
        mware.forEach((m) => {
            this.app.use(m);
        });
    }

    public addMiddleWare(middleWare: any) {
        this.app.use(middleWare);
    }

    /**
     * Attaches route objects to app, appending routes to `apiPath`
     * @param routes Array of router objects to be attached to the app
     */
    private routes(routes: Array<express.Router>) {
        routes.forEach((r) => {
            this.app.use(`${this.apiPath}`, r);
        });
    }

    /**
     * Start the Express app
     */
   public listen() {
    Categories.bulkCreate([
        { uuid: "131ecfca-2e9d-43aa-87ae-66573abe8fb4", title: 'Excercice' },
        { uuid: "96c1e5bc-3580-4757-9b0f-428202951f4d", title: 'Education' },
        { uuid: "a4167145-549a-485b-a5e5-f3dd8b3d2130", title: 'Recipe' },
      ]).then(() => console.log("Categories data have been saved")).catch(e => console.log(e));
        this.app.listen(this.port, () => {
            console.log("APP LISTENING ON PORT:", this.port);
        });
    }
 }
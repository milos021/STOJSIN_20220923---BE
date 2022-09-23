import express, {Request, Response, NextFunction} from 'express';
import bodyParser from 'body-parser';
import { videoRoutes } from './api/routes/video';
import { App } from './app';
import { categoriesRoutes } from './api/routes/categories';

const middleware = [
  videoRoutes,
  categoriesRoutes,
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true}),
  (err: Error, req: Request, res:Response, next: NextFunction) => {
  res.status(500).json({message: err.message});
}]
const app = new App(
  3000,
  middleware,
  [videoRoutes, categoriesRoutes]
);

app.listen();

import express = require('express');
//controllers
import { CategoriesController } from '../controllers/categories';

export const categoriesRoutes = express.Router();

const categoriesController = new CategoriesController()

//Routes
categoriesRoutes.get(`/api/categories`, (req, res) => { categoriesController.getAllCategories(req,res)})
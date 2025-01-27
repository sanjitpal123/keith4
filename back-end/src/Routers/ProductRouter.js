import express from 'express';
import upload from '../Config/multerConfig.js';
import { AddProduct, Getallproucts } from '../Controllers/Homepagedynamic/Products.js';
const PrdouctRouter=express.Router();
PrdouctRouter.post('/create',upload.single('image'),AddProduct);
PrdouctRouter.get('/getallproducts',Getallproucts);
export default PrdouctRouter;
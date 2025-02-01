import express from "express";
import upload from "../Config/multerConfig.js";
import { Getallmanagement, Management,EditManagement,DeleteManagement } from "../Controllers/Homepagedynamic/management.js";


const managementRouter=express.Router();

managementRouter.post('/create', upload.single('image'), Management);
managementRouter.get('/getall',Getallmanagement);
managementRouter.put('/Edit/:id',upload.single('image'),EditManagement);
managementRouter.delete('/delete/:id',DeleteManagement);

export default  managementRouter;
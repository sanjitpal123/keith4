
import express from "express";
import { addContactOffice, deleteContactOfficeById, getallContactOffice, updateContactOfficeById } from "../../Controllers/contact/contact.js";

import upload from "../../Config/multerConfig.js";
const ContactRouter=express.Router();
ContactRouter.post('/create',upload.single('image'),addContactOffice);
ContactRouter.get('/get',getallContactOffice);
ContactRouter.put('/Edit/:id',upload.single('image'),updateContactOfficeById);
ContactRouter.delete('/delete/:id',deleteContactOfficeById);

export default ContactRouter;
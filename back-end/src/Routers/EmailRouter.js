import express from 'express';
import { sendEmail } from '../Controllers/Emailcontrollers/EmailContorller.js';
const emailRouter=express.Router();
emailRouter.post('/send',sendEmail)
export default  emailRouter
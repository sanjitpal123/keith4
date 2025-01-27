import express from 'express';
import upload from '../Config/multerConfig.js';
import { EditHeroSectionofvideo, GetHerosection, HeroSection } from '../Controllers/Homepagedynamic/HeroSection.js';


const HeroRouter=express.Router();
HeroRouter.post('/herovideo', upload.single('video'), HeroSection);
HeroRouter.get('/get',GetHerosection);
HeroRouter.post('/Edit',upload.single('video'), EditHeroSectionofvideo);
export default HeroRouter;
import express from "express";

import { EditHistory, getallHistory, Histroy } from "../../Controllers/About/History.js";
const HistoryRouter=express.Router();
HistoryRouter.post('/create',Histroy);
HistoryRouter.get('/getall',getallHistory);
HistoryRouter.put('/Edit/:id',EditHistory);
export default HistoryRouter;
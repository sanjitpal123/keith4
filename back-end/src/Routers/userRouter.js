import express from "express";
import { Login, Register } from "../Controllers/User.js";
import { getmetadata, metadatapost, updatemeta } from "../Controllers/Metadata/meta.js";
const userrouter=express.Router();
userrouter.post('/register',Register);
userrouter.post('/login',Login);
userrouter.get('/getmetadata',getmetadata);
userrouter.put('/updatemeta/:id',updatemeta)

userrouter.post('/Metadata',metadatapost);
export default userrouter;
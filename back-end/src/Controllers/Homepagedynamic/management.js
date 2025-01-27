import cloudinary from "../../Config/Cloudinary.js";
import management from "../../Model/homepage/ManagementTeamModel.js";
import fs, { rmSync } from 'fs'
export const Management=async(req, res)=>{
    try{
        const {position, name, description}=req.body;
        console.log()
         const uploaded=await cloudinary.uploader.upload(req.file.path);
         if(!position || !name)
         {
            return req.status(401).json({
                message:'Please fill all the field ',
                success:false
            })
         }
         fs.unlinkSync(req.file.path);

         const created= await management.create({
            position:position,
            name:name,
            description:description,
            image: uploaded.secure_url

         })

         if(created)
         {
            return res.status(201).json({
                message:'Created successfully',
                created,
                success:true
            })
         }
         return res.status(501).json({
            message:'can not create ',
            success:false
         })



    }catch(error)
    {
        return res.status(501).json({
            message:'Internal server error',
            success:false
        })
    }
}
export const Getallmanagement=async(req, res)=>{
    try{
        const getallmanagement=await management.find({});
        if(!getallmanagement)
        {
            return res.status(404).json({
                message:'Can not found',
                success:true
            })
        }
        return res.status(201).json(getallmanagement);
        

    }catch(error)
    {
        return res.status(501).json({
            message:'Internal server error',
            success:true
        })
    }
}
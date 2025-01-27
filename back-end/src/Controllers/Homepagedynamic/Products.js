import exp from "constants";
import cloudinary from "../../Config/Cloudinary.js"
import Product from "../../Model/homepage/products.js";
import fs from 'fs'



export const AddProduct=async(req,res)=>{
    try{
        const {title, description}=req.body;
         const uploaded=await cloudinary.uploader.upload(req.file.path);
         console.log(uploaded);
         const created=await Product.create({
            title:title,
            description:description,
            image: uploaded.secure_url
         });
         
         fs.unlinkSync(req.file.path);

         if(created)
         {
            return res.status(201).json({
                message:'Product is created',
                success:true,
                created
            })
         }
         return res.status(401).json({
            message:'Cloud not create',
            success:false
         })



    }
    catch(error)
    {
        return res.status(501).json({
            message:'internal server error',
            success:true
        })

    }
}
export const Getallproucts=async(req,res)=>{
    try{

        const getall=await Product.find({});
        if(!getall)
        {
            return res.status(404).json({
                message:'Can not get products'
            })
        }
        return res.status(201).json({
            message:'Successfully created ',
            getall,
            success:true
        })
    }
    catch(error)
    {
        return res.status(501).json({
            message:'internal sever error',
            success:false
        })

    }
}

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
// Edit Management by ID
export const EditManagement = async (req, res) => {
    try {
        const { id } = req.params;
        const { position, name, description } = req.body;
        const existingData = await management.findById(id);
        if (!existingData) {
            return res.status(404).json({
                message: 'Management member not found',
                success: false
            });
        }

        let updatedImage = existingData.image;

        // If a new file is uploaded, replace the old image
        if (req.file) {
            const uploaded = await cloudinary.uploader.upload(req.file.path);
            updatedImage = uploaded.secure_url;
            fs.unlinkSync(req.file.path);
        }

        const updatedManagement = await management.findByIdAndUpdate(
            id,
            { position, name, description, image: updatedImage },
            { new: true }
        );

        return res.status(200).json({
            message: 'Updated successfully',
            updatedManagement,
            success: true
        });

    } catch (error) {
        console.log(error)
        return res.status(501).json({
            message: 'Internal server error',
            success: false,
            
        });
    }
};

// Delete Management by ID
export const DeleteManagement = async (req, res) => {
    try {
        const { id } = req.params;
        const existingData = await management.findById(id);

        if (!existingData) {
            return res.status(404).json({
                message: 'Management member not found',
                success: false
            });
        }

        // Delete image from Cloudinary
        const imagePublicId = existingData.image.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(imagePublicId);

        // Delete record from database
        await management.findByIdAndDelete(id);

        return res.status(200).json({
            message: 'Deleted successfully',
            success: true
        });

    } catch (error) {
        return res.status(501).json({
            message: 'Internal server error',
            success: false
        });
    }
};
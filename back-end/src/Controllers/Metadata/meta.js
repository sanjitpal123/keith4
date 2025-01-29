import MetadataModel from "../../Model/metadata/Metadata.js";

export const metadatapost=async(req , res)=>{
    try{
        const { title, description, keywords, author } = req.body;
        console.log('titile',title, 'des',description, 'keywords',keywords, 'authod', author);
        
         if(!title || !description || !keywords || !author)
         {
            return res.status(401).json({
                message:'Fill all the fields',
                success:false
            })
         }
         const existing=await MetadataModel.findOne();
         if(existing)
         {
            const updated=await MetadataModel.findByIdAndUpdate(existing._id,{title,description, keywords, author}, {new:true});
            if(updated)
            {
                return res.status(201).json({
                    message:'Updated successfully',
                    success:true
                })
            }
            return res.status(401).json({
                message:'Can not updated',
                success:false
            })
         }

         const created=await MetadataModel.create({
            title,
            description,
            keywords,
            author
         })
         if(!created)
         {
            return res.status(401).json({
                message:'Can not create'
            });
         }
         return res.status(201).json({
            message:'Created metadata successfully'
         })
    }catch(error)
    {
        return res.status(501).json({
            message:'Internal server error',
            success:false
        })
    }
}
export const getmetadata=async(req, res)=>{
    try{
        const f=await MetadataModel.findOne();
        if(!f)
        {
            return res.status(401).json({
                message:'can not find',
                success:false
            })
        }
        return res.status(201).json(f);
    }
    catch(error)
    {
        return res.status(501).json({
            message:'Internal server error',
            success:false
        })
    }
}
import MetadataModel from "../../Model/metadata/Metadata.js";

export const metadatapost=async(req , res)=>{
    try{
        const { title, description, keywords, author , typesofseo} = req.body;
        console.log('titile',title, 'des',description, 'keywords',keywords, 'authod', author);
        
         if(!title || !description || !keywords || !author || !typesofseo)
         {
            return res.status(401).json({
                message:'Fill all the fields',
                success:false
            })
         }
       

         const created=await MetadataModel.create({
            title,
            description,
            keywords,
            author,
            typesofseo
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
        const f=await MetadataModel.find({});
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
export const updatemeta=async (req, res)=>{
    try{
      const id=req.params.id;
      const { title, description, keywords, author , typesofseo} = req.body;
      const f=await MetadataModel.findById(id);
      if(!f)
      {
        return res.status(404).json({
            message:'can not find',
            success:false
        })
      }
      const updated=await MetadataModel.findByIdAndUpdate(f._id,{title, description, keywords, author, typesofseo},{new:true});
      if(!updated)
      {
        return res.status(404).json({
            message:'Can not update '
        })
      }
      return res.status(201).json({
        message:'updated successfully',
        success:true
      })


      
    }catch(error)
    {
     return res.status(501).json({
        message:'Internal server eror',
        success:false
     })
    }
}
export const deletemeta = async (req, res) => {
    try {
        const id = req.params.id;
        
        // Directly try deleting
        const deleted = await MetadataModel.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({
                message: 'Meta not found',
                success: false
            });
        }

        return res.status(200).json({
            message: 'Successfully deleted',
            deleted,
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            success: false,
            error: error.message
        });
    }
};

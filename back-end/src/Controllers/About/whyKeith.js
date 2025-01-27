import whykeith from "../../Model/Aboutpage/WhyKeith.js";

export const Whykeith = async (req, res) => {
    try {
        const { Title, description } = req.body;

        // Check if required fields are provided
        if (!Title || !description) {
            return res.status(401).json({
                message: 'Fill all the fields',
                success: false
            });
        }

        // Check if a document with the same Title already exists
        const existingDoc = await whykeith.findOne({ Title });

        if (existingDoc) {
            // If it exists, update the document
            const updatedDoc = await whykeith.findByIdAndUpdate(
                existingDoc._id,
                { Title, description },
                { new: true } // Return the updated document
            );

            return res.status(200).json({
                message: 'Successfully updated',
                updatedDoc,
                success: true
            });
        }

        // If it does not exist, create a new document
        const created = await whykeith.create({ Title, description });

        return res.status(201).json({
            message: 'Successfully created',
            created,
            success: true
        });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};

export const getwhykeith=async(req,res)=>{
    try{
        const getwhykeith=await whykeith.find({});
        if(!getwhykeith)
        {
            return res.status(404).json({
                message:'Can not get '
            })
        }
        return res.status(201).json(getwhykeith);
    }
    catch(error)
    {
        return res.status(501).json({
            message:'Internal server error',
            success:false
        })
    }
}
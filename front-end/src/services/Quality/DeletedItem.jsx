import axios from "axios";
async function DeleteQuality(id)
{
    try{
        const res=await axios.delete(`http://localhost:3000/api/qualityproduct/delete/${id}`)
        return res.data;

    }catch(error)
    {
        throw error;
    }

}
export default DeleteQuality;
import axios from "axios";
async function DeleteQuality(id)
{
    try{
        const res=await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/qualityproduct/delete/${id}`)
        return res.data;

    }catch(error)
    {
        throw error;
    }

}
export default DeleteQuality;
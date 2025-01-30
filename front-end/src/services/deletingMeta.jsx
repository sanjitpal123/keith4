import axios from "axios";
async function DeleteMeta(id)
{
    try{
        const res=await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/user/deletemeta/${id}`)
        return res.data;

    }catch(error)
    {
        throw error;
    }

}
export default DeleteMeta;
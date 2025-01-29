import axios from "axios";
async function EditMeta(formdata,id)
{
    try{
        const res=await axios.put(`${import.meta.env.VITE_API_BASE_URL}/user/updatemeta/${id}`,formdata)
        return res.data;

    }catch(error)
    {
        throw error;
    }

}
export default EditMeta;
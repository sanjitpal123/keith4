import axios from "axios";
async function EditQuality(formdata,id)
{
    try{
        const res=await axios.put(`${import.meta.env.VITE_API_BASE_URL}/qualityproduct/Edit/${id}`,formdata)
        return res.data;

    }catch(error)
    {
        throw error;
    }

}
export default EditQuality;
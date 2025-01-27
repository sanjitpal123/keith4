import axios from "axios";
async function AddNewQuality(formdata)
{
    try{
        console.log(import.meta.env.VITE_API_BASE_URL);
        const res=await axios.post(`${import.meta.env.VITE_API_BASE_URL}/qualityproduct/create`,formdata)
        return res.data;

    }catch(error)
    {
        throw error;
    }

}
export default AddNewQuality;
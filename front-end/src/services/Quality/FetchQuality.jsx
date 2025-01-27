import axios from "axios";
async function FetchQuality()
{
    try{
        const res=await axios.get(`${import.meta.env.VITE_API_BASE_URL}/qualityproduct/getall`)
        return res.data;

    }catch(error)
    {
        throw error;
    }

}
export default FetchQuality;
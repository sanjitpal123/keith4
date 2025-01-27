import axios from "axios";
async function FetchQuality()
{
    try{
        const res=await axios.get('http://localhost:3000/api/qualityproduct/getall')
        return res.data;

    }catch(error)
    {
        throw error;
    }

}
export default FetchQuality;
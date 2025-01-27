import axios from "axios";
async function fetchwhykeith()
{
    try{
        const res=await axios.get(`${import.meta.env.VITE_API_BASE_URL}/whykeith/getwhykeith`);
        console.log('getkeith',res);
        return res.data;

    }catch(error)
    {
        throw error;
    }

}
export default fetchwhykeith;
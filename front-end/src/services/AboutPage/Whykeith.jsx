import axios from "axios";
async function fetchwhykeith()
{
    try{
        const res=await axios.get('http://localhost:3000/api/whykeith/getwhykeith');
        console.log('getkeith',res);
        return res.data;

    }catch(error)
    {
        throw error;
    }

}
export default fetchwhykeith;
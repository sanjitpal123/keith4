import axios from "axios";
async function AddNewQuality(formdata)
{
    try{
        const res=await axios.post('http://localhost:3000/api/qualityproduct/create',formdata)
        return res.data;

    }catch(error)
    {
        throw error;
    }

}
export default AddNewQuality;
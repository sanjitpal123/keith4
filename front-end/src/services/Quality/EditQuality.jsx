import axios from "axios";
async function EditQuality(formdata,id)
{
    try{
        const res=await axios.put(`http://localhost:3000/api/qualityproduct/Edit/${id}`,formdata)
        return res.data;

    }catch(error)
    {
        throw error;
    }

}
export default EditQuality;
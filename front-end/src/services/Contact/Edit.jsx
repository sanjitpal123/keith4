import axios from "axios";
async function EditContact(formdata,id)
{
    try{
        const res=await axios.put(`${import.meta.env.VITE_API_BASE_URL}/contact/Edit/${id}`,formdata)
        console.log('resedt',res)
        return res.data;

    }catch(error)
    {
        throw error;
    }

}
export default EditContact;
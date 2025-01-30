import axios from "axios";
async function AddNewContact(formdata)
{
    try{
        const res=await axios.post(`${import.meta.env.VITE_API_BASE_URL}/contact/create`,formdata)
        return res.data;

    }catch(error)
    {
        throw error;
    }

}
export default AddNewContact;
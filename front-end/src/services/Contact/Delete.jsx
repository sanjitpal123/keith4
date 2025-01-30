import axios from "axios";
async function DeleteContact(id)
{
    try{
        const res=await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/contact/delete/${id}`)
        return res.data;

    }catch(error)
    {
        throw error;
    }

}
export default DeleteContact;
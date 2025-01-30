import axios from "axios";
async function SendEmail(formdata)
{
    console.log('email',`${import.meta.env.VITE_API_BASE_URL}`)
    try{
        const res=await axios.post(`${import.meta.env.VITE_API_BASE_URL}/email/send`,formdata)
        return res.data;

    }catch(error)
    {
        throw error;
    }

}
export default SendEmail;
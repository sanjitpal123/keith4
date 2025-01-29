
import axios from 'axios';

async function Addnewseo(formdata) {
    try {
        console.log('form',formdata)
        const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/user/Metadata`, formdata);
        
        console.log('res',res)
        return res.data;
    } catch (error) {
        console.error("Error request:", error.request);  // Log request details for debugging
        throw error;
    }
}

export default Addnewseo;



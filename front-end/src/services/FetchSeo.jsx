
import axios from 'axios';

async function Getseo() {
    try {
       
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/getmetadata`);
        
        console.log('res',res)
        return res.data;
    } catch (error) {
        console.error("Error request:", error.request);  // Log request details for debugging
        throw error;
    }
}

export default Getseo;



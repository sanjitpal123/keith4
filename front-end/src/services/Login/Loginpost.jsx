
import axios from 'axios';

async function Loginuser(obj) {
    try {
        console.log('form',obj)
        const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/user/login`, obj);
        
        console.log('res',res)
        return res.data;
    } catch (error) {
        console.error("Error request:", error.request);  // Log request details for debugging
        throw error;
    }
}

export default Loginuser;



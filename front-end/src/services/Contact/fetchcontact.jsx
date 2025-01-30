import axios from 'axios';

async function FetchContact() {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/contact/get`, {
            withCredentials: true,  // Ensure cookies are sent with the request
        });
        
        console.log('res',res)
        return res.data;
    } catch (error) {
        console.error("Error request:", error.request);  // Log request details for debugging
        throw error;
    }
}

export default FetchContact;
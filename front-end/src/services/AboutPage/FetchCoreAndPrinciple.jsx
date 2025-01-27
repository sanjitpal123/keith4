import axios from 'axios';

async function FetchCoreAndPrinciple() {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/coreandprinciple/getall`, {
            withCredentials: true,  // Ensure cookies are sent with the request
        });
        
        console.log('rescore',res)
        return res.data;
    } catch (error) {
        console.error("Error request:", error.request);  // Log request details for debugging
        throw error;
    }
}

export default FetchCoreAndPrinciple;
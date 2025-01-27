import axios from 'axios';

async function FetchCoreAndPrinciple() {
    try {
        const res = await axios.get('http://localhost:3000/api/coreandprinciple/getall', {
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
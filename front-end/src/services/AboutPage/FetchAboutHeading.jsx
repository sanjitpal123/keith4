import axios from 'axios';

async function FetchAboutHeading() {
    try {
        const res = await axios.get('http://localhost:3000/api/homeabout/get', {
            withCredentials: true,  // Ensure cookies are sent with the request
        });
        
        console.log('res',res)
        return res.data;
    } catch (error) {
        console.error("Error request:", error.request);  // Log request details for debugging
        throw error;
    }
}

export default FetchAboutHeading;
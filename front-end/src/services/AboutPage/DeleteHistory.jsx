import axios from 'axios';

async function DeleteHistory(id) {
    console.log('id',id)
    try {
        console.log('id',id)
        const res = await axios.delete(`http://localhost:3000/api/history/delete/${id}`, {
            withCredentials: true,  // Ensure cookies are sent with the request
        });
        
        console.log('res',res)
        return res.data;
    } catch (error) {
        console.error("Error request:", error.request);  // Log request details for debugging
        throw error;
    }
}

export default DeleteHistory;
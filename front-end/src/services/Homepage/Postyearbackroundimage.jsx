
import axios from 'axios';

async function postyearbackroundimage(formdata) {
    try {
        console.log('form',formdata)
        const res = await axios.post('http://localhost:3000/api/backroundimage/backroundimage', formdata);
        
        console.log('res',res)
        return res.data;
    } catch (error) {
        console.error("Error request:", error.request);  // Log request details for debugging
        throw error;
    }
}

export default postyearbackroundimage;




import axios from 'axios';

async function Getbackroundyear() {
    try {
       
        const res = await axios.get('http://localhost:3000/api/backroundimage/get');
        
        console.log('res',res)
        return res.data;
    } catch (error) {
        console.error("Error request:", error.request);  // Log request details for debugging
        throw error;
    }
}

export default Getbackroundyear;



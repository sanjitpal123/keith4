import axios from "axios";

async function AddNewHistory(formData) {
  try 
  {
    console.log(`import.meta.env.VITE_API_BASE_URL`,import.meta.env.VITE_API_BASE_URL)
    const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/history/create`,
      formData
    );
    console.log("res", res);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export default AddNewHistory;
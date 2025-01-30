import axios from "axios";

async function AddNewHistory(formData) {
<<<<<<< HEAD
  try 
  {
    console.log(`import.meta.env.VITE_API_BASE_URL`,import.meta.env.VITE_API_BASE_URL)
=======
  try {
>>>>>>> toasting
    const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/history/create`,
      formData
    );
    console.log("res", res);
    return res.data;
  } catch (error) {
    throw new error;
  }
}

export default AddNewHistory;
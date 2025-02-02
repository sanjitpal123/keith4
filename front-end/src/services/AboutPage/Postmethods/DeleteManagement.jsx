import axios from "axios";

async function DeleteManagement(id) {
  try {
    const res = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/management/delete/${id}`    
    );
    console.log("res", res);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export default DeleteManagement;
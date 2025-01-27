import axios from "axios";

async function DeleteCertificate(id) {
  try {
    const res = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/certificate/Delete/${id}`    
    );
    console.log("res", res);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export default DeleteCertificate;
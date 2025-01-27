import axios from "axios";

async function DeleteCertificate(id) {
  try {
    const res = await axios.delete(
        `http://localhost:3000/api/certificate/Delete/${id}`    
    );
    console.log("res", res);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export default DeleteCertificate;
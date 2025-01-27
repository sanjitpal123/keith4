import axios from "axios";

async function AddNewCertificate(formData) {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/certificate/post`,
      formData
    );
    console.log("res", res);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export default AddNewCertificate;
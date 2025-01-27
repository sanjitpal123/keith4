import axios from "axios";

async function EditCertificate(formData, id) {
  try {
    console.log('id',id)
    const res = await axios.put(
      `${import.meta.env.VITE_API_BASE_URL}/certificate/Edit/${id}`,
      formData
    );
    console.log("res", res);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export default EditCertificate;
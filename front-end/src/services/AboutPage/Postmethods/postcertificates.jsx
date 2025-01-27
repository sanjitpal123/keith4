import axios from "axios";

async function AddNewCertificate(formData) {
  try {
    const res = await axios.post(
      "http://localhost:3000/api/certificate/post",
      formData
    );
    console.log("res", res);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export default AddNewCertificate;
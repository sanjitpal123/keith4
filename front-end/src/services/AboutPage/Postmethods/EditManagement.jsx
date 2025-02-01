import axios from "axios";

async function EditManagement(formData, id) {
  try {
    console.log('id',id)
    console.log(`PUT Request URL: ${import.meta.env.VITE_API_BASE_URL}/management/Edit/${id}`);

    const res = await axios.put(
      `${import.meta.env.VITE_API_BASE_URL}/management/Edit/${id}`,
      formData
    );
    console.log("res", res);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export default EditManagement;
import axios from "axios";

async function EditCoreandprinciple(formData, id) {
  try {
    console.log('id',id)
    const res = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/coreandprinciple/Edit/${id}`,
      formData
    );
    console.log("res", res);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export default EditCoreandprinciple;
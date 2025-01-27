import axios from "axios";

async function EditCoreandprinciple(formData, id) {
  try {
    console.log('id',id)
    const res = await axios.post(
      `http://localhost:3000/api/coreandprinciple/Edit/${id}`,
      formData
    );
    console.log("res", res);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export default EditCoreandprinciple;
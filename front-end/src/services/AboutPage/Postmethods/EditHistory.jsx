import axios from "axios";

async function EditHistory(formData, id) {
  try {
    console.log('id',id)
    const res = await axios.put(
      `http://localhost:3000/api/history/Edit/${id}`,
      formData
    );
    console.log("res", res);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export default EditHistory;
import axios from "axios";

async function WhykeithPost(formData) {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/whykeith/create`,
      formData
    );
    console.log("res", res);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export default WhykeithPost;
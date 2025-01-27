import axios from "axios";

async function Postaboutheading_content_image(formData) {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/homeabout/content`,
      formData
    );
    console.log("res", res);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export default Postaboutheading_content_image;
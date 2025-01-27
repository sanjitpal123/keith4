import axios from "axios";
async function AddProduct(formdata)
{
    try{
        const res=await axios.post(`${import.meta.env.VITE_API_BASE_URL}/product/create`,formdata)
        return res.data;

    }catch(error)
    {
        throw error;
    }

}
export default AddProduct;
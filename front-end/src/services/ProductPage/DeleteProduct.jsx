import axios from "axios";
async function DeleteProduct(id)
{
    try{
        const res=await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/product/delete/${id}`)
        return res.data;

    }catch(error)
    {
        throw error;
    }

}
export default DeleteProduct;
import axios from "axios";
async function EditProduct(formdata,id)
{
    try{
        const res=await axios.post(`${import.meta.env.VITE_API_BASE_URL}/product/Edit/${id}`,formdata)
        console.log('resedt',res)
        return res.data;

    }catch(error)
    {
        throw error;
    }

}
export default EditProduct;
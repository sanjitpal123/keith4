import axios from "axios";
async function EditProduct(formdata,id)
{
    try{
        const res=await axios.post(`http://localhost:3000/api/product/Edit/${id}`,formdata)
        console.log('resedt',res)
        return res.data;

    }catch(error)
    {
        throw error;
    }

}
export default EditProduct;
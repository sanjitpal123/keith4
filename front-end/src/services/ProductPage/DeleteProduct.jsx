import axios from "axios";
async function DeleteProduct(id)
{
    try{
        const res=await axios.delete(`http://localhost:3000/api/product/delete/${id}`)
        return res.data;

    }catch(error)
    {
        throw error;
    }

}
export default DeleteProduct;
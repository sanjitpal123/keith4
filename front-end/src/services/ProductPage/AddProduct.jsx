import axios from "axios";
async function AddProduct(formdata)
{
    try{
        const res=await axios.post('http://localhost:3000/api/product/create',formdata)
        return res.data;

    }catch(error)
    {
        throw error;
    }

}
export default AddProduct;
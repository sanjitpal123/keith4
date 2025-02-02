import mongoose from "mongoose";
const Whykeith=mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String
    }
})
const whykeith=mongoose.model('whykeith',Whykeith);
export default whykeith;
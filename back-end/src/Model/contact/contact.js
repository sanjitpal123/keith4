import mongoose from "mongoose";
const contactmodel=mongoose.Schema({
    image:{
        type:String
    },
    title:{
        type:String
    },
    address:{
        type:String

    },
    findonmap:{
        type:String
    }

})
const ContactOffice=mongoose.model('ContactOffice',contactmodel);
export default ContactOffice;
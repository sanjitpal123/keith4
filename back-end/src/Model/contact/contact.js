import mongoose from "mongoose";
const contactmodel=mongoose.Schema({
    image:{
        type:String
    },
    title:{
        type:String
    },
    landmark:{
        type:String
    },
   
    city:{
        type:String
    },
    state:{
        type:String
    },
    area:{
        type:String
    },
    pin:{
        type:String
    },
    country:{
        type:String
    },
    findonmap:{
        type:String
    }

})
const ContactOffice=mongoose.model('ContactOffice',contactmodel);
export default ContactOffice;
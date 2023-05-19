const mongoose = require('mongoose');

const schema = mongoose.Schema;
 const noteschema = new schema({
    user:{
        type:schema.ObjectId,
        ref:"User"
    },
    title:{
        type:String
    },
    body:{
        type:String
    },
    creaedAt:{
        type:Date,
        default:Date.now()
    }
 })



module.exports = mongoose.model("Note",noteschema)
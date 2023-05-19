const mongoose = require('mongoose');

const schema = mongoose.Schema;
const Userschema = new schema({

googleId:{
    type:String
},
displayName:{
    type:String
},
firstName:{
    type:String
},
lastName:{
    type:String
},
profileImage:{
    type:String
},
createdAt:{
    type:Date,
   default:Date.now
}

})

module.exports = mongoose.model("User",Userschema)
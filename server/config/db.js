const mongoose = require("mongoose")
mongoose.set("strictQuery",false)

const connectdb = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`database connected to ${conn.connection.host}`);
    } catch (error) {
        console.log(error)
    }
}
module.exports = connectdb
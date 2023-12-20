//import mongoose
const mongoose = require('mongoose')

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to Mongodb Database ${mongoose.connection.host}`.bgMagenta.white);
    }catch (error) {
        console.log(`Mongodb Database Error ${error}` .bgRed.white)
    }
}

//export
module.exports = connectDB
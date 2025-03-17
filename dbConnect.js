const mongoose = require("mongoose");

exports.connectDB = async ()=>{
    try {
        mongoose.connect(process.env.db);
        console.log("Now Connected To MongoDB!");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const {connectDB} = require("./dbConnect");

require("dotenv").config();

app.use(require("cors")());
app.use(express.json());

connectDB();

try {
    app.listen(port, ()=>{
        console.log(`Now listening to port ${port}`);
    })
} catch (error) {
    console.log(`Error: ${error}`);
}

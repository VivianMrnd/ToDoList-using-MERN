const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const {connectDB} = require("./dbConnect");
const taskRoute = require("./routes/taskRoute");

require("dotenv").config();

app.use(require("cors")());
app.use(express.json());
app.use("/", taskRoute);

connectDB();

try {
    app.listen(port, ()=>{
        console.log(`Now listening to port ${port}`);
    })
} catch (error) {
    console.log(`Error: ${error}`);
}

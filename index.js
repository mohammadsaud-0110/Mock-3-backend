const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connection = require("./config/db");
const bookRouter = require("./routes/book.route");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req,res)=>{
    try {
        res.send({"error" : false, "message" : "default route of Book Find"});
    } 
    catch (error) {
        res.send({"error" : true, "message" : error.message});
    }
    
})

app.use("/book",bookRouter);




app.listen(process.env.PORT, async()=>{
    try {
        await connection;
        console.log("DB connected");
        console.log("Server port :",process.env.PORT);
    }
    catch (error) {
        console.log("Error :",error);
    }
})
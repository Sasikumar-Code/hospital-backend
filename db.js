const mongoose = require("mongoose");
const mongoURL = "mongodb+srv://Sasi1996:Sasi1996@cluster0.nrfw00g.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongoURL , { useNewUrlParser:true , useUnifiedTopology:true });

const connection = mongoose.connection

connection.on("error", ()=>{
    console.log("Mongo DB connection failed");
})
connection.on("connected" , ()=>{
    console.log("mongo DB connection Successfull !");
})

module.exports = mongoose;
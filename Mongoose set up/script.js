const mongoose = require("mongoose")
const User = require("./User")

mongoose.connect("mongodb://127.0.0.1:27017/test").then(() => {
    console.log("MongoDB connected");
}).catch((e) => {
    console.log(e);
    console.log("MongoDB connection failed");
})




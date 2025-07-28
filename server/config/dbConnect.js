const mongoose = require('mongoose');
const url = process.env.BASE_URL;
const DataBase =()=>{
    const con = mongoose.connect(url)
    if(con){
        console.log("Database is connected successfully");
    }
}
module.exports = DataBase;
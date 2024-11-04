const mongoose=require("mongoose");
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
}
main().then(()=>{
    console.log("connected to db");
}).catch((err)=>{
    console.log(err);
})

const initData=require("./data.js");
const Listing=require("../models/listing.js");

const initDB=async()=>{
   await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
}
initDB();
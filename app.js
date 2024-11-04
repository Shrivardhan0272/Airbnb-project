const express=require("express");
const app=express();
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"public")));

const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
}
main().then(()=>{
    console.log("connected to db");
}).catch((err)=>{
    console.log(err);
})

app.get("/",(req,res)=>{
    res.send("Hi I'm am root");
})
app.listen(8080,()=>{
    console.log("Server is listening to port 8080");
})
// app.get("/testListing",async(req,res)=>{
//     let sampleListing=new Listing({
//         title:"My New Villa",
//         description:"By the beaach",
//         price:1200,
//         location:"Calangute,Goa",
//         country:"India",
//     });
//     await sampleListing.save();
//     console.log("Sample was saved");
//     res.send("Succcessful test")
    
// })
app.get("/listings",async(req,res)=>{
 let allListings=  await  Listing.find({});
 res.render("listings/index.ejs",{allListings});


});
//new route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
})
//show route
app.get("/listings/:id",async(req,res)=>{
    let {id}=req.params;
   const listing=await Listing.findById(id);
   res.render("listings/show.ejs",{listing});

})

//create route
app.post("/listings",async(req,res)=>{
    const newList= new Listing(req.body.listing);
    let listing=req.body.listing;
    console.log(listing)
   await newList.save();
 
   res.redirect("/listings");

})
//edit route
app.put("/listings/:id",async(req,res)=>{
    let {id}=req.params;
   await  Listing.findByIdAndUpdate(id,{...req.body.listing});
   
   res.redirect(`/listings/${id}`);

})
app.get("/listings/:id/edit",async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
})
//delete route
app.delete("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    let deleted= await Listing.findByIdAndDelete(id);
   
    res.redirect("/listings");
})

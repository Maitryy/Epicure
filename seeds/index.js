const mongoose=require('mongoose');
const cities=require('./cities')
const names=require('./names')
const description=require('./description')
const Hotel=require('../models/hotel')
const fetch = require("node-fetch");

mongoose.connect('mongodb://localhost:27017/hotel',{
  useNewUrlParser:true,
  useCreateIndex:true,
  useUnifiedTopology:true
});

const db=mongoose.connection;
db.on("error",console.error.bind(console,"connection error: "));

db.once("open",()=>{
  console.log("DATABASE CONNECTED")
})

const seedDB=async()=>{
  await Hotel.deleteMany({});
  for(let i=0;i<10;i++){
    const price=Math.floor(Math.random()*200);
    const hot=new Hotel({
      author:'5fddc15c528af7464c3d8d24',
      name:`${names[i].name}`,
      city:`${cities[i].District}`,
      country:'India',
      image:'https://source.unsplash.com/900x900/?restaurants,hotels,cafes',
      description:`${description[i].description}`,
      price,
      geometry:{
        type:"Point",
        coordinates:[72.8311,21.17]
      },
      latitude:'',
      longitude:''
    })
    
  const found=await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${cities[i].District}%2C%20India&key=158fe50acde04a9a87ef90f8df4460fa`)
  const data= await found.json();
  const {lat,lng} =data.results[0].geometry;
  hot.latitude=lat;
  hot.longitude=lng;
  await hot.save();
  }
}

seedDB().then(()=>{
  mongoose.connection.close();
});
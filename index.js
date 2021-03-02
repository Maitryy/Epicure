const mongoose=require('mongoose');
const cities=require('./cities');
const names=require('./names');
const descriptions=require('./descriptions');
const Hotel=require('../models/hotel');
const description = require('./descriptions');

mongoose.connect('mongodb://localhost:27017/hotels',{
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
    const random64=Math.floor(Math.random()*64);
    const random10=Math.floor(Math.random()*10);
    const random500=Math.floor(Math.random()*500);
    const hot=new Hotel({
      name:`${names[random64].name}`,
      location:`${cities[random500].City} ${cities[random500].State}`,
      cuisine: `${names[random64].cuisine}`,
      price: random500,
      description: `${descriptions[random10].description}`
    })
    await hot.save();
  }
}

seedDB().then(()=>{
  mongoose.connection.close();
});
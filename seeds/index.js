const mongoose=require('mongoose');
const cities=require('./cities')
const names=require('./names')
const description=require('./description')
const Hotel=require('../models/hotel')

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
      name:`${names[i].name}`,
      location:`${cities[i].District}`,
      state:`${cities[i].State}`,
      image:'https://unsplash.com/photos/41D3oPlRbHQ',
      description:`${description[i].description}`,
      price
    })
    await hot.save();
  }
}

seedDB().then(()=>{
  mongoose.connection.close();
});
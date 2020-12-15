const mongoose=require('mongoose');
const cities=require('./cities')
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
  for(let i=0;i<5;i++){
    const random5=Math.floor(Math.random()*5);
    const hot=new Hotel({
      name:`${cities[random5].name}`,
      location:`${cities[random5].location}`
    })
    await hot.save();
  }
}

seedDB().then(()=>{
  mongoose.connection.close();
});
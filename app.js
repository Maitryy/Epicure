const express=require('express');
const path=require('path')
const mongoose=require('mongoose')
const Hotel=require('./models/hotel')
const methodOverride=require('method-override');
const { findByIdAndUpdate, findByIdAndDelete } = require('./models/hotel');

mongoose.connect('mongodb://localhost:27017/hotel', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db=mongoose.connection;
db.on("error",console.error.bind(console,"connection error: "));

db.once("open",()=>{
  console.log("DATABASE CONNECTED")
})

const app=express();

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))

app.get('/',(req,res)=>{
  res.render('home')
})

app.get('/hotels',async(req,res)=>{
  const hotels=await Hotel.find({});
  res.render('hotels/index', {hotels})
})

app.get('/hotels/new',(req,res)=>{
  res.render('hotels/new')
})

app.post('/hotels',async (req,res)=>{
  const hotel=new Hotel(req.body.hotel)
  await hotel.save();
  res.redirect(`/hotels/${hotel._id}`)
})

app.get('/hotels/:id', async(req,res)=>{
  const hotel=await Hotel.findById(req.params.id)
  res.render('hotels/show',{hotel})
})

app.get('/hotels/:id/edit', async(req,res)=>{
  const hotel=await Hotel.findById(req.params.id)
  res.render('hotels/edit',{hotel})
})

app.put('/hotels/:id',async (req,res)=>{
  const {id}=req.params
  const hotel=await Hotel.findByIdAndUpdate(id,{...req.body.hotel})
  res.redirect(`/hotels/${hotel._id}`)
})

app.delete('/hotels/:id',async(req,res)=>{
  const {id}=req.params;
  await Hotel.findByIdAndDelete(id)
  res.redirect('/hotels')
})

app.listen(8080,()=>{
  console.log('serving on the port')
})  
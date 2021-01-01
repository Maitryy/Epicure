const express=require('express')
const mongoose=require('mongoose')
const router=express.Router()
const catchAsync=require('../utils/catchAsync')
const ExpressError=require('../utils/ExpressError')
const Hotel=require('../models/hotel')
const {isLoggedIn,isAuthor,validateHotel}=require('../middleware')
const fetch = require("node-fetch");
const mbxGeocoding=require("@mapbox/mapbox-sdk/services/geocoding")
const mapBoxToken=process.env.MAPBOX_TOKEN 
const geocoder=mbxGeocoding({accessToken:mapBoxToken})

router.get('/hotels', catchAsync(async(req,res)=>{
  const hotels=await Hotel.find({});
  res.render('hotels/index', {hotels})
}))

router.get('/hotels/new',isLoggedIn,(req,res)=>{
  res.render('hotels/new')
})

router.post('/hotels',isLoggedIn, validateHotel,catchAsync(async (req,res)=>{
  const geoData=await geocoder.forwardGeocode({
    query:req.body.hotel.city,
    limit:1
  }).send()
  //res.send("okkkk")
  const hotel=new Hotel(req.body.hotel);
  hotel.geometry=geoData.body.features[0].geometry
  hotel.author=req.user._id;
  const found=await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${hotel.city}%2C%20${hotel.country}&key=158fe50acde04a9a87ef90f8df4460fa`)
  const data= await found.json();
  const {lat,lng} =data.results[0].geometry;
  hotel.latitude=lat;
  hotel.longitude=lng;
  await hotel.save();
  console.log(hotel)
  req.flash('success','Successfully made a new hotel')
  res.redirect(`/hotels/${hotel._id}`)
}))

router.get('/hotels/:id',catchAsync(async(req,res)=>{
  const hotel=await Hotel.findById(req.params.id).populate({
    path:'reviews',
    populate:{
      path:'author'
    }
  }).populate('author');
  // console.log(hotel);

  if(!hotel){
    req.flash('error','Cannot find that hotel')
    return res.redirect('/hotels')
  }
  res.render('hotels/show',{hotel})
}));

router.get('/hotels/:id/edit', isLoggedIn,isAuthor, catchAsync(async(req,res)=>{  
  const {id}=req.params
  const hotel=await Hotel.findById(id)
  if(!hotel){
    req.flash('error','Cannot find that campground')
    return res.redirect('/hotels')
  } 
  res.render('hotels/edit',{hotel})
}))

router.put('/hotels/:id',isLoggedIn, isAuthor,validateHotel, catchAsync(async (req,res)=>{
  const {id}=req.params
  const hotel=await Hotel.findByIdAndUpdate(id,{...req.body.hotel},{new:true})
  const found=await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${hotel.city}%2C%20${hotel.country}&key=158fe50acde04a9a87ef90f8df4460fa`)
  const data= await found.json();
  const {lat,lng} =data.results[0].geometry;
  hotel.latitude=lat;
  hotel.longitude=lng;
  await hotel.save();
  req.flash('success','Successfully updated the campground')
  res.redirect(`/hotels/${hotel._id}`)
}))

router.delete('/hotels/:id',isLoggedIn, isAuthor,catchAsync(async(req,res)=>{
  const {id}=req.params
  await Hotel.findByIdAndDelete(id)
  res.redirect('/hotels')
}))

module.exports=router
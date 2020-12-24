const express=require('express')
const router=express.Router({mergeParams:true})
const {validateReview, isLoggedIn}=require('../middleware')
const catchAsync=require('../utils/catchAsync')
const ExpressError=require('../utils/ExpressError')
const Review=require('../models/review')
const Hotel=require('../models/hotel')
const {reviewSchema}=require('../schemas.js')

router.post('/', isLoggedIn, validateReview, catchAsync(async(req,res)=>{
  const hotel=await Hotel.findById(req.params.id)
  const review=new Review(req.body.review)
  review.author=req.user._id
  console.log(review.author)
  hotel.reviews.push(review)
  await review.save()
  await hotel.save()
  req.flash('success','Created new review')
  res.redirect(`/hotels/${hotel._id}`)
}))

router.delete('/:reviewId', isLoggedIn, catchAsync(async (req,res)=>{
  const {id,reviewId}=req.params
  await Hotel.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
  await Review.findByIdAndDelete(reviewId)
  req.flash('success','Successfully deleted the review')
  res.redirect(`/hotels/${id}`)
}))

module.exports=router;
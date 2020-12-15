const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const HotelSchema=new Schema({
  name:String,
  location:String,
	state : String,
	city : String,
  location : String,
  image: String,
  price: Number,
	description: String
});

module.exports=mongoose.model('Hotel',HotelSchema);
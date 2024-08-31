
const express = require('express');
const mongoose = require('mongoose');
const locationModel=require('../models/places.model')

const findLocation=(req,res)=>{
  if(req.query.q){
    let findLoc=req.query.q;
    console.log(findLoc);


    locationModel.find({place : findLoc},function(error, loc) {
      if (error) return console.error(err);
      // console.log(` eww ${loc}`);
      res.send(loc);
        
      });
  
  }
    // let locations=getAllPlaces()
 
// use then here if you want to use async js else leave it the same



 



}








  

   
  

  module.exports ={findLocation}
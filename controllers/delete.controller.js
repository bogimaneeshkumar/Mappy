
const express = require('express');
const mongoose = require('mongoose');
const locationModel=require('../models/places.model')

const deleteLocation=async(req,res)=>{


  try{


    const {latitude,longitude}=req.body;

    if(!latitude || !longitude)
    {
      res.send('data not sufficient');
    }
     
      const deleteResponse=await locationModel.findOneAndRemove({latitude:latitude,longitude:longitude});
  
      if(!deleteResponse)
      {
        res.send('No place exists with the specified latitude and longitude');
      }
  
  
   res.send(
    {
      success: true,
      message : 'Location was successfully deleted',
    }
   )
  }catch(err){
    console.log(err);

  }
 

 
 
// use then here if you want to use async js else leave it the same
// locationModel.find({},function(err, Allocations) {
//     if (err) return console.error(err);
//   // console.log(` eww ${loc}`);
//   res.send(Allocations);
    
//   });


 
}

   
  

  module.exports ={deleteLocation}
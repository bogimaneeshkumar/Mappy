const express = require('express');
const mongoose = require('mongoose');

const locationModel = require('../models/places.model');
const postMyPlace=(req,res)=>{
    // console.log(req.body);
  try{
    let placeFromClient={
    
      place : req.body.place.toLowerCase(),
      latitude : req.body.latitude,
      longitude : req.body.longitude,
      
     }
     console.log(placeFromClient.place);
  
  
    
   let newPlaceToDataBase=new locationModel(placeFromClient);
  
  newPlaceToDataBase.save(function (err, newPlaceToDataBase) {
   
  
    res.send(JSON.stringify(newPlaceToDataBase))
  
  
  
  ;
    console.log( `${newPlaceToDataBase} saved to places collection.`);
  })
} catch(err){
    console.log('internal server error' ,err)
    if (err&&err.code=='11000')
    { 
     console.error(`   ${err} ,${err.code}}`)
  
    res.status(err.code).send('data has to be unique' );
  
    
    
  }
  }
   
   
}
module.exports ={postMyPlace}
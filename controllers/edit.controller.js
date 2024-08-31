
const express = require('express');
const mongoose = require('mongoose');
const locationModel=require('../models/places.model')

const editLocationName=async (req,res)=>{
   
 
   
   

try{ 
  // The first argument is the query and second is the update. Let’s execute it using the postman tool.
  locationModel.updateOne(
    { latitude:req.body.latitude,longitude:req.body.longitude },
     { place:req.body.newName },
    (err, result) =>
  
        {
            if (err) {
              res.send(err);
            } else {
              res.json(result);
            }
      });
}

catch(error){
console.log(error)
}







    
  
 
// use then here if you want to use async js else leave it the same
// locationModel.find({},function(err, Allocations) {
//     if (err) return console.error(err);
//   // console.log(` eww ${loc}`);
//   res.send(Allocations);
    
//   });


 
}

   
  

  module.exports ={editLocationName}
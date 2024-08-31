
const express = require('express');
const mongoose = require('mongoose');
const locationModel=require('../models/places.model')

const getAll=(req,res)=>{
   
    
  
 
// use then here if you want to use async js else leave it the same
locationModel.find({},function(err, Allocations) {
    if (err) return console.error(err);
  // console.log(` eww ${loc}`);
  res.send(Allocations);
    
  });


 
}

   
  

  module.exports ={getAll}
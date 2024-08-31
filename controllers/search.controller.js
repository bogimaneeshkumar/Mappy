const express = require('express');
const mongoose = require('mongoose');



 const locationModel = require('../models/places.model');
// let searchVal= getAllPlaces();

const searchSuggester=(req, res)=> {
    //console.log(req.query.q);
  
    const searchResults=req.query.q.trim().toLowerCase();
   console.log(searchResults);
   
  
  


  
  
  
  
  // let searchVal=getAllPlaces();
  if(searchResults)
  
  {
  const regex = new RegExp(searchResults, 'i'); // 'i' makes the search case-insensitive
  // limit to 10 results
  locationModel.find({place : regex},(error,LocArr)=>{
    if(error) console.warn(error)
   
    // console.log(locArr)
  
  
  
  
  
const searchval=LocArr;
  // let searchVal=getAllPlaces();
  // let searchVal=getAllPlacesFromDataBase();
  // console.log(searchVal);
  let Data=[];
  
    for (let i=0; i<searchval.length; i++)
  {
  Data[i]=searchval[i].place;
  
  
  
  }
  // res.send(req.query)
    res.send(JSON.stringify(Data.filter((value) => value.includes(searchResults))));
    
   
    
  }).limit(5);
  
  }
}
  
  module.exports ={searchSuggester}
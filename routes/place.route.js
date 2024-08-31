const express = require('express');
const router=express.Router()
const{postMyPlace}=require('../controllers/place.controller')




router.post('/',postMyPlace );


module.exports =router;

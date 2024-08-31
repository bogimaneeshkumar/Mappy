const express = require('express');
const router=express.Router()
const {findLocation}=require('../controllers/maproute.controller')


router.get('/',findLocation)

module.exports = router;
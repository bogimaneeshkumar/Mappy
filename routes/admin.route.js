const express = require('express');
const router=express.Router()
const {deleteLocation}=require('../controllers/delete.controller')
const {editLocationName}=require('../controllers/edit.controller')


router.put('/update',editLocationName);
router.delete('/delete',deleteLocation);

module.exports = router;
var express = require('express');
var router = express.Router();


const {searchSuggester}= require('../controllers/search.controller');




 






// for (let i=0; i<searchVal.length; i++){
//   tit[i]=searchVal[i].place
// }
//  console.log(tit);

// let tit=[];
// (searchVal)=>{
  
//   tit=searchVal.map((obj)=>{
//     obj.place
//   console.log(obj.place)})
// }


// console.log(tit)

// getAllPlaces()






// these are just sample data but in real 
// convert to lowecase and then split by space and then captalize the first letter of the word
// const data = ["science block","jasper hostel","emerald hostel","nlhc","diamond hostel","opal hostel","cental library","amber hostel", "hair salon","rd", "jasper garden","oat","rosaline hostel"];

router.get('/',searchSuggester );

module.exports = router;




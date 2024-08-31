// convert  to pwa

const express = require('express');
 const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config({path : '.env'})                                                      // initialize dotenv

const path = require('path'); 
                                                                                                // gives the current working directory path
const cors = require('cors');



const app = express();



// body parser to access request parameters
app.use(express.json());     // built in middleware





// main page 

console.log(path.join(__dirname, 'public'));



// enabling cors for external requests
app.use(cors());  // third party middleware


const connectDB=require('./database/db');
//connecting to database
// turn on db connection by uncommenting

 connectDB();
  

const port=process.env.PORT || 4545;


// custom middleware




// const {myDB}=require('./datbase/fake.container');



// when some one hits the path ie starting file of server this express middle ware finds file with name html only so name starting file as index.html
 app.use(express.static(path.join(__dirname, 'public')));  
 

 // main html file should be named as index.html only




// const {getAllPlaces,addNewData}=require('./TempDB/DB')



  //importing route handlers from  different routes
const searchRouteHandler=require('./routes/search.route');
const placeRouteHandler=require('./routes/place.route');
const maplocationRouteHandler=require('./routes/maplocation.route');
const getAllLocationsRouteHandler=require('./routes/getAll.route');
const adminRouteHandler=require('./routes/admin.route');

























  // .use brings all routes [get.post.patch etc]   from route handler we use it as middleware

app.use('/suggest' ,searchRouteHandler) // only get route present 

app.use('/places',placeRouteHandler);  // only post route present

app.use('/maproute/location',maplocationRouteHandler)  // only get route present
app.use('/locations/all',getAllLocationsRouteHandler)  // only get route present
app.use('/admin',adminRouteHandler); // admin/delete and admin/edit routes present







// running server

app.listen(port,()=>{
console.log((`server running on port ${process.env.BASE_URL}`));
})
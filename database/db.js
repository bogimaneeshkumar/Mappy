const mongoose=require('mongoose');


mongoose.set('strictQuery' ,true);

const connectDB=async()=>{
try{

    const connection=await mongoose.connect(process.env.MONGOCONNECTION_URL,{
  
   useNewUrlParser : true,
  useUnifiedTopology :true,
  


    })
   
    

    console.log(`MongoDB connected`);

} 
catch(error){

console.log(` From database folder  error ${error}\n,${error.message}`);
process.exit(1);
}


}


// exporting the functions as objects
module.exports=connectDB;

const createError=require('http-errors');

const errorHandler=(err,req,res,next)=>{
   return res.status(err.status || 500).json({
    error:{
        status: err.status,
        message: err.message
    }
   })
}
module.exports=errorHandler
 const errorHandlerMiddleware = (err,req, res, next)=>  {
   const statusCode =  400;
   res.status(statusCode).json({ error: err.message });
 };

module.exports=errorHandlerMiddleware
 const errorHandlerMiddleware = (err,req, res, next)=>  {
   const statusCode = res.statusCode? res.statusCode: 400;
   res.status(statusCode).json({ error: err.message });
   next()
 };

module.exports=errorHandlerMiddleware
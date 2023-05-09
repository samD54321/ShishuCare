const asyncHandler=require('express-async-handler')

const getDoctor=asyncHandler(async(req,res)=>{
    throw new Error('Not Found')
    // return res.status(200).json({ msg: "Hello I am doctor" });
})


module.exports={getDoctor}
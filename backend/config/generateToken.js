const jwt= require('jsonwebtoken')
const path= require('path')
require('dotenv').config({path:path.resolve(__dirname, '../.env')})

const generateToken=(id,role)=>{
    return jwt.sign({id,role},process.env.SECRET_KEY,{
        expiresIn:'10d'
    })
}

module.exports=generateToken
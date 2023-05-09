const express = require('express');
require('dotenv').config()

const errorHandlerMiddleware= require('./middleware/errorHandlerMiddleware')

const port=process.env.PORT || 8000

const app = express();

// these are for post/put requests for passing value to server
app.use(express.json())
app.use(express.urlencoded({extended:false}))


// routes
app.get('/',(req,res)=>{
    res.status(200).send('Welcome To ShishuCare')
})

app.use('/doctor',require('./routes/doctorRoute'))

app.use(errorHandlerMiddleware);


app.listen(port,()=>{
    console.log(`Server is listening on ${port}`)
})
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const conf = require('./default.json')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

// Connecting to the database
const uri = conf.mongo_url;
mongoose.Promise = global.Promise;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology : true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.use(cors())
app.use(express.json())

const exerciseRouter = require('./services/routes/exercises')
const userRouter = require('./services/routes/user')

app.use('/exercises',exerciseRouter)
app.use('/user',userRouter)

app.listen(port,()=>{
    console.log(`Server is running on port: ${port}`)
})
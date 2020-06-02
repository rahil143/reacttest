const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        minlenght : 3
    },
    email :{
        type : String,
        required : true,
        trim : true,
        minlenght: 10
    },
    password :{
        type : String,
        required : true,
        trim : true,
        minlenght : 10
    }
},{
    timestamps : true
})

const User = mongoose.model('users',userSchema)
module.exports = User;
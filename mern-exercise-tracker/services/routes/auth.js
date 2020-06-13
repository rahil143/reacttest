const express = require('express').Router
const user = require('../models/user.model')

//Validation
const Joi = require('@hapi/joi')

const schema ={
    name : Joi.string().min(6).required(),
    email : Joi.string().email().min(6).required(),
    password : Joi.string.min(6).require()
}


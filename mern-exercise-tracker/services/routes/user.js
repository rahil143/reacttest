const router = require('express').Router()
let User = require('../models/user.model')

router.route('/').get((req,res)=>{
    User.find()
        .then(users => res.json(users))
        .catch(err => res.sendStatus(400).json('Error: '+err))
})

router.route('/').post((req,res)=>{
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password

    //Validation
    if( !name || !email || !password){
        res.status(400).json({message : 'Please enter all fields'})
    }

    //Duplicate User Check
    User.findOne({email})
        .then(user=>{
            if(user) return res.status(500).json({message : 'User Email already Exits'})
            
            const newUser = new User({name,email,password})

            newUser.save()
                .then(()=> res.json('User Added'))
                .catch(err=> res.status(400).json('Error: '+err))
        })
})

router.route('/:id').get((req,res)=>{
    User.findById(req.params.id)
    .then(users => res.json(users))
    .catch(err => res.sendStatus(400).json('Error: '+err))
})

router.route('/:id').delete((req,res)=>{
    User.findByIdAndDelete(req.params.id)
        .then(users => res.json(users))
        .catch(err => res.sendStatus(400).json('Error: '+err))
})

router.route('/update/:id').post((req,res)=>{
    User.findById(req.params.id)
        .then(users =>{
            users.name = req.body.name
            users.email = req.body.email
            users.password = req,body.password
            users.save()
                .then(()=> res.json('User Updated'))
                .catch(err=> res.status(400).json('Error: '+err))
        })
})

router.route('/add').post((req,res)=>{
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password

    const newUser = new User({name,email,password})

    newUser.save()
        .then(()=> res.json('User Added'))
        .catch(err=> res.status(400).json('Error: '+err))
})

module.exports = router;
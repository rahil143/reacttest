const router = require('express').Router()
let User = require('../models/user.model')

router.route('/').get((req,res)=>{
    User.find()
        .then(users => res.json(users))
        .catch(err => res.sendStatus(400).json('Error: '+err))
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
            users.username = req.body.username
            users.save()
                .then(()=> res.json('User Updated'))
                .catch(err=> res.status(400).json('Error: '+err))
        })
})

router.route('/add').post((req,res)=>{
    const username = req.body.username
    const newUser = new User({username})

    newUser.save()
        .then(()=> res.json('User Added'))
        .catch(err=> res.status(400).json('Error: '+err))
})

module.exports = router;
const router = require('express').Router()
let User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const conf = require('../../default.json')
const jwt = require('jsonwebtoken')

router.route('/').get((req,res)=>{
    User.find()
        .then(users => res.json(users))
        .catch(err => res.sendStatus(400).json('Error: '+err))
})

router.post('/', async (req, res) => {
    const { name, email, password } = req.body;
  
    // Simple validation
    if (!name || !email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }
  
    try {
      const user = await User.findOne({ email });
      if (user) throw Error('User already exists');
  
      const salt = await bcrypt.genSalt(10);
      if (!salt) throw Error('Something went wrong with bcrypt');
  
      const hash = await bcrypt.hash(password, salt);
      if (!hash) throw Error('Something went wrong hashing the password');
  
      const newUser = new User({
        name,
        email,
        password: hash
      });
  
      const savedUser = await newUser.save();
      if (!savedUser) throw Error('Something went wrong saving the user');
  
      const token = jwt.sign({ id: savedUser._id }, conf.jwtSecret, {
        expiresIn: 3600
      });
  
      res.status(200).json({
        token,
        user: {
          id: savedUser.id,
          name: savedUser.name,
          email: savedUser.email
        }
      });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  });

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

module.exports = router;
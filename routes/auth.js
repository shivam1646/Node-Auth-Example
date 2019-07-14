const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs'); // hash passwords
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation} = require('../validation');

router.post('/register',async (req,res) => {
    // validate user before adding to db
    const {error} = registerValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // check if user already exists
    const userExists = await User.findOne({email: req.body.email});
    if (userExists) {
        return res.status(400).send('User with same email already exists');
    }

    // hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    
    // create new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
    });

    //add user to db
    try {
        const savedUser = await user.save();
        res.send({user: user._id});
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/login', async (req,res) => {
    // validate user before logging in
    const {error} = loginValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // check if user already exists
    const user = await User.findOne({email: req.body.email});
    if (!user) {
        return res.status(400).send('Email or password is incorrect.');
    }

    // check if password is valid
    const validPassword = bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send('Email or password is incorrect.');
    }

    // create and assign jwt token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
});
module.exports = router;
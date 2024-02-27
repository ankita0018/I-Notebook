const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchuser')

const JWT_SECRET = 'sudy$issudy';

//Route 1: create user using POST api/auth/createUser
router.post('/createUser', [
    check('name', 'Enter a valid name').isLength({ min: 3 }),
    check('email', 'Enter a valid email').isEmail(),
    check('password', 'Password must be 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    let sucess = false;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ sucess, errors: errors.array() });
        }

        const { name, email, password } = req.body;

        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ sucess, error: 'Email already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        sucess = true;
        res.json({ authToken ,sucess});

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});


//Route 2: login user using POST api/auth/login
router.post('/login', [
    check('email', 'Enter a valid email').isEmail(),
    check('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    let sucess = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        sucess = false;
        return res.status(400).json({ sucess, errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ sucess, error: "Please try to login with correct credentials" })
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ sucess, error: "Please try to login with correct credentials" })
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        sucess = true;
        res.json({ sucess,authToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
});

//Route 3: get logged in user details using: POST api/auth/getUser. Login required
router.post('/getUser', fetchUser, async (req, res) => {

    try {
        userId=req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
});
    module.exports = router;




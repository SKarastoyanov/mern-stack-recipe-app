const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');

const { protect } = require('../../middleware/authMiddleware');
const { JWT_SECRET } = require('../../config/keys');

//User Model
const User = require('../../models/User');

//@route GET api/users
//@desc Get All Users
//@Acces Private
router.get('/', (req, res) => {
    User.find()
        .then(users => res.json(users))
});

//@route GET api/users/id
//@desc Get User By Id
//@Acces Private
router.get('/:id', (req, res) => {
    const { id: _id } = req.params;
    User.findById(_id)
        .then(user => res.json(user))
});


//@route POST api/users
//@desc  Register A User
//@Acces Public
router.post('/', asyncHandler(async (req, res) => {
    const { firstName, lastName, loginName, password, gender, role, img, introduction, userStatus, ownRecipes, favourites } = req.body;

    if (!loginName || !password) {
        res.status(400)
        throw new Error('Login name and Password are required')
    }

    //Check if user exists
    const userExists = await User.findOne({ loginName });

    if (userExists) {
        res.status(400)
        throw new Error('User already exists');
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    //Create user
    const newUser = await User.create({
        firstName,
        lastName,
        loginName,
        password: hashedPassword,
        gender,
        role,
        img,
        introduction,
        userStatus,
        ownRecipes,
        favourites
    })

    if (newUser) {
        res.status(201).json({
            _id: newUser.id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            loginName: newUser.loginName,
            token: generateToken(newUser._id)
        })
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
}));

//@route LOGIN api/users/login
//@desc Authenticate a users
//@Acces Public
router.post('/login', protect, asyncHandler(async (req, res) => {
    const { loginName, password } = req.body

    const loginUser = await User.findOne({ loginName });

    if (loginUser && (await bcrypt.compare(password, loginUser.password))) {
        res.json({
            _id: loginUser.id,
            loginName: loginUser.loginName,
            token: generateToken(loginUser._id)
        })
    } else {
        res.status(400);
        throw new Error('Invalid credentials');
    }
}))

//@route DELETE api/users/:id
//@desc Delete a Users
//@Acces Public
router.delete('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => user.remove().then(() => res.json({ success: true })))
        .catch(error => res.status(404).json({ success: false }));
})

//@route PUT api/users/:id
//@desc Update an Users
//@Acces Public
router.put('/:id', (req, res) => {
    const { id: _id } = req.params;
    const {
        firstName,
        lastName,
        loginName,
        password,
        gender,
        role,
        img,
        introduction,
        userStatus,
        ownRecipes,
        favourites,
        modified = new Date()
    } = req.body;

    const newUser = {
        firstName,
        lastName,
        loginName,
        password,
        gender,
        role,
        img,
        introduction,
        userStatus,
        ownRecipes,
        favourites,
        modified
    };

    User.findByIdAndUpdate(_id, newUser)
        .then((user) => res.json({ user, success: true, msg: 'User Updated' }))
        .catch((err) => res.status(404).json({ err, success: false, msg: 'Failed to update user' }));
})

//Generate JTW token
const generateToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, {
        expiresIn: '3d'
    })
}

module.exports = router;
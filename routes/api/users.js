const express = require('express');
const router = express.Router();

//User Model
const User = require('../../models/User');

//@route GET api/users
//@desc Get All Users
//@Acces Public
router.get('/', (req, res) => {
    User.find()
        .then(users => res.json(users))
});

//@route GET api/users/id
//@desc Get User By Id
//@Acces Public
router.get('/:id', (req, res) => {
    const { id: _id } = req.params;
    User.findById(_id)
        .then(user => res.json(user))
});


//@route POST api/users
//@desc  Create A User
//@Acces Private
router.post('/', (req, res) => {
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        loginName: req.body.loginName,
        password: req.body.password,
        gender: req.body.gender,
        role: req.body.role,
        img: req.body.img,
        introduction: req.body.introduction,
        userStatus: req.body.userStatus,
        ownRecipes: req.body.ownRecipes,
        favourites: req.body.favourites
    })

    newUser.save().then(user => res.json(user));
});

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

module.exports = router;
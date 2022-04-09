const express = require('express');
const User = require('../../models/User');
const router = express.Router();

router.post('/login', (req, res) => {
    const loginName = req.body.loginName;
    User.findOne({ 'loginName': loginName })
        .then(user => {
            if (user && user.password === req.body.password) {
                return res.json(user)
            }

            return res.status(404).json({ error: 'Incorrect credentials' })
        })
        .catch(error => res.status(500).json({ error, message: 'error fetching from db' }))
});

module.exports = router;
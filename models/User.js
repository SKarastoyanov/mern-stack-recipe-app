const { type } = require('express/lib/response');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ROLE_ADMIN = 'ROLE_ADMIN';
const ROLE_USER ='ROLE_USER';
const STATUS_ACTIVE = 'STATUS_ACTIVE'
const STATUS_DEACTIVATED = "STATUS_DEACTIVATED";
const STATUS_SUSPENDED = "STATUS_SUSPENDED";

//Create Schema
const UserSchema = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    loginName: {
        type: String,
        required: [true, 'Please add a login name']
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    gender: {
        type: String
    },
    role: {
        type: String
    },
    img: {
        type: String
    },
    introduction: {
        type: String
    },
    userStatus: {
        type: String
    },
    ownRecipes: {
        type: []
    },
    favourites: {
        type: []
    },
    registrationDate: {
        type: Date,
        default: Date.now
    },
    modified: {
        type: Date,
        default: Date.now
    }
})

module.exports = user = mongoose.model('user', UserSchema);
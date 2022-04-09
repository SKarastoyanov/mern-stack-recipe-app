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
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    loginName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    introduction: {
        type: String,
        required: true
    },
    userStatus: {
        type: String,
        required: true
    },
    ownRecipes: {
        type: [],
        required: true
    },
    favourites: {
        type: [],
        required: true
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
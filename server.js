const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const api = require('./routes/api/api');
const users = require('./routes/api/users');
const recipes = require('./routes/api/recipes');

const app = express();

//Bodyparser Middleware
app.use(bodyParser.json());
app.use(cors());

//DB config
const db = require('./config/keys').mongoURI;

//Connect to Mongo
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected...'))
    .catch(error => console.log(error));

//Use Routes
app.use('/api', api);
app.use('/api/users', users);
app.use('/api/users/login', users);
app.use('/api/recipes', recipes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
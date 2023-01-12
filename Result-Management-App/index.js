const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const teacherRoute = require('./routes/teacher');
const studentRoute = require('./routes/student');

const app = express(); 

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));

// View Engine Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Teacher and Student Routes
app.use('/teacher', teacherRoute);
app.use('/student', studentRoute);


app.get("/", (req, res) => {
    res.render('../views/pages/index');
});

mongoose.connect('mongodb://localhost/ResultManagementApp')
    .then(() => console.log('Connected to MongoDb....'))
    .catch(err => console.error('Could not connect to MongoDb...', err));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}...`);
})
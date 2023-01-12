const { Student, validate } = require('../models/student');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/login', (req, res) => {
    res.render('studentViews/loginView', {error: ""});
});

router.post('/login', async (req, res) => {
    const student = await Student.findOne({roll : req.body.roll});
    if(!student) {
        res.render('studentViews/loginView', {error : 'Login with Correct credentials...'}); 
    }else{
        res.render('studentViews/indexView', {student});
    }
});


module.exports = router;
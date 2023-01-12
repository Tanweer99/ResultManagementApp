const { Student, validate } = require('../models/student');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/view', async (req, res) => {
    const students = await Student.find().sort('name');
    res.render('teacherViews/indexView', {students});
});


router.get('/login', (req, res) => {
    res.render('teacherViews/loginView', {error: ""});
});

router.post('/login', (req, res) => {
    if(req.body.password === '1234') {
        res.redirect('/teacher/view');
    }
    else{
        res.render('teacherViews/loginView', {error : "Enter Correct Password..."});
    }
});


router.get('/add', (req, res) => {
    res.render('teacherViews/addView', {message : ""});
})

router.post('/add', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).render('pages/error', {message: error.details[0].message});
    
    let student = new Student({
        roll: req.body.roll,
        name: req.body.name,
        dob: req.body.dob,
        score: req.body.score
    });

    try {
        student = await student.save();
        res.render('teacherViews/addView', {message : "Student added successfully.."});
    } catch {
        res.render('../views/pages/error', {message : ""});
    }
});

router.get('/update/:id', async(req, res) => {
    const student = await Student.findById(req.params.id);
    res.render('teacherViews/editView', {student}); 
});

router.post('/update/:id', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).render('pages/error', {message: error.details[0].message});
    
    await Student.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        dob: req.body.dob,
        score: req.body.score
    });
    res.redirect('/teacher/view');
});


router.get('/delete/:id', async (req, res) => {
    const student = await Student.findByIdAndDelete(req.params.id);

    if(!student) return res.status(404).render('pages/error', {message: 'The Student with the given Id is not found...'});

    res.redirect('/teacher/view');
})


module.exports = router;
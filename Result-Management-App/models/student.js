const mongoose = require('mongoose');
const Joi = require('joi');

const Student = mongoose.model('Student', new mongoose.Schema({
    roll: {
        type: Number,
        unique: true,
    },
    name: {
        type: String,
        require: true,
        minlength: 3,
        maxlenght: 50
    },
    dob: {
        type: Date,
    },
    score: {
        type: Number,
        require: true,
        min: 0,
        max: 100
    }
}));

function validateStudent(student) {
    const schema = Joi.object({
        roll: Joi.number().required(),
        name: Joi.string().min(3).max(50).required(),
        dob: Joi.date(),
        score: Joi.number().min(0).max(100).required()
    });
    return schema.validate(student);
}

module.exports.Student = Student;
module.exports.validate = validateStudent;
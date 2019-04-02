var mongoose = require('mongoose');
var Student  = require('../models/student');

module.exports.getAllStudents = function getAllStudents(req, res, next){
  Student.find()
        .exec()
        .then(results => {
            if(results.length > 0){
                res.status(200).json({
                    nums: results.length,
                    students: results.map( result => {
                        return {
                            id: result._id,
                            name: result.name,
                            gender: result.gender,
                            age: result.age,
                            address: result.address
                        }
                    })
                });
            }
            else{
                res.status(201).json({
                    message: 'No entries found'
                });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: error
            })
        });
}

module.exports.addNewStudent = function addNewStudent(req, res, next){

    var jsObject = req.swagger.params['body'].value;

    const student = new Student({
        _id: mongoose.Types.ObjectId(),
        name: jsObject.name,
        gender: jsObject.gender,
        age: jsObject.age,
        address: jsObject.address
    });
   
    student.save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Add Student successfull'
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: error
            });
        });
}

module.exports.getStudentById = function getStudentById(req, res, next){
    const id = req.swagger.params['studentId'].value;
    Student.findById(id)
        .exec()
        .then(result => {
                res.status(200).json({
                    id: result._id,
                    name: result.name,
                    gender: result.gender,
                    age: result.age,
                    address: result.address
                });
            }
        )
        .catch(err => {
            console.log(err);
            res.status(404).json({
                message: 'No student with this id'
            });
        });
}

module.exports.updateStudentById = function updateStudentById(req, res, next){
    const id = req.swagger.params['studentId'].value;
    var jsObject = req.swagger.params['body'].value;

    const tmpObject = {
        name: jsObject.name, 
        gender: jsObject.gender, 
        age: jsObject.age, 
        address: jsObject.address
    }

    Student.updateOne({_id: id}, {$set: tmpObject})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Updated student'
            });
        }).catch(err  => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

module.exports.deleteStudentById = function deleteStudentById(req, res, next){
    const id = req.swagger.params['studentId'].value;
    Student.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Student deleted'
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: error
            });
        })
}


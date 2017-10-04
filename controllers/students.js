//con exports conseguimos modularizarlo y que
//pueda ser llamadoo desde el archivo principal
//de la aplicación

var mongoose = require('mongoose');
var Student = mongoose.model('Student');

//Return all students in db
exports.findAllStudents = function (req,res) {
    Student.find(function (err, students) {
        if(err)
            res.send(500,err.message);

        console.log('GET /students');
        res.status(200).jsonp(students);
    });
};

//GET - Return a Student with specified ID
exports.findStudentById = function(req, res) {
    Student.findStudentById(req.params.id, function(err, student) {
        if(err) return res.send(500, err.message);

        console.log('GET /student/' + req.params.id);
        res.status(200).jsonp(student);
    });
};

//POST - INSERT a new Student into db
exports.addStudent = function (req, res) {
    console.log("POST");
    console.log(req.body);

    var student = new Student(({
        nombre:    req.body.nombre,
        apellido:  req.body.apellido,
        edad:      req.body.edad,
        genero:    req.body.genero
    }));

    student.save(function (err, student) {
        if(err)
            return res.status(500).send(err.message);
        res.status(200).jsonp(student);
    });
};

//DELETE - Delete Student with this ID
exports.deleteStudent = function (req, res) {
    Student.findStudentById(req.params.id, function (err, student) {
        student.remove(function (err) {
            if(err)
                return res.status(500).send(err.message);
            res.status(200).send();
        });
    });
};

//PUT - Update a register that already exists
exports.updateStudent = function (req, res) {
    Student.findStudentById(req.params.id, function (err, student) {
        student.nombre  = req.body.nombre;
        student.apellido    = req.body.apellido;
        student.edad = req.body.edad;
        student.genero  = req.body.genero;

        student.save(function (err) {
            if(err)
                return res.status(500).send(err.message);
            res.status(200).jsonp(student);
        });
    });
};

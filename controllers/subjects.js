var mongoose = require('mongoose');
var Subject  = mongoose.model('Subject');

//var models = require('./models/student')(app, mongoose);
var studentAccess = require('C:\\Users\\EY432MM\\WebstormProjects\\RestExample\\models\\student.js');

//GET - Return all tvshows in the DB
exports.findAllSubjects = function(req, res) {
    Subject.find(function(err, subject) {
        if(err) res.send(500, err.message);

        console.log('GET /subject')
        res.status(200).jsonp(subject);
    });
};

//GET - Return a Students with specified ID
exports.findSubjectById = function(req, res) {
    Subject.findStudentById(req.params.id, function(err, subject) {
        if(err) return res.send(500, err.message);

        console.log('GET /subject/' + req.params.id);
        res.status(200).jsonp(subject);
    });
};

//POST - Insert a new Student in the DB
exports.addSubject = function(req, res) {
    console.log('POST');
    console.log(req.body);

    var subject = new Subject({
        nombre:    req.body.nombre,
        tipo: 	  req.body.tipo,
        estudiantes:  req.body.estudiantes
    });

    subject.save(function(err, subject) {
        if(err) return res.status(500).send( err.message);
        res.status(200).jsonp(subject);
    });
};

//PUT - Update a register already exists
exports.updateSubject = function(req, res) {

         Subject.findById(req.params.id, function(err, subject) {
             subject.nombre = req.body.nombre;
             subject.tipo = req.body.tipo;

             studentAccess.findOne({ _id: req.body.estudiantes},
                 function (err, estudiantes) {
                     if(err){
                         res.send(err);
                         Console.log(err);
                         res.json(estudiantes);
                     }
                     else if (estudiantes == null){
                         console.log("El usuario no existe");
                         console.log("estudiante: "+estudiantes);
                         res.json(estudiantes);
                     }
                     else{
                         console.log("El usuario existe, vamos a insertarlo");
                     }
                 }
                 )
         /*    studentAccess.findStudentById(req.body.estudiantes, function(err, student) {
                 console.log('GET /student/' + req.params.id);
                 if(err) subject.estudiantes = subject.estudiantes.concat(req.body.estudiantes);
                 else console.log("el usuario ya está en la asignatura");
                 res.status(200).jsonp(student);
             });
            */

            /* subject.save(function(err) {
                 if(err) return res.status(500).send(err.message);
                 res.status(200).jsonp(subject);
             }); */
         });
};

//DELETE - Delete a Student specified ID
exports.deleteSubject = function(req, res) {
    Subject.findStudentById(req.params.id, function(err, subject) {
        subject.remove(function(err) {
            if(err) return res.status(500).send(err.message);
            res.status(200).send();
        })
    });
};

/* //GETE - Find students from subject by ID
exports.findStudentFromSubjectById = function (req, res) {
    studentAccess.findStudentById(req.params.id, function (err, student) {
        if(err) return false;
        res.status(200).jsonp(student);
    });
}; */
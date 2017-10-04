var mongoose = require('mongoose');
var Subject  = mongoose.model('Subject');

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
    Subject.findById(req.params.id, function(err, subject) {
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
        subject.estudiantes = req.body.estudiantes;

        subject.save(function(err) {
            if(err) return res.status(500).send(err.message);
            res.status(200).jsonp(subject);
        });
    });
};

//DELETE - Delete a Student specified ID
exports.deleteSubject = function(req, res) {
    Subject.findById(req.params.id, function(err, subject) {
        subject.remove(function(err) {
            if(err) return res.status(500).send(err.message);
            res.status(200).send();
        })
    });
};
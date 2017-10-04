var mongoose = require('mongoose');
var Subject = mongoose.model('Subject');

// Guarda un objeto subject en base de datos
exports.addAsignatura = function(req, res) {

    var subject = new Subject(({
        nombre :req.body.nombre,
        tipo : req.body.tipo,
        estudiantes: req.body.estudiantes}));

    subject.save(function (err, subject) {
        if(err)
            return res.status(500).send(err.message);
        res.status(200).jsonp(subject);
    });
};

//Return all subjects in db
exports.findAllSubjects = function (req, res) {
    Subject.find(function (err, subjects) {
        if(err)
            res.send(500, err.message);

        console.log('GET /subjects');
        res.status(200).jsonp(subjects);
    })
}
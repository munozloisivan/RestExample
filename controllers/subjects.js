var mongoose = require('mongoose');
var Subject  = mongoose.model('Subject');

//var models = require('./models/student')(app, mongoose);
var studentAccess = require('C:\\Users\\EY432MM\\WebstormProjects\\RestExample\\models\\student.js');
var Student = require('C:\\Users\\EY432MM\\WebstormProjects\\RestExample\\models\\student.js');

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


//añadimos estudiante a asignatura
exports.updateSubject = function (req, res) {
    Subject.findById(req.params.id, function (err,subject) {
        subject.nombre = req.body.nombre;
        subject.tipo = req.body.tipo;

        console.log("longu = "+subject.estudiantes.length);
        console.log("est0 "+subject.estudiantes[0]);
        console.log("est1 "+subject.estudiantes[1]);

        if (req.body.estudiantes == null){
            subject.save(function(err) {
                if(err) return res.status(500).send(err.message);
                res.status(200).jsonp(subject);
            });
        }

        if(req.body.estudiantes != null){
            Student.findOne({ _id : req.body.estudiantes},
                function (err, estudiante) {
                    if(err){
                        res.send(err);
                        console.log(err);
                        res.json(estudiante);
                    }
                    else if(estudiante == null){
                        console.log("El usuari no existe");
                        res.json(estudiante);
                    }
                    else {
                        console.log("Existe el usuario");
                        //subject.estudiantes = subject.estudiantes.concat(req.body.estudiantes);
                        var find;
                        for(var i=0; i<subject.estudiantes.length;i++){
                            console.log("estudiante "+subject.estudiantes[i]);
                            if(subject.estudiantes[i].toString() == req.body.estudiantes){
                                console.log("Ya está incrito en la asignatura!");
                                find=true;
                            }
                            console.log("FIND es "+find);
                        }

                        if(find != true){
                            console.log("NO está en la asignatura, vamos a añadirlo puehh!")
                            subject.estudiantes = subject.estudiantes.concat(req.body.estudiantes);
                            console.log("Usuario " +req.body.estudiantes);
                        }

                    }
                    subject.save(function(err) {
                        if(err) return res.status(500).send(err.message);
                        res.status(200).jsonp(subject);
                    });
                });
        }
    });

};



//PUT - Update a subject already exists
/*exports.updateSubject = function(req, res) {
    Subject.findById(req.params.id, function(err, subject) {
        subject.nombre = req.body.nombre;
        subject.tipo = req.body.tipo;

        studentAccess.findOne({_id: req.body.estudiantes}, function (err,estudiantes) {
                if(err){
                    res.send(err);
                    Console.log(err);
                    res.json(estudiantes);
                }
                else{
                    for(i in subject.estudiantes){
                        if (subject.estudiantes[i] == req.body.estudiantes) {
                            console.log("estudiante: " + subject.estudiantes[i] + " comprobado: " + req.body.estudiantes);
                        }
                        else
                            subject.estudiantes = subject.estudiantes.concat(req.body.estudiantes);
                    }
                }
        });
        subject.save(function(err) {
            if(err) return res.status(500).send(err.message);
            res.status(200).jsonp(subject);
        });
    });
};
*/

//DELETE - Delete a Subject specified ID
exports.deleteSubject = function(req, res) {
    Subject.findById(req.params.id, function(err, subject) {
        subject.remove(function(err) {
            if(err) return res.status(500).send(err.message);
            res.status(200).send();
        })
    });
};

/* //GET - Find students from subject by ID
exports.findStudentFromSubjectById = function (req, res) {
    studentAccess.findById(req.params.id, function (err, student) {
        if(err) return false;
        res.status(200).jsonp(student);
    });
}; */
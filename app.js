//incluimos las dependencias que usaremos
var express = require("express"),
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override");
mongoose = require('mongoose');

// Connection to DB
mongoose.connect('mongodb://localhost/students', function(err, res) {
    if(err) throw err;
    console.log('Connected to Database');
});

//Utils extra
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

//Controllers y modelos
var models = require('./models/student')(app, mongoose);
var StudentsCtrl = require('./controllers/students.js');


//Example Route
var router = express.Router();
router.get('/', function(req, res) {
    res.send("Hello World!");
});
app.use(router);

//API Students Routes
var students = express.Router();

students.route('/students')
    .get(StudentsCtrl.findAllStudents)
    .post(StudentsCtrl.addStudent);

students.route('/students/:id')
    .get(StudentsCtrl.findById)
    .put(StudentsCtrl.updateStudent)
    .delete(StudentsCtrl.deleteStudent);

app.use('/api', students);

//Start server
app.listen(3000, function() {
    console.log("Server running on http://localhost:3000");
});
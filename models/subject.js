var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var subjectSchema = new Schema({
    nombre: {type: String},
    tipo: {type: String, enum:['Obligatoria','Optativa']},
    estudiantes: [{type: mongoose.Schema.Types.ObjectId, ref:'Student'}]
});

module.exports = mongoose.model('Asignatura',subjectSchema);
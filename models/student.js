var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var studentSchema = new Schema({
    nombre:    { type: String },
    apellido:  { type: String },
    edad:      { type: Number },
    genero:    { type: String, enum:
        ['Hombre', 'Mujer']
    }
});

module.exports = mongoose.model('Student', studentSchema);
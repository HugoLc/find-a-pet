const mongoose = require('mongoose')


const DataSchema = new mongoose.Schema({
    especie_quiz: String,
    sexo_quiz: String,
    idade_quiz: String,
    porte_quiz: String,
    estado_quiz: String,
    cidade_quiz: String,
    rotina_quiz: String,
    casa_quiz: String,
    outros_pets_quiz: String,
    criancas_quiz: String
})

const quiz = mongoose.model("Quiz", DataSchema)

module.exports = quiz;
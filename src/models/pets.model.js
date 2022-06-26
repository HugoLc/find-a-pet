const mongoose = require('mongoose')


const DataSchema = new mongoose.Schema({
    nome_pet: String,
    especie_pet: String,
    sexo_pet: String,
    idade_pet: String,
    porte_pet: String,
    estado_pet: String,
    cidade_pet: String,
    sobre_pet: String,
    img_pet: String,
    cuidados_vet_pet: [String],
    temperamento_pet: [String],
    ambiente_pet:[String],
    sociavel_pet:[String]
})

const pets = mongoose.model("Pets", DataSchema)

module.exports = pets;
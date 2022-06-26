const Pets = require('../models/pets.model')

module.exports = {
    async index(req, res){
        const pets = await Pets.find();
        res.json(pets)
    },

    async cadastro(req,res){
        const {
            nome_pet,
            especie_pet,
            sexo_pet,
            idade_pet,
            porte_pet,
            estado_pet,
            cidade_pet,
            sobre_pet,
            img_pet,
            cuidados_vet_pet,
            temperamento_pet,
            ambiente_pet,
            sociavel_pet
        } = req.body

        const data = {
            nome_pet,
            especie_pet,
            sexo_pet,
            idade_pet,
            porte_pet,
            estado_pet,
            cidade_pet,
            sobre_pet,
            img_pet,
            cuidados_vet_pet,
            temperamento_pet,
            ambiente_pet,
            sociavel_pet
        }

        const pet = await Pets.create(data)
        return res.status(200).json(pet)

    }
}
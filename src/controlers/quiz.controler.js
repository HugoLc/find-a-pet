const Quiz = require("../models/quiz.model")


function fitness(){
    return new Promise((resolve) =>{
        
        resolve()
    })
}

module.exports = {
    async quiz(req,res){
        const {
            especie_quiz,
            sexo_quiz,
            idade_quiz,
            porte_quiz,
            estado_quiz,
            cidade_quiz,
            rotina_quiz,
            casa_quiz,
            outros_pets_quiz,
            criancas_quiz
        } = req.body

        const data = {
            especie_quiz,
            sexo_quiz,
            idade_quiz,
            porte_quiz,
            estado_quiz,
            cidade_quiz,
            rotina_quiz,
            casa_quiz,
            outros_pets_quiz,
            criancas_quiz
        }

        // fitness
        res.json(await fitness(data))
    }
}
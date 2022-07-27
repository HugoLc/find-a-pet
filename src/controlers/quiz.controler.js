const Quiz = require("../models/quiz.model")

function filterPets(){
    return new Promise((resolve) =>{
        // filtrar por espécie

        // filtrar por sexo

        // filtrar por porte

        // filtrar por estado
        
        // filtrar por cidade (se houver)

        resolve(/* pets filtrados */)
    })
    
}

function fitness(quizData){
    return new Promise((resolve) =>{
        const filteredPets = filterPets();
        
        // comparar atividade X temperamento
        // comparar disponibilidade X temperamento

        // comparar crianças X sociavel

        // comparar gatos x sociavel

        // comparar cachorros x sociavel

        // comparar casa x ambiente

        // resolve(/* pet selecionado */)
        resolve(quizData)
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

            atividade_quiz,
            disponibilidade_quiz,
            casa_quiz,
            cao_pet_quiz,
            gato_pet_quiz,
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
            atividade_quiz,
            disponibilidade_quiz,
            casa_quiz,
            cao_pet_quiz,
            gato_pet_quiz,
            outros_pets_quiz,
            criancas_quiz
        }

        // fitness
        res.json(await fitness(data))
    }
}
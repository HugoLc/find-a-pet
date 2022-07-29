// const Quiz = require("../models/quiz.model")
const Pets = require("../models/pets.model")

function handleQuizData({
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
}) {
    let formatedQuizData = {
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

    switch (especie_quiz) {
        case 'CACHORRO':
            formatedQuizData.especie_quiz = "CAO"
            break;
        default:
            break;
    }

    switch (sexo_quiz) {
        case 'MACHO':
            formatedQuizData.sexo_quiz = "M"
            break;
        case 'FÊMEA' || "FEMEA":
            formatedQuizData.sexo_quiz = "F"
            break;
        default:
            break;
    }

    return formatedQuizData
}

function handleTodosField(filteredData) {
    return new Promise((resolve) => {
        Object.keys(filteredData).forEach((item) => {
            // console.log(typeof filteredData[item]);
            // console.log(filteredData)
            if (filteredData[item] === "TODOS") {
                // console.log(item)
                delete filteredData[item]
            }
        })
        resolve(filteredData)
    })
}

function filterPets(quizData) {
    return new Promise(async (resolve) =>{
        // filtrar por espécie
        const filteredData = handleQuizData(quizData)
        //{{VERIFICAR SE É TODOS}}

        await handleTodosField(filteredData)

        const {
            idade_quiz,
            porte_quiz,
            sexo_quiz,
            especie_quiz
        }=filteredData

        console.log({
            idade_quiz,
            porte_quiz,
            sexo_quiz,
            especie_quiz
        })
        const filteredPets = Pets.find({
            especie_pet: especie_quiz,
            sexo_pet: sexo_quiz,
            idade_pet: idade_quiz,
            porte_quiz: porte_quiz
        })

        // SE FILTEREDPETS.DATA.LENGHT() === 0
            //TENTAR SEM A CIADADE
        // SE FILTEREDPETS.DATA.LENGHT() === 0
            //TENTAR SEM O ESTADO
        

        // filtrar por sexo

        // filtrar por porte

        // filtrar por estado
        
        // filtrar por cidade (se houver)
        // console.log(filteredPets)
        resolve(filteredPets)
    })
    
}

function fitness(quizData){
    return new Promise(async (resolve) =>{
        //// extrair info do banco de dados////
        // filtro de exclusão
        const filteredPets = await filterPets(quizData);


        // comparar atividade X temperamento
        // comparar disponibilidade X temperamento

        // comparar crianças X sociavel

        // comparar gatos x sociavel

        // comparar cachorros x sociavel

        // comparar casa x ambiente

        // resolve(/* pet selecionado */)
        resolve(filteredPets)
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
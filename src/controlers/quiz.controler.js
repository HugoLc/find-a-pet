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
        especie_pet : especie_quiz,
        sexo_pet : sexo_quiz,
        idade_pet : idade_quiz,
        porte_pet : porte_quiz,
        estado_pet : estado_quiz,
        cidade_pet : cidade_quiz,
        /* atividade_pet : atividade_quiz,
        disponibilidade_pet : disponibilidade_quiz,
        casa_pet : casa_quiz,
        cao_pet_pet : cao_pet_quiz,
        gato_pet_pet : gato_pet_quiz,
        outros_pets_pet : outros_pets_quiz,
        criancas_pet : criancas_quiz */
    }

    console.log(formatedQuizData)

    switch (formatedQuizData.especie_pet) {
        case 'CACHORRO':
            formatedQuizData.especie_pet = "CAO"
            break;
        default:
            break;
    }

    switch (formatedQuizData.sexo_pet) {
        case 'MACHO':
            formatedQuizData.sexo_pet = "M"
            break;
        case 'FÊMEA' || "FEMEA":
            formatedQuizData.sexo_pet = "F"
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
function removeInfo(filteredData, key) {
    return new Promise((resolve) => {
        Object.keys(filteredData).forEach((item) => {

            if (item === key) {
                // console.log(item)
                delete filteredData[item]
            }
        })
 
        resolve(filteredData)
    })
}



function filterPets(quizData) {
    return new Promise(async (resolve) =>{
        const filteredData = handleQuizData(quizData)
        // VERIFICAR SE É TODOS
        await handleTodosField(filteredData)
        
        const filteredPets = await Pets.find(filteredData)
        console.log("filteredData",filteredData)
        // SE FILTEREDPETS.DATA.LENGHT() === 0
            //TENTAR SEM A CIADADE
        // SE FILTEREDPETS.DATA.LENGHT() === 0
            //TENTAR SEM O ESTADO
            ESTADO PET TA VINDO NUMERO WTF
        if (filteredPets.length === 0) {
            const noCityInfo = await removeInfo(filteredData, "cidade_pet")
            const petsWithoutCity = await Pets.find(noCityInfo)
            console.log("noCityInfo", noCityInfo)
            if (petsWithoutCity.length === 0) {
                const noStateInfo = await removeInfo(noCityInfo,"estado_pet")
                const petsWithoutState = await Pets.find(noStateInfo)
                console.log("petsWithoutState", petsWithoutState)
                resolve(petsWithoutState)
            } else {
                resolve(petsWithoutCity)
            }
            
        } else {
            resolve(filteredPets)
        }
        // console.log(filteredPets)
        
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
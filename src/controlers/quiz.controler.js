// const Quiz = require("../models/quiz.model")
const Pets = require("../models/pets.model");
const setPontuation = require("./Utils/pontuationFunctions");

function handleQuizData({
  especie_quiz,
  sexo_quiz,
  idade_quiz,
  porte_quiz,
  estado_quiz,
  cidade_quiz,
}) {
  let formatedQuizData = {
    especie_pet: especie_quiz,
    sexo_pet: sexo_quiz,
    idade_pet: idade_quiz,
    porte_pet: porte_quiz,
    estado_pet: estado_quiz,
    cidade_pet: cidade_quiz,
  };

  console.log(formatedQuizData);

  switch (formatedQuizData.especie_pet) {
    case "CACHORRO":
      formatedQuizData.especie_pet = "CAO";
      break;
    default:
      break;
  }

  switch (formatedQuizData.sexo_pet) {
    case "MACHO":
      formatedQuizData.sexo_pet = "M";
      break;
    case "FÊMEA" || "FEMEA":
      formatedQuizData.sexo_pet = "F";
      break;
    default:
      break;
  }

  return formatedQuizData;
}
function handleTodosField(filteredData) {
  return new Promise((resolve) => {
    Object.keys(filteredData).forEach((item) => {
      if (filteredData[item] === "TODOS") {
        delete filteredData[item];
      }
    });
    resolve(filteredData);
  });
}
function removeInfo(filteredData, key) {
  return new Promise((resolve) => {
    Object.keys(filteredData).forEach((item) => {
      if (item === key) {
        delete filteredData[item];
      }
    });

    resolve(filteredData);
  });
}
function filterPets(quizData) {
  return new Promise(async (resolve) => {
    const filteredData = handleQuizData(quizData);
    // VERIFICAR SE É TODOS
    await handleTodosField(filteredData);

    const filteredPets = await Pets.find(filteredData);
    console.log("filteredData", filteredData);
    if (filteredPets.length === 0) {
      const noCityInfo = await removeInfo(filteredData, "cidade_pet");
      const petsWithoutCity = await Pets.find(noCityInfo);
      console.log("noCityInfo", noCityInfo);
      if (petsWithoutCity.length === 0) {
        const noStateInfo = await removeInfo(noCityInfo, "estado_pet");
        const petsWithoutState = await Pets.find(noStateInfo);
        console.log("petsWithoutState", petsWithoutState);
        resolve(petsWithoutState);
      } else {
        resolve(petsWithoutCity);
      }
    } else {
      resolve(filteredPets);
    }
  });
}

function rankThePets(quizData, filteredPets) {
  return new Promise(async (resolve) => {
    const {
      atividade_quiz,
      disponibilidade_quiz,
      casa_quiz,
      cao_pet_quiz,
      gato_pet_quiz,
      outros_pets_quiz,
      criancas_quiz,
    } = quizData;

    let petsWithRank = filteredPets;

    petsWithRank.forEach((pet) => {
      pet.pontuation = 0;
      pet.pontuation += await setPontuation.atividade(pet, atividade_quiz);
      pet.pontuation += await setPontuation.disponibilidade(pet, disponibilidade_quiz);
      
    });
  });
}

function fitness(quizData) {
  return new Promise(async (resolve) => {
    //// extrair info do banco de dados////
    // filtro de exclusão
    const filteredPets = await filterPets(quizData);

    const rankedPets = await rankThePets(quizData, filteredPets);

    // comparar atividade X temperamento
    // comparar disponibilidade X temperamento

    // comparar crianças X sociavel

    // comparar gatos x sociavel

    // comparar cachorros x sociavel

    // comparar casa x ambiente

    // resolve(/* pet selecionado */)
    resolve(filteredPets);
  });
}

module.exports = {
  async quiz(req, res) {
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
      criancas_quiz,
    } = req.body;

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
      criancas_quiz,
    };

    // fitness
    res.json(await fitness(data));
  },
};

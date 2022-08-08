const express = require("express");
const routes = express.Router();
const Pets = require("./controlers/pets.controler");
const Quiz = require("./controlers/quiz.controler");

routes.get("/", Pets.index);

routes.post("/api/pet/cadastrar", Pets.cadastro);

routes.post("/api/quiz", Quiz.quiz);

module.exports = routes;

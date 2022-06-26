const express = require('express')
const routes = express.Router()
const Pets = require('./controlers/pets.controler')

routes.get('/', Pets.index)

routes.post('/api/pet/cadastrar', Pets.cadastro)

module.exports = routes
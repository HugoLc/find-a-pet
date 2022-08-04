import React from 'react'
import { useState, useEffect } from 'react'
import styles from './QuizForm.module.scss'
import SelectBar from './SelectBar';
import SelectBoxes from './SelectBoxes';
import axios from 'axios'

const QuizForm = () => {
  const [especie, setEspecie] = useState("todos");
  const [sexo, setSexo] = useState("todos");
  const [idade, setIdade] = useState("todos");
  const [porte, setPorte] = useState("todos");
  const [uf, setUf] = React.useState('AC');
  const [listUf, setListUf] = React.useState([]);
  const [city, setCity] = React.useState('Acrelândia');
  const [listCity, setListCity] = React.useState([]);
  const [valueAtividade, setValueAtividade] = useState(0)
  const [valueDisponibilidade, setValueDisponibilidade] = useState(0)
  const [residencia, setResidencia] = useState("todos")
  const [selectedPetList, setSelectedPetList] = useState([]);

  const [formObject, setFormObject] = useState()

  useEffect(() => {
  }, [selectedPetList])
  

  const handleSubmit = () => {
    const formData = {
      especie_quiz: especie.toUpperCase(),
      sexo_quiz: sexo.toUpperCase(),
      idade_quiz: idade.toUpperCase(),
      porte_quiz: porte.toUpperCase(),
      estado_quiz: uf.toUpperCase(),
      cidade_quiz: city.toUpperCase(),
      atividade_quiz: valueAtividade,
      disponibilidade_quiz: valueDisponibilidade,
      casa_quiz: residencia.toUpperCase(),
      criancas_quiz: selectedPetList.includes("Crianças pequenas"),
      cao_pet_quiz: selectedPetList.includes("Cão"),
      gato_pet_quiz: selectedPetList.includes("Gato"),
      outros_pets_quiz: selectedPetList.includes("Outros"),
    }

    setFormObject(formData)
  }

  const apiRequest = async () => {
    const response = await axios.post('http://localhost:5000/api/quiz', formObject)
    console.log(response)
  }

  useEffect(() => {
    /////////////////////////////////////// post api
    if (formObject) {
      apiRequest()
    }
      
  }, [formObject])
  

  function loadUf() {
      let url = 'https://servicodados.ibge.gov.br/';
      url = url + 'api/v1/localidades/estados';
      fetch(url)
        .then(response => response.json())
        .then(data => {        
          data.sort((a,b) => a.nome.localeCompare(b.nome));
          setListUf([...data]);
         });
  }
  function loadCity(id) {
      let url = 'https://servicodados.ibge.gov.br/api/v1/';
      url = url + `localidades/estados/${id}/municipios`;
      fetch(url)
        .then(response => response.json())
        .then(data => {        
          data.sort((a,b) => a.nome.localeCompare(b.nome));
          setListCity([...data]);
         });
  }
  useEffect(() => {
    loadUf();
  },[]);
  useEffect(() => {
    if (uf) {
      loadCity(uf);
    }
  }, [uf]);

  /* useEffect(() => {
  },[selectedPetList]) */

  /* const selectPetCrianca = (nomeList) => {
    console.log("nome",nomeList)
    setSelectedPetList(nomeList)
    console.log("selectedPetList",selectedPetList);
  } */

  return (
    <div className={styles.formWrapper}>
      <label> Qual seu estado?
        <select value={uf} onChange={e => setUf(e.target.value)}>
          {listUf.map((a, b) => ( 
              // <option key={b}value={a.id}>{a.sigla} - {a.nome}</option>
              <option key={b}value={a.sigla}>{a.sigla} - {a.nome}</option>
          ))}
        </select>
      </label>
      <label> Qual sua cidade?
        <select value={city} onChange={e => setCity(e.target.value)}>
          {listCity.map((a, b) => ( 
              <option key={b} value={a.sigla}>{a.nome}</option>
          ))}
        </select>
      </label>
      <label> Qual espécie procura?
        <select value={especie} defaultValue={"TODOS"}  onChange={(e) => setEspecie(e.target.value)}>
          <option value="TODOS" selected>Todos</option>
          <option value={"GATO"}>Gato</option>
          <option value={"CACHORRO"}>Cachorro</option>
        </select>
      </label>
      <label> Qual o sexo?
        <select value={sexo} defaultValue={"TODOS"} onChange={(e) => setSexo(e.target.value)}>
          <option value="TODOS">Todos</option>
          <option value={"M"}>Macho</option>
          <option value={"F"}>Fêmea</option>
        </select>
      </label>
      <label> Qual idade?
        <select value={idade} defaultValue={"TODOS"} onChange={(e) => setIdade(e.target.value)}>
          <option value="TODOS" selected>Todos</option>
          <option value={"FILHOTE"}>Quero um filhote</option>
          <option value={"ADULTO"}>Quero um(a) companheiro(a) adulto(a)</option>
          <option value={"IDOSO"}>Quero tornar um  bichinho idoso feliz</option>
        </select>
      </label>
      <label> Qual o tamanho?
        <select value={porte} defaultValue={"TODOS"} onChange={(e) => setPorte(e.target.value)}>
          <option value="TODOS" selected>Todos</option>
          <option value={"P"}>Pequeno</option>
          <option value={"M"}>Médio</option>
          <option value={"G"}>Grande</option>
        </select>
      </label>
      <label > Como diria que é seu nível de atividade?
          <SelectBar min="Calmo" max="Agitado" onSelect={(value)=> setValueAtividade(value)}/>
      </label>
      <label > Quanto tempo em média terá disponível para o pet?
          <SelectBar min="Pouco" max="Muito" onSelect={value => setValueDisponibilidade(value)}/>
      </label>
      <label> Casa ou apartamento?
        <select value={residencia} defaultValue={"TODOS"} onChange={(e) => setResidencia(e.target.value)}>
          <option value="TODOS" selected>Todos</option>
          <option value={"CASA"}>Casa</option>
          <option value={"APARTAMENTO"}>Apartamento</option>
        </select>
      </label>
      <label> Há outro pet e/ou crianças na casa?
        <SelectBoxes nomesBoxes={["Cão","Gato","Crianças pequenas","Outros"]} onSelect={nomeList => setSelectedPetList(nomeList)}/>
      </label>
      <button className={styles.enviarBtn} onClick={()=> handleSubmit()}> Enviar </button>

    </div>
  )
}

export default QuizForm
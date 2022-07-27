import React from 'react'
import { useState, useEffect } from 'react'
import styles from './QuizForm.module.scss'
import SelectBar from './SelectBar';
import SelectBoxes from './SelectBoxes';

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
  const [residencia, setResidencia] = useState(0)
  const [selectedPetList, setSelectedPetList] = useState([]);

  const [formObject, setFormObject] = useState()

  useEffect(() => {
  }, [selectedPetList])
  

  const handleSubmit = () => {
    console.log("entrei")
    const formData = {
      especie: especie.toUpperCase(),
      sexo: sexo.toUpperCase(),
      idade: idade.toUpperCase(),
      porte: porte.toUpperCase(),
      estado: uf.toUpperCase(),
      cidade: city.toUpperCase(),
      atividade: valueAtividade,
      disponibilidade: valueDisponibilidade,
      residencia: residencia.toUpperCase(),
      criancas: selectedPetList.includes("Crianças pequenas"),
      petCaes: selectedPetList.includes("Cão"),
      petGatos: selectedPetList.includes("Gato"),
      petOutros: selectedPetList.includes("Outros")
    }

    setFormObject(formData)
  }

  useEffect(() => {
    /////////////////////////////////////// post api
    formObject && console.log(formObject)
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
              <option key={b}value={a.id}>{a.sigla} - {a.nome}</option>
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
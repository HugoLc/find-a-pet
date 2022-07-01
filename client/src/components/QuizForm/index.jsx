import React from 'react'
import { useState } from 'react'
import styles from './QuizForm.module.scss'
import SelectBar from './SelectBar';

const QuizForm = () => {
  const [especie, setEspecie] = useState();
  const [sexo, setSexo] = useState();
  const [idade, setIdade] = useState();
  const [porte, setPorte] = useState();


  const [uf, setUf] = React.useState('AC');
  const [listUf, setListUf] = React.useState([]);
  const [city, setCity] = React.useState('');
  const [listCity, setListCity] = React.useState([]);

  const onSelectAtividade = (value) => {
    alert(value)
  }

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
  React.useEffect(() => {
    loadUf();
  },[]);
  React.useEffect(() => {
    if (uf) {
      loadCity(uf);
    }
  }, [uf]);

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
        <label > Como diria que é seu nível de atividade
            <SelectBar min="Calmo" max="Agitado" onSelect={onSelectAtividade}/>
        </label>

    </div>
  )
}

export default QuizForm
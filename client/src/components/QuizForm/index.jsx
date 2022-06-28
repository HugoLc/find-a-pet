import React from 'react'
import { useState } from 'react'
import styles from './QuizForm.module.scss'

const QuizForm = () => {
  const [especie, setEspecie] = useState();
  const [sexo, setSexo] = useState();
  const [idade, setIdade] = useState();
  const [porte, setPorte] = useState();

  return (
    <div className={styles.formWrapper}>
        <label> Qual espécie procura?
          <select value={especie} onChange={(e) => setEspecie(e.target.value)}>
            <option value="TODOS" selected>Todos</option>
            <option value={"GATO"}>Gato</option>
            <option value={"CACHORRO"}>Cachorro</option>
          </select>
        </label>
        <label> Qual o sexo?
          <select value={sexo} onChange={(e) => setSexo(e.target.value)}>
            <option value="TODOS" selected>Todos</option>
            <option value={"M"}>Macho</option>
            <option value={"F"}>Fêmea</option>
          </select>
        </label>
        <label> Qual idade?
          <select value={idade} onChange={(e) => setIdade(e.target.value)}>
            <option value="TODOS" selected>Todos</option>
            <option value={"FILHOTE"}>Quero um filhote</option>
            <option value={"ADULTO"}>Quero um(a) companheiro(a) adulto(a)</option>
            <option value={"IDOSO"}>Quero tornar um  bichinho idoso feliz</option>
          </select>
        </label>
        <label> Qual o tamanho?
          <select value={porte} onChange={(e) => setPorte(e.target.value)}>
            <option value="TODOS" selected>Todos</option>
            <option value={"P"}>Pequeno</option>
            <option value={"M"}>Médio</option>
            <option value={"G"}>Grande</option>
          </select>
        </label>
        

    </div>
  )
}

export default QuizForm
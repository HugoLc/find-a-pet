import React from 'react'
import { useState } from 'react'
import ItemBox from './ItemBox'
import styles from './SelectBoxes.module.scss'

const SelectBoxes = ({nomesBoxes, onSelect}) => {
    const [selectedList, setSelectedList] = useState([])
    const handleSelect = (nome)=>{
      ///////arrumar aqui pelo array
    }
  return (
    <div className={styles.selectBoxesWrapper}>
        {nomesBoxes.map((nome)=>{
            return <ItemBox nome={nome} setSelected={handleSelect}/>
        })}
    </div>
    
  )
}

export default SelectBoxes
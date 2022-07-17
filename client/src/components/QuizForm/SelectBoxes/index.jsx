import React, { useEffect } from 'react'
import { useState } from 'react'
import ItemBox from './ItemBox'
import styles from './SelectBoxes.module.scss'

const SelectBoxes = ({nomesBoxes, onSelect}) => {
  const [selectedList, setSelectedList] = useState([])
  
  
  const handleSelected = (nome)=>{  
    // setSelectedList(nome)
    const selectedIndex = selectedList.findIndex(elem => elem === nome) 
    if (selectedIndex === -1) {
      setSelectedList([...selectedList, nome])
    } else {
      const aux = selectedList
      console.log(aux)
      const test = aux.splice(selectedIndex, 1)
      console.log(aux)
      setSelectedList(aux)
    }
  }

  useEffect(() => {
    selectedList && onSelect(selectedList)
  }, [selectedList])
  
  return (
    <div className={styles.selectBoxesWrapper}>
        {nomesBoxes.map((nome)=>{
            return <ItemBox nome={nome} returnSelected={handleSelected}/>
        })}
    </div>
    
  )
}

export default SelectBoxes
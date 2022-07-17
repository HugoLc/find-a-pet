import React from 'react'
import styles from './ItemBox.module.scss'
import { useState } from 'react'

const ItemBox = ({nome, returnSelected}) => {
    const [estadoBox,  setEstadoBox] = useState(false)
    const handleClick = ()=>{
        setEstadoBox(!estadoBox)
        returnSelected(nome)
    }
  return (
    <div className={`${styles.itemBox} ${estadoBox? styles.selected : ""}`} onClick={()=> handleClick()}>
        {nome}
    </div>
  )
}

export default ItemBox
import React from 'react'
import styles from './ItemBox.module.scss'
import { useState } from 'react'

const ItemBox = ({nome, setSelected}) => {
    const [estadoBox,  setEstadoBox] = useState(false)
    const handleClick = ()=>{
        setEstadoBox(!estadoBox)
        setSelected(nome)
    }
  return (
    <div className={`${styles.itemBox} ${estadoBox? styles.selected : ""}`} onClick={()=> handleClick()}>
        {nome}
    </div>
  )
}

export default ItemBox
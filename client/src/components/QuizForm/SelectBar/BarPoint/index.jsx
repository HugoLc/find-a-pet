import React from 'react'
import styles from './BarPoint.module.scss'

const BarPoint = ({dataSet, handleClick, selected}) => {
    
  return (
    <div 
        className={`${styles.selectBarPoint} ${selected ? styles.selected : ''}`} 
        data-point-value={dataSet} 
        onClick={()=> handleClick(dataSet)}
    >
        
    </div>
  )
}

export default BarPoint
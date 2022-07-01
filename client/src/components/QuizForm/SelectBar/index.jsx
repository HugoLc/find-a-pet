import React from 'react'
import styles from './SelectBar.module.scss'
import BarPoint from './BarPoint'
import { useState } from 'react'

const SelectBar = ({min, max, onSelect}) => {
    let barPoints = []

    const [pointsStates, setPointsStates] = useState([false,false,false,false,false])
    
    const handleClick = (pointValue) => {
        let aux = [false,false,false,false,false];
        aux[pointValue -1] = true
        setPointsStates(aux)
    }


    for (let index = 0; index < 5; index++) {
        barPoints.push(<BarPoint dataSet={index + 1} handleClick={handleClick} selected={pointsStates[index]}/>)
    }
  return (
    <div className={styles.selectBarBar}>
        {barPoints}
    </div>
  )
}

export default SelectBar
import React from 'react'
import styles from './QuizCard.module.scss'

const QuizCard = ({children}) => {
  return (
    <div className={styles.quizCard}>
      {children}
    </div>
  )
}

export default QuizCard
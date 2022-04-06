import React from 'react'
import styles from './Country.module.css'
function Country({name, image,continent}) {
  
  return (
   <>
   <div className={styles.container}>
      <div className={styles.cards}>
        <div className={styles.div_img} style={{backgroundImage:`url(${image})`}}></div>
        <div className={styles.text}>
          <h3>{name}</h3>
        </div>
          <div className={styles.text2}>
            <h4>{continent}</h4>
            </div>
      </div>

    </div>
   
   </>
  )
}

export default Country
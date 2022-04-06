// page not found component
import React from 'react'
import styles from './Error.module.css'
import { Link } from 'react-router-dom'
function Error() {
  return (
    <div>
      <div className={styles.error_container}>
        <h1 className={styles.error_title}>Oops..! 404 Pagina No Encontrada</h1>
        <p className={styles.error_p}>Parece que ingresaste al lugar equivocado</p>
        <Link to="/"> 
        <button className={styles.btn_error}>Volver</button>
        </Link>
        
      </div>

    </div>
  )
}

export default Error
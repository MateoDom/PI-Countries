import React from 'react'
import styles from './Paginado.module.css'
const Paginado = ({countriesPerPage, allCountries,paginate}) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allCountries.length / countriesPerPage);
     i++) {
        pageNumbers.push(i);
        if(pageNumbers.length === 25){
            pageNumbers.push(26)
        }
     }

  return (
    <div>
       <ul className={styles.paginate}>
        {pageNumbers && pageNumbers.map(number => (
            <li key={number}>
                <a onClick={() => paginate(number)}>
                {number}
                </a>
            </li>
        ))}
       </ul>
    </div>
  )
}

export default Paginado
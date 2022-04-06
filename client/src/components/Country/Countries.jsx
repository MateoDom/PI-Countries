import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCountries, orderByName, orderByPopulation} from '../../store/action'
import styles from './Countries.module.css'
import Country from './Country'
import { Link } from 'react-router-dom'
import Paginado from '../Paginado/Paginado'
import Loading from './Loading'
import Filter from '../Filter/Filter'


const Countries = () => {
  let allCountries = useSelector((state)=> state.countries)
  let [pagina, setPagina] = useState(1)
  let [countriesPerPage, setCountriesPerPage] = useState(10)

 let activities = useSelector((state)=>state.activities)
  const indexOfLastCountry = pagina * countriesPerPage - 1; 
  const indexOfFirstCountry =
   pagina === 1
      ? indexOfLastCountry - (countriesPerPage - 1)
      : indexOfLastCountry - countriesPerPage;
  
      
  const currentCountries = allCountries.slice(indexOfFirstCountry , indexOfLastCountry)
  
  const paginate = (pageNumber) => setPagina(pageNumber)
  
  let countries = useSelector((state)=> state.allCountries)
  const [order, setOrder] = useState(0)
  let dispatch = useDispatch();

  useEffect(()=>{
    if(!countries.length){
      dispatch(fetchCountries())
    }
    if(activities.length){
      dispatch(fetchCountries())
    }

  }, [activities])



 


   

function clearAll(){
  dispatch(fetchCountries())
  setPagina(1)
  setOrder(0)
}
function handleSort(event){
    event.preventDefault();
    setPagina(1);
    setOrder(order+1);
    dispatch(orderByName(event.target.value))
  }
  function handleSortPopulation(event){
    event.preventDefault();
    setPagina(1);
    setOrder(order+1);
    dispatch(orderByPopulation(event.target.value))
  }


  return (
    <div>
      {
      !allCountries.length? <Loading /> :
      
      <div className={styles.flex_container}>
        <div className={styles.left_container}>

        <Filter setPagina={setPagina}countries={countries}/>
        <div className={styles.container}>
        <div>
            <h1>Ordenar:</h1>
        </div>
        <div className={styles.name}>
            <div>
            <h2>Nombre:</h2>
            <button value="AscName" className={styles.asc} onClick={handleSort}>Asc</button>
            <button value="DescName"className={styles.desc} onClick={handleSort}>Desc</button>
            </div>

        </div>
        <div className={styles.population}>
            <div>
            <h2>Poblacion:</h2>
            <button  value="AscPop" className={styles.asc} onClick={handleSortPopulation}>Asc</button>
            <button  value="DescPop" onClick={handleSortPopulation} className={styles.desc}>Desc</button>
            </div>
        </div>
    </div>
        <button className={styles.clear} onClick={clearAll} >Clear All</button>
        </div>
      <ul className={styles.grid}>  
      {       currentCountries.map(c => {
            return <Link to={`/paises/${c.id}`} className={styles.link}>
                      <Country key={c.id}name={c.name} image={c.flag} continent={c.continent}  />
                  </Link>
           
          })
        }
      </ul> 

     

        </div>
      }
      
      <div className={styles.paginado}>
        {<Paginado countriesPerPage={countriesPerPage} allCountries={allCountries} paginate={paginate} />}
      </div>
      </div>
  )
}

export default Countries
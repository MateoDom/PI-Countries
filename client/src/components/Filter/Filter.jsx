import React from 'react'
import styles from './Filter.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { filteredActivity, filteredCountries } from '../../store/action';
function Filter({setPagina,setOrder}) {
    const countries = useSelector((state)=>state.allCountries);
    const countrieswithActivities = countries.filter((country)=>country.activities.length > 0);
    let activities = [];
    countrieswithActivities.forEach((country)=>{
        activities.push(...country.activities)})

   console.log(activities)
    let dispatch = useDispatch();
    function filterContinent(e){
        e.preventDefault()
        dispatch(filteredCountries(e.target.value))
        setPagina(1)
    }
    function filterActivity(e){
        e.preventDefault()
        dispatch(filteredActivity(e.target.value))
        setPagina(1)
    }
  
  
  return (
    <div>
  
        <div className={styles.container}>
        <h1>Filtrar por:</h1>
        <div className={styles.continents}>
            <h2>Continentes: </h2> 
        <select className={styles.select}name="Filter" id="continent" onChange={filterContinent}> 
            <option value="All">Todos</option>
            <option value="Americas">America</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europa</option>
            <option value="Africa">Africa</option>
            <option value="Antarctic">Antartida</option>
            <option value="Oceania">Oceania</option>
        </select>
        </div>
        <div className={styles.activities}> 
        <h2>Actividades:</h2> 
        <select className={styles.select} name="Filter" id="activities" onChange={filterActivity}>
            <option value="Ninguna">Ninguna</option>
            {activities? activities.map(a =>{
                return <option value={a.name}>{a.name}</option>
            }): <option>No hay actividades</option>} 
        </select>
        </div>
        
        </div>
    </div>
  )
}

export default Filter
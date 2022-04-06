import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import styles from './CountryDetail.module.css'
import { countryById } from '../../store/action'
import { useEffect } from 'react'
import {useParams} from 'react-router'
import NavBar from '../NavBar/NavBar'
import Error from '../Error/Error'
import { useState } from 'react'
import Loading from './Loading'
function CountryDetail() {
    const [loading, setLoading] = useState(true)
    let {id} = useParams()
    let country = useSelector((state)=> state.country)
    let dispatch = useDispatch()
    useEffect(()=>{
        
       dispatch(countryById(id))
        setLoading(false)
    },[ dispatch, id])

    const {activities} = country
  return (
    loading ? <Loading/> :
    country && country.name? (
    <div>
    <NavBar />
    <div className={styles.countryDetail_container}>

    <div className={styles.country_container}>
        <div className={styles.img} style={{backgroundImage: `url(${country.flag})`}}></div>
        <div className={styles.text_container}>
         <h1>{country.name}</h1>
         <h2>{country.id}</h2>
         <h2>Capital: {country.capital}</h2>
         <h3>Continente: {country.continent}</h3>
         <h3>Subregion: {country.subregion}</h3>
         <h3>Poblacion: {country.population}</h3>
         <h3>Area: {country.area}</h3>
         <h3>Lenguajes: {country.languages}</h3>
        </div>
    </div>
    <div className={styles.activities_container}>

      <h1>Actividades: </h1>
      <div className={styles.activity_background}>
        {activities && activities.length? activities.map((activity)=>{
          return(
            <div className={styles.activity_detail}>    
          <h2>Nombre:     <span>{activity.name}</span></h2>
          <h2>Duracion en horas:   <span>{activity.duration}</span></h2>
          <h2>Dificultad: <span>{activity.difficulty}</span></h2>
          <h2>Temporada:  <span>{activity.season}</span></h2>

          </div> 
        )}): <h2 className={styles.no_act}>No hay actividades</h2>}
          </div>
        </div>
    </div>
    </div> 
  ): <Error />
  )
}

export default CountryDetail
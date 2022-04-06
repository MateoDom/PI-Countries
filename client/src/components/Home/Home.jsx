import React from 'react'
import style from './Home.module.css'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCountries } from '../../store/action'
function Home() {
  let countries = useSelector((state)=> state.allCountries)
  let dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchCountries())
  }, [])

  return (  
    <div className={style.container}>
        
        <div className={style.content}>
            <div className={style.text}>
            <ul className={style.list}>
                <li>Bienvenidos!</li>
                <li>Welcome!</li>
                <li>Willkommen!</li>
                <li>Bienvenue!</li>
                <li>Benvenuto!</li>
            </ul>
            </div>
            {countries.length ? 
            <button className={style.btn}><Link to="/paises">Click Here</Link></button>: null}
        </div>
    </div>
  )
}

export default Home
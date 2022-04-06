import React, { useEffect } from 'react'
import { useState,  } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountries, postActivity } from '../../store/action';
import NavBar from '../NavBar/NavBar';
import styles from './Activity.module.css';

function Activity() {
    
    let activities = [];
    
    let countries = useSelector(state => state.allCountries);
    const countrieswithActivities = countries.filter((country)=>country.activities.length > 0);
    countrieswithActivities.forEach((country)=>{
    activities.push(...country.activities)})
    console.log(activities)
    let dispatch =useDispatch();
    const [data, setData] = useState({
        name:"",
        difficulty:"",
        duration:"",
        season:"",
        country:"",
        countries:[]
    });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    
    
    
    
    
    useEffect(() => {
        dispatch(fetchCountries())
        }, [])
    const validate= (values) =>{
        let errors={};
        if(!values.name){
            errors.name="Nombre requerido";
        }
       
        if(values.name && values.name.trim().length===0){
            errors.name="Nombre requerido";
        }        
        // no se pueden repetir actividades
        if(values.name && activities.find(activity=>activity.name===values.name)){
            errors.name="Ya existe una actividad con ese nombre";
        }

        if(!values.duration){
            errors.duration="Duracion requerida X";
        } else if(isNaN(Number(values.duration))){
            errors.duration="Debe ser un numero X";
        }

        if(!values.difficulty){
            errors.difficulty="Dificultad requerida X";
        } else if(values.difficulty < 1 || values.difficulty > 5){
            errors.difficulty="Dificultad debe estar entre 1 y 5 X" ;
        } else if(isNaN(Number(values.difficulty))){
            errors.difficulty="Debe ser un numero X";
        }


        if(!values.season){
            errors.season="Temporada requerida";
        }

        if(values.season !== "Verano" && values.season !== "Otoño" && values.season !== "Invierno" && values.season !== "Primavera"){
            errors.season="Elegir Verano, Otoño, Invierno o Primavera X";
        }
        
        if(!values.country && values.countries[0] === ""){
            errors.country="Pais requerido";
            data.countries.shift()
        }

        if(values.country && values.country.trim().length===0){
            errors.country="Pais requerido";
            data.countries.shift()
        }

        if(values.country  && countries.find(country => country.name === values.country) ===undefined){
            errors.country="Pais no existe,revise la ortografía,la primera letra debe ser mayuscula";
            data.countries.shift()
        }

    


        if(values.countries.length > 1){
            for(let i = 0; i < values.countries.length; i++){
                for(let j = 0; j < values.countries.length; j++){
                    if(i !== j){
                        if(values.countries[i].toLowerCase() === values.countries[j].toLowerCase()){
                            errors.country="No puede haber dos paises iguales";
                            data.countries.shift()
                        }
                    }
                }
            }
        }
  


     
        return errors;
        }
        console.log(countries)
    function submit(e){
        e.preventDefault();
        setErrors(validate(data))
        setSubmitted(true);
    }
    function inputOnChange(event){
        const newData={...data};
        newData[event.target.id]=event.target.value;
        setData(newData);
       
    }
   
    function addCountries(e){
        e.preventDefault();
        const newData={...data};
        newData.countries.unshift(data.country);
        
        setData({...data, country:""})
        setErrors(validate(newData))
        console.log(newData)
    }
    function eliminarPaises(e){
        e.preventDefault();
        setData({...data, countries:[]})
    }


    useEffect(()=>{
        console.log(errors)
        if(Object.keys(errors).length===0 && submitted){
            dispatch(postActivity(data));
            setData({
                name:"",
                difficulty:"",
                    duration:"",
                    season:"",
                    country:"",
                    countries:[]})
           setSubmitted(false);
           alert("Actividad creada con exito")
        }
    },[errors])
  return (
    <div>
        <NavBar />
   

        <form className={styles.form_container} onSubmit={submit}>
            <div>
                <h1>Crear Actividad</h1>
            <label htmlFor="name">Nombre: </label>
            <input type="text" onChange={inputOnChange} value={data.name} id="name"placeholder='Nombre de la actividad:'/>
            <p>{errors.name}</p>
            </div>
            <div>
            <label htmlFor="difficulty">Dificultad: </label>
            <input type="number" onChange={inputOnChange} value={data.difficulty}  id="difficulty"placeholder='Dificultad:'/>
            </div>
            <p>{errors.difficulty}</p>
            <div>
                <label htmlFor="duration">Duracion en horas: </label>
            <input type="number" onChange={inputOnChange} value={data.duration} id="duration"placeholder='Duracion:'/>
            <p>{errors.duration}</p>
            </div>
            <div>
                <label htmlFor="season">Temporada: </label>
            <input type="text" onChange={inputOnChange} value={data.season} id="season"placeholder='Temporada:'/>
            <p>{errors.season}</p>
            </div>
            <div>
                <label htmlFor="country">Pais: </label>
            <input type="text" onChange={inputOnChange} value={data.country} id="country"placeholder='Pais:'/>
            <p>{errors.country}</p>
            </div>
            <button  className={styles.btn} onClick={addCountries}>Agregar Pais</button>
            <div className={styles.countries}><h3>Paises seleccionados: </h3>
            {data.countries.length? data.countries.map((country=>{
                return <p>{country}</p>
                })):<p>No hay paises seleccionados</p>}
            </div>
            <button className={styles.btn} onClick={eliminarPaises}>Eliminar paises</button>
            <button type="submit" className={styles.btn}>Enviar</button>
        </form>
       
    </div>
  )
}

export default Activity;
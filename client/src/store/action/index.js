import axios from 'axios';
export const FETCH_COUNTRIES = 'FETCH_COUNTRIES';
export const SEARCHS_COUNTRIES = 'SEARCH_COUNTRIES'
export const COUNTRY_BYID = 'COUNTRY_BYID';
export const FILTERED_COUNTRIES = 'FILTERED_COUNTRIES';
export const ORDERBY_NAME = 'ORDERBY_NAME'
export const POST_ACTIVITY = 'POST_ACTIVITY';
export const FILTERED_ACTIVITY= 'FILTERED_ACTIVITY';
export const ORDERBY_POPULATION= 'ORDERBY_POPULATION';
export function fetchCountries(){
    return async function(dispatch){
        try{
            const response = await axios.get('http://localhost:3001/countries');
            dispatch({
                type: FETCH_COUNTRIES,
                payload: response
            })
        }
        catch(err){
            console.log(err)
        }
    }
}
export function searchCountries(name){
    return async function(dispatch){
       await axios.get('http://localhost:3001/countries?name='+ name )
       .then(countries =>{
           dispatch({
               type: SEARCHS_COUNTRIES,
               payload: countries
           })
       })
       .catch(() => {
           alert("No existe dicho pais"); })
       
    }
}
export function countryById(id){
    return function(dispatch){
        axios.get('http://localhost:3001/countries/' + id)
        .then(country =>{
            dispatch({
                type:  COUNTRY_BYID,
                payload: country
            })
        })
    }
}
export function postActivity(data){
   return async function(dispatch){
        await axios.post('http://localhost:3001/activity',data)
         .then(() =>{
             dispatch({
                 type: POST_ACTIVITY,
                 payload: data
                })
              
         })
    }
}
export function filteredCountries(filter){
    return {
        type: FILTERED_COUNTRIES,
        payload: filter
    }
}
export function filteredActivity(filter){
    return {
        type: FILTERED_ACTIVITY,
        payload: filter
    }
}
export function orderByName(order){
    return {
        type: ORDERBY_NAME,
        payload: order
    }
}
export function orderByPopulation(order){
    return {
        type: ORDERBY_POPULATION,
        payload: order
    }
}


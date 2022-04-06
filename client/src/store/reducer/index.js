import { FETCH_COUNTRIES, SEARCHS_COUNTRIES, COUNTRY_BYID, FILTERED_COUNTRIES, ORDERBY_NAME, POST_ACTIVITY,FILTERED_ACTIVITY, ORDERBY_POPULATION} from "../action";

const initialState = {
    countries: [],
    allCountries: [],
    searchCountries: [],
    country: [],
    activities: [],
    
}

export default function reducer(state = initialState, action){

    switch(action.type){
        case FETCH_COUNTRIES: 
        return  {
            ...state,
            countries: action.payload.data,
            allCountries: action.payload.data}

        case SEARCHS_COUNTRIES:
            return {
                ...state,
                searchCountries: action.payload.data,
                countries: action.payload.data
            }
        case COUNTRY_BYID:
            return{
                ...state,
                country: action.payload.data
            }
        case FILTERED_COUNTRIES: {

            let getCountries;
            action.payload==="All"? getCountries=state.allCountries : getCountries= state.allCountries.filter(c=> c.continent === action.payload )
            return {
                ...state,
               countries:  getCountries
            }    
        }

        case FILTERED_ACTIVITY:{
            
            let getActivity 
            action.payload==="Ninguna"? getActivity= state.allCountries: getActivity=state.allCountries.filter((c)=> {
                return c.activities.filter(a=> a.name === action.payload).length > 0
            } )
            return{
                ...state,
                countries: getActivity
            }
        }
        case ORDERBY_NAME: {
            let orderCountries;
            action.payload === "AscName"?  orderCountries = state.countries.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)) : 
            orderCountries = state.countries.sort((a,b) => (b.name > a.name) ? 1 : ((a.name > b.name) ? -1 : 0)) 
            return {
                ...state,
                countries: orderCountries
            }
        }
        case ORDERBY_POPULATION: {
            let orderCountries;
            action.payload === "AscPop"?  orderCountries = state.countries.sort((a,b) => (a.population > b.population) ? 1 : ((b.population > a.population) ? -1 : 0)) :
            orderCountries = state.countries.sort((a,b) => (b.population > a.population) ? 1 : ((a.population > b.population) ? -1 : 0))
            return {
                ...state,
                countries: orderCountries
            }
        }
        
        case POST_ACTIVITY:{
         
            return{
                ...state,
                activities: state.activities.concat(action.payload)
               
            }
        }
        default: 
            return state;
    
            }
}
import { useState } from "react";
import {  useDispatch } from "react-redux";
import { searchCountries } from "../../store/action";
import styles from "./SearchBar.module.css";
import Loading from "../Country/Loading";
import { useSelector } from "react-redux";
export default function SearchBar(){
    const[search, setSearch] = useState('')
    let results = useSelector((state)=> state.searchCountries)
    let dispatch = useDispatch()

    function inputOnChange(e){
        setSearch(e.target.value)
        e.preventDefault()
    }
    function formOnSubmit(e){
        e.preventDefault()
        dispatch(searchCountries(search))
        setSearch('')
      
    }
 
    return(
        <>  
         
            <form className={styles.search} onSubmit={formOnSubmit}>
                <input className={styles.search_input} type="text" placeholder="Busca un país..." value={search} onChange={inputOnChange} />
                <input className={styles.search_submit}type="submit" value="Buscar" />
            </form>
            
            
        </>
    )
}
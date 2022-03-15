const { Router } = require('express');
const {Country, Activity} = require('../db')
const axios = require('axios')


const CountriesAPI = async ()=>{
    try{

        const allCountries = await axios.get("https://restcountries.com/v3/all")
        const countries = await allCountries.data.map((c)=>{
            return {
                name: c.name.common,
                id: c.cca3,
                flag: c.flags[0],
                continent: c.region,
                capital: !c.capital? c.capital = "": c.capital[0],
                subregion: c.subregion,
                area: c.area,
                population: c.population

            }
        })
        return countries;
    }
    catch(err){
        return err
    }
       
   
}


const router = Router();
router.get('/', (req, res, next)=>{
    res.send('get countries')

})
router.get('/:idPais', (req, res, next)=>{
    res.send('get countries id')

})
router.get('/', (req, res, next)=>{
    res.send('get countries')

})


module.exports = router;

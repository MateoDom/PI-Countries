const { Router } = require('express');
const {Country, Activity } = require('../db')
const Sequelize = require('sequelize')
const axios = require('axios')

const router = Router();

const CountriesAPI = async ()=>{
    try{
        const allCountries = await axios.get("https://restcountries.com/v3/all")
        const countries = await allCountries.data.map((c)=>{
            return {
                name: c.name.common,
                id: c.cca3,
                flag: c.flags[0],
                continent: c.region,
                capital: !c.capital? c.capital = "No tiene capital": c.capital[0],
                subregion: c.subregion,
                area: c.area,
                population: c.population,
              

            }
        })
        return countries;
    }
    catch(err){
        return err
    }
       
   
}



router.get('/', async (req, res, next)=>{
    const queryname = req.query.name
    try{

        const find = await Country.findAll({
            include: {
                model: Activity}
        })
        const countryDb = await CountriesAPI();
        if(!find.length){
            for(let i= 0; i< countryDb.length; i++){
                await Country.create(countryDb[i])
            }
          
}} 
   catch(err){
      return err} 
    
    
      try{

        if(queryname){
          const findByQuery = await Country.findAll({
              where: {
                  name:  {[Sequelize.Op.iLike]: `%${queryname}%`}
              }
          })
          if(findByQuery.length){
               res.status(200).send(findByQuery)
          } else {
              res.status(404).send("No existe dicho pais")
          }
      }
     
      else{
          const find = await Country.findAll({
              include: {
                  model: Activity}
          })
          res.status(200).send(find)
      }
    } catch(err){
        res.status(404).send(err)
    }

})
router.get('/:idPais', async (req, res, next)=>{
    const paisId = req.params.idPais
    const findById = await Country.findOne({
        where : {id : paisId},
        include : {model: Activity}
    })
   
    if(findById){
        res.status(200).send(findById)
    } else {
        res.status(404).send('Lo sentimos no encontramos ese pais')
    }
    
})



module.exports = router;

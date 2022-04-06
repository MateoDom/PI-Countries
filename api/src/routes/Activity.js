const { Router } = require('express');
const {Activity, Country} = require('../db')
const Sequelize = require('sequelize')

const router = Router();
router.post('/', async (req, res)=>{
    const {name, duration, difficulty, season, countries} = req.body
    const createActivity = await Activity.create({
        name: name, duration: duration, difficulty: difficulty, season: season
    })
    try {countries.forEach(async(country)=>{
        const countryActivity = await Country.findOne({
            where: {
                name: {[Sequelize.Op.iLike] : `${country}`}
            }
        })
  
            await createActivity.addCountry(countryActivity)
        })   
        

        res.send("Actividad creada exitosamente")
}
    catch(error){
    res.status(500).send("No pudimos crear la actividad")
  
    }
   
 

})



module.exports = router;

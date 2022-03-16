const { Router } = require('express');
const {Activity, Country} = require('../db')
const Sequelize = require('sequelize')

const router = Router();
router.post('/', async (req, res)=>{
    const {name, duration, difficulty, season, country} = req.body
    const createActivity = await Activity.create({
        name: name, duration: duration, difficulty: difficulty, season: season
    })

    const countryActivity = await Country.findOne({
        where: {
            name: {[Sequelize.Op.iLike] : `${country}`}
        }
    })
    if(countryActivity){
       await createActivity.addCountry(countryActivity)
       res.send("Actividad creada exitosamente")
    } else{
        res.send("Lo sentimos, no pudimos crear esa actividad")
    }
 

})



module.exports = router;

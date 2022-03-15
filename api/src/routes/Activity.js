const { Router } = require('express');
const {Activity} = require('../db')


const router = Router();
router.post('/', async (req, res)=>{
    const {name, duration, difficulty, season} = req.body
    const NewActivity = await Activity.create({
        name: name, duration: duration, difficulty: difficulty, season: season
    })
    res.send(NewActivity)

})



module.exports = router;

const router = require('express').Router();

router.get('/', async (req,res) => {
    try {
        res.render('home')
    } catch (err) {
        res.status(500).json(err)
    }
})



router.get('/sign-up', async (req,res) => { 
    try {
        res.render('sign-up')
    } catch (err) {
        console.error('Sequelize Error:', err.name);
        console.error('Error Details:', err);
        res.status(500).json(err);
    }
})
module.exports = router;
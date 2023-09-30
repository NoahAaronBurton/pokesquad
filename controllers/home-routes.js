const router = require('express').Router();
const withAuth = require('../utils/helpers/auth');
const {User} = require('../models/User');

router.get('/', withAuth, async (req,res) => {
    try {
        console.log('Logged in?:  ' + req.session.logged_in);
        res.render('home', {
            logged_in: req.session.logged_in,
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/login', async (req,res) => {
    try {
        //redirect to home if already logged in
        if(req.session.logged_in) {
            res.redirect('/');
            return;
        };

        res.render('login');

    } catch (err) {
        console.error('Sequelize Error:', err.name);
        console.error('Error Details:', err);
        res.status(500).json(err);
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
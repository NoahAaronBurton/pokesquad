const router = require('express').Router();
const withAuth = require('../utils/helpers/auth');
const { User } = require('../models');

async function fetchPokemonStats(pokemonNames) {
    const pokemonStats ={};

    await Promise.all(pokemonNames.map(async (pokemonName) => { // chat gpt helped with this function
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch data for ${pokemonName}`);
        }
        const data = await response.json();


        // get stats from api object
        const stats = data.stats;

        statObject= {};

        stats.forEach(stat => {
            statObject[stat.stat.name] = stat.base_stat;
        });

        statObject.spriteUrl = data.sprites.front_default;
        statObject.types = data.types.map(type => type.type.name);

        pokemonStats[pokemonName] = statObject;
    })) 
    return pokemonStats;
}


router.get('/', withAuth, async (req,res) => {
    try {
        const userId = req.session.user_id;
        // console.log('user id:  '+ userId);

        const user = await User.findByPk(userId);
        const username = user.username
        // console.log('Username:', username);

        // chatgpt wrote this line
        const squad = user.squad ? Object.values(user.squad) : [];

        console.log(squad);

        const pokemonStats = await fetchPokemonStats(squad);

        console.log(pokemonStats)

        res.render('home', {
            logged_in: req.session.logged_in,
            pokemonStats : pokemonStats
        })
    } catch (err) {
        console.error('Error in /login:', err);
        res.status(500).json({ error: "Internal Server Error" });
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
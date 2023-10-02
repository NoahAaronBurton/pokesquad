const router = require('express').Router();
const withAuth = require('../utils/helpers/auth');

const pokemonNames = ["pikachu", "charizard", "bulbasaur", "squirtle", "jigglypuff", "snorlax"]

async function fetchPokemonStats(pokemonNames) {

    // const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    
    const pokemonStats ={};

    // if (!response.ok) {
    //     throw new Error(`Failed to fetch data for ${pokemonName}`);
    // }

    await Promise.all(pokemonNames.map(async (pokemonName) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch data for ${pokemonName}`);
        }
        const data = await response.json();

        const stats = data.stats;
        const hp = stats.find(stat => stat.stat.name === "hp").base_stat

        //todo: add all stats available in poke api
        pokemonStats[pokemonName] = {
            "hp": hp
        };
    })) 
    return pokemonStats;
}


router.get('/', withAuth, async (req,res) => {
    try {
        console.log('Logged in?:  ' + req.session.logged_in);

        //todo: call pokemon stats function and send to front end
        const pokemonStats = await fetchPokemonStats(pokemonNames);

        console.log(pokemonStats)

        res.render('home', {
            logged_in: req.session.logged_in,
            pokemonStats : pokemonStats
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
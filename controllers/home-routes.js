const router = require('express').Router();
const withAuth = require('../utils/helpers/auth');

const pokemonNames = ["pikachu", "charizard", "bulbasaur", "squirtle", "jigglypuff", "snorlax"]

async function fetchPokemonStats(pokemonNames) {

    // const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    
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

        pokemonStats[pokemonName] = statObject;
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
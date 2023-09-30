const router = require('express').Router();
const { Pokemon } = require('../../models');
const Sequelize = require('sequelize');


router.get('/autocomplete', async (req, res) => {
    try {
        console.log('autocomplete GET route used');

        const userInput = req.query.q;

        const results = await Pokemon.findAll({
            attributes: ['name'], // Replace with the actual field you want to autocomplete
            where: {
              name: { // chat gpt helped with this block
                [Sequelize.Op.like]: `%${userInput}%`, // Case-insensitive search 
              },
            },
            limit: 10, // Limit the number of results
          });

        const autocompleteResults = results.map((pokemon) => pokemon.name);  

        res.json(autocompleteResults);
    } catch (err) {
        console.error('Error fetching autocomplete data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports = router;
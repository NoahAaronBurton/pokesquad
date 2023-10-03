const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    try {
        console.log('user POST route used')
        const newUserData = await User.create(req.body);
        req.session.save(() => {
            req.session.user_id = newUserData.id;
            req.session.logged_in = true;
            res.status(200).json(newUserData);
      })
} catch (err) {
    console.error('Sequelize Error:', err.name);
    console.error('Error Details:', err);
    res.status(500).json(err);
}
});

router.post('/login', async (req,res) => {
    try {
        console.log('Log in Post req received');

        const dbUser = await User.findOne({ where: {username: req.body.username} });
        if (!dbUser) {
            return res.status(400).json({ message : 'Incorrect username or password'})
        };

        const correctPassword = await dbUser.checkPassword(req.body.password);
        if (!correctPassword) {
            return res.status(400).json({ message: "Incorrect username or password"})
        }

        req.session.save(() => {
            req.session.user_id = dbUser.id;
            req.session.logged_in = true;
            res.json({ user: dbUser, message: 'Logged in'})
        })
    } catch (err) {
        console.error('Error in /login:', err);
        res.status(500).json({ error: "Internal Server Error" })
    }
});

router.post('/api/add-to-squad', async (req, res) => {
    try {
      const { pokemonName } = req.body; // Get the selected Pokémon's name from the request body
  
      // Find the user by their session or authentication method (you'll need to customize this based on your authentication setup)
      const userId = req.session.user_id; // Adjust this based on your session setup
      const user = await User.findByPk(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Add the selected Pokémon to the user's squad (assuming 'squad' is an array field in your User model)
      user.squad = user.squad || []; // Initialize the squad array if it doesn't exist
      user.squad.push(pokemonName);
  
      // Save the updated user object
      await user.save();
  
      // Respond with a success message or the updated user object if needed
      res.json({ success: true, message: 'Pokémon added to squad' });
    } catch (error) {
      console.error('Error adding Pokémon to squad:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });



module.exports = router;
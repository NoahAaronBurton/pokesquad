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
const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => { // todo: finish this route

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
})

module.exports = router;
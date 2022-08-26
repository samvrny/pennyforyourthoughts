const router = require('express').Router();
const { User } = require('../../models');

//get all users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//add get route for getting all users by id

router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    .then(dbUserData => res.json(dbUserData)) //will add session data here later
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;
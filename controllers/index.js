const router = require('express').Router();
const apiRoutes = require('./apiroutes');
const homeRoutes = require('./homepage-routes');
const dashboardRoutes = require('./dashboard-routes');

//export all routes in the controllers directory
router.use('/dashboard', dashboardRoutes);
router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;
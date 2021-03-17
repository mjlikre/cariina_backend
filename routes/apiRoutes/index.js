const router      = require('express').Router();
const authRoutes  = require('./authRoutes');
const passportService = require('./../../services/passport');
const authMiddleware = require('./../../middlewares/authMiddleware');
const formsRoutes = require("./formsRoute")
router.route('/test')
  .get((req, res) => {
    res.send({success: true});
  });
router.use('/auth', authRoutes);
router.use('/forms', formsRoutes);

module.exports = router;


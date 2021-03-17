const router = require('express').Router(); 
const passportService = require('./../../services/passport');
const formsController = require('./../../controllers/formsController.js');
const authMiddleware = require('./../../middlewares/authMiddleware');
const { body, validationResult } = require("express-validator")

// /api/auth/signup
router.route('/create')
  .post([authMiddleware.requireAuth, body("data").trim().escape()], formsController.createForm);

router.route('/getall')
  .get(authMiddleware.requireAuth, formsController.fetchAllForms);

router.route("/getform/:form_id")
    .get(formsController.fetchForm);

router.route("/fillform/:form_id")
    .post(body("data").trim().escape(), formsController.saveFormData);

router.route("/editform/:form_id")
    .post([authMiddleware.requireAuth, body("data").trim().escape()], formsController.editForm);

module.exports = router;


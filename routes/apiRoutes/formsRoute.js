const router = require("express").Router();
const passportService = require("./../../services/passport");
const formsController = require("./../../controllers/formsController.js");
const authMiddleware = require("./../../middlewares/authMiddleware");
const { body } = require("express-validator");

// /api/auth/signup
router
  .route("/create")
  .post(authMiddleware.checkAuth, formsController.createForm);

router
  .route("/get")
  .get(authMiddleware.checkAuth, formsController.fetchAllForms);

router.route("/get/:form_id").get(formsController.fetchForm);

router.route("/fill/:form_id").post(formsController.saveFormData);

router
  .route("/edit/:form_id")
  .post(authMiddleware.checkAuth, formsController.editForm);

router
  .route("/filled")
  .get(authMiddleware.checkAuth, formsController.filledForms);

router
  .route("/delete/:form_id")
  .get(authMiddleware.checkAuth, formsController.deleteForm);

module.exports = router;

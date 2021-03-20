const router = require("express").Router();
const authRoutes = require("./authRoutes");
const passportService = require("./../../services/passport");
const authMiddleware = require("./../../middlewares/authMiddleware");
const formsRoutes = require("./formsRoute");
router.route("/test").get(authMiddleware.checkAuth, (req, res) => {
  res.send({ success: true, authenticated: true });
});
router.use("/auth", authRoutes);
router.use("/forms", formsRoutes);

module.exports = router;

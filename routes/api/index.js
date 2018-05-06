const router = require("express").Router();
const articleRoute = require("./articles");

// Book routes
router.use("/articles", articleRoute);

module.exports = router;

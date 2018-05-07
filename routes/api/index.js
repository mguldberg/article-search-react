const router = require("express").Router();
const articleRoute = require("./articles");

// Article routes
router.use("/api/articles", articleRoute);

module.exports = router;

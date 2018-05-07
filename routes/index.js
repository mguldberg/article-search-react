const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");

console.log("in routes route on server side");
// API Routes
router.use(apiRoutes);

// If no API routes are hit, send the React app
router.use(function(req, res) {
  console.log("in default route handler");
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;

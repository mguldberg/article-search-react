const router = require("express").Router();
const articlesController = require("../../controllers/articlesController");

// Handle get of existing articles = /api/articles
router.route("/")
  .get(articlesController.findAll)
  .post(articlesController.create);

  //Get new Articles
router.route("/new")
  .get(articlesController.findNewArticles);
  
//Handle get, put, and delete for a particular article - could also call just .route("/:id")
router
  .route("/:id")
  // .get(articlesController.findById)
  .put(articlesController.update)
  .delete(articlesController.remove);

module.exports = router;

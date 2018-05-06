const router = require("express").Router();
const articlesController = require("../../controllers/articlesController");

// Handle get of existing articles - could also call just .route("/")
router.route("/api/articles")
  .get(articlesController.findAll)

//Handle get, put, and delete for a particular article - could also call just .route("/:id")
router
  .route("/api/articles/:id")
  .get(articlesController.findById)
  .put(articlesController.update)
  .delete(articlesController.remove);

//Get new Articles
router.route("/api/new_articles")
  .get(articlesController.findNewArticles)
  .post(articlesController.create);
  
module.exports = router;

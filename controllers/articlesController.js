const db = require("../models");

// Defining methods for the booksController
module.exports = {
  findNewArticles: function (req, res) {

    // SETUP VARIABLES
    // =========================================
    var authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

    // URL Base
    var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey;

    axios.get({
      baseURL: queryURLBase,
      params: {
        q: req.body.query,
        begin_date: req.body.fromDate,
        end_date: req.body.toDate,
      }
    })
      .then(dbModel => {

        // Logging to Console
        console.log("------------------");
        console.log(queryURL);
        console.log("------------------");
        console.log(NYTData);

        //return the data to REACT on the front end
        res.json(dbModel)
      })
      .catch(err => res.status(422).json(err));
  },
  findAll: function (req, res) {
    db.Article
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Article
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    db.Article
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Article
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Article
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};

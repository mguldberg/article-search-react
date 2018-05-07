const db = require("../models");
const axios = require("axios");

// Defining methods for the articlesController
module.exports = {
  findNewArticles: function (req, findNewArticlesResp) {

    console.log("inside find New Articles");
    console.log(req.query);
    // SETUP VARIABLES
    // =========================================
    const authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

    // URL Base
    let queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

    let beginDateVar = req.query.fromDate + "0101";
    let endDateVar = req.query.toDate + "1231";
    console.log(beginDateVar, endDateVar)

    axios.get(queryURLBase, {
      params: {
        'api-key': authKey,
        'q': req.query.search_topic,
        'begin_date': beginDateVar,
        'end_date': endDateVar,
      }
    })
      .then(NYTData => {

        // Need an object to return otherwise the res.json doesn't work ({ data: { response } })
        // Logging to Console
        console.log("------------------");
        console.log(NYTData.data.response)
        console.log("------------------");

        //return the data to REACT on the front end
        findNewArticlesResp.status(200).json(NYTData.data.response);

      })
      .catch(err => {
        console.log("in error handler");
        console.log(err)
        res.status(422).json(err)
      });
  },
  findAll: function (req, res) {
    console.log("inside FindAll");
    console.log("req.query", req.query);
    
    db.Article
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => {
        console.log("in .then of findAll", dbModel);
        res.json(dbModel)
      })
      .catch(err => {
        console.log(err)
        res.status(422).json(err);
      })
  },
  findById: function (req, res) {
    db.Article
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    console.log("inside of article add to the DB", req.body);
    db.Article
      .create(req.body)
      .then(dbModel => {
        console.log("SUCCESS ***********************");
        res.json(dbModel);
      })
      .catch(err => {
        console.log("FAIL ***********************");
        console.log(err);
        res.status(422).json(err)
      });
  },
  update: function (req, res) {
    db.Article
      .findOneAndUpdate({ _id: req.params.id }, { saved: true })
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

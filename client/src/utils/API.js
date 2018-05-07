import axios from "axios";

export default {
  // Gets articles - parameter passed is if they are saved or not
  getArticles: function (savedOrNot) {
    console.log("in API getArticles", savedOrNot);
    return axios.get("/api/articles/", {params: savedOrNot});
  },
  // // Gets the book with the given id
  // get: function(id) {
  //   return axios.get("/api/articles/" + id);
  // },
  // Deletes the article with the given id
  deleteArticle: function (id) {
    return axios.delete("/api/articles/" + id);
  },
  // Saves the article with the given id
  saveArticle: function (id) {
    console.log("in API to update article to saved");

    return axios.put("/api/articles/" + id);
  },
  //get new articles based on the search criteria from the NYT
  getNewArticles: function (searchRequestObj) {
    console.log("in API get New Articles");
    console.log(searchRequestObj);
    return axios.get("/api/articles/new", { params: searchRequestObj });
  },
  addArticle: function (articleObj) {
    console.log("in API to add article to DB");
    return axios.post("/api/articles/", articleObj ); 
  },
};


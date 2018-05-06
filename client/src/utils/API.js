import axios from "axios";

export default {
  // Gets all books
  getArticles: function() {
    return axios.get("/api/articles");
  },
  // // Gets the book with the given id
  // get: function(id) {
  //   return axios.get("/api/articles/" + id);
  // },
  // Deletes the book with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  }
};

import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import SaveBtn from "../../components/SaveBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";

class Articles extends Component {
  state = {
    articles: [],
    savedArticles: [],
    search_topic: "",
    fromDate: "",
    toDate: "",
  };

  componentDidMount() {
    this.loadSavedArticles();
    this.loadArticles();
  }

  loadArticles = () => {
    API.getArticles({ saved: false })
      .then(res => {
        console.log("get not-saved articles", res)
        this.setState({ articles: res.data, search_topic: "", fromDate: "", toDate: "" })
      })
      .catch(err => console.log(err));
  };

  loadSavedArticles = () => {
    API.getArticles({ saved: true })
      .then(res => {
        console.log("get Saved articles", res)
        this.setState({ savedArticles: res.data, search_topic: "", fromDate: "", toDate: "" })
      })
      .catch(err => console.log(err));
  };

  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => {
        this.loadArticles();
        this.loadSavedArticles();
      })
      .catch(err => console.log(err));
  };

  saveArticle = id => {
    API.saveArticle(id)
      .then(res => {
        this.loadArticles();
        this.loadSavedArticles();
      })
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log(this.state.articles);
    console.log("inside form handler");
    if (this.state.search_topic && this.state.fromDate) {
      API.getNewArticles({
        search_topic: this.state.search_topic,
        fromDate: this.state.fromDate,
        toDate: this.state.toDate
      })
        .then(res => {
          console.log("in .then of getNewArticles");
          console.log("NYT response", res.data.docs, 'length', res.data.docs.length);

          //create empty array holder...will be used to update the Article array in state
          let articleArrayVar = [];

          let FIVEARTICLESORLESS = 0;

          //limit results to 5
          if (res.data.docs.length >= 5) {
            FIVEARTICLESORLESS = 5;
          }
          else {
            FIVEARTICLESORLESS = res.data.docs.length;
          }

          //loop over the response from the NYT query and populate the DB and article array in state
          for (let i = 0; i < FIVEARTICLESORLESS; i++) {
            let articleArrayObjVar = {
              title: res.data.docs[i].headline.main,
              url: res.data.docs[i].web_url,
              date: res.data.docs[i].pub_date,
              saved: false
            };
            console.log(articleArrayObjVar);

            // create a new record of the found articles in DB and update state
            API.addArticle(articleArrayObjVar)
              .then(mongoRes => {
                articleArrayObjVar.key = mongoRes._id;
                articleArrayVar.push(articleArrayObjVar)
                return articleArrayVar;
              }).then(createResp => {
                console.log("in set state for new articles", i);

                if (i === (FIVEARTICLESORLESS - 1)) {
                  this.setState({ articles: createResp });
                  this.loadArticles();
                }
              })
          }
        })

        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>New York Times - Article Search</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.search_topic}
                onChange={this.handleInputChange}
                name="search_topic"
                placeholder="Article Search Topic (required)"
              />
              <Input
                value={this.state.fromDate}
                onChange={this.handleInputChange}
                name="fromDate"
                placeholder="Start Year (required)"
              />
              <Input
                value={this.state.toDate}
                onChange={this.handleInputChange}
                name="toDate"
                placeholder="End Year (Optional)"
              />
              <FormBtn
                disabled={!(this.state.search_topic && this.state.fromDate)}
                onClick={this.handleFormSubmit}
              >
                Article Search
              </FormBtn>
            </form>
            <Container>
              <Row >
                <Col size="sm-12">
                <h2 className="text-align-center">Saved Articles</h2>
                  {this.state.savedArticles.length ? (
                    <List>
                      {this.state.savedArticles.map(savedArticles => (
                        <ListItem key={savedArticles._id}>
                          <h3>{savedArticles.title}</h3>
                          <a href={savedArticles.url}>
                            <strong>{savedArticles.url}</strong>
                          </a>
                          <h4>{savedArticles.date}</h4>
                          <DeleteBtn onClick={() => this.deleteArticle(savedArticles._id)} />
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                      <h3>No Results to Display</h3>
                    )}
                </Col>
              </Row>
            </Container>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Articles Returned from NYT Search</h1>
            </Jumbotron>
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                    <h3>{article.title}</h3>
                    <a href={article.url}>
                      <strong>{article.url}</strong>
                    </a>
                    <h4>{article.date}</h4>
                    <SaveBtn onClick={() => this.saveArticle(article._id)} />
                    <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
                <h3>No Results to Display</h3>
              )}

          </Col>
        </Row>
      </Container>
    );
  }
}

export default Articles;

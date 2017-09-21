import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

class Articles extends Component {
  state = {
    articles: [],
    savedArticles: [],
    topic: "",
    startYear: "",
    endYear: "",
    dateSaved: ""
  };

  componentDidMount() {
    this.loadArticles();
  }

  loadArticles = () => {
    API.getArticles()
      .then(res =>
        this.setState({ articles: res.data, topic: "", startYear: "", endYear: "" })
      )
      .catch(err => console.log(err));
  };


  loadSavedArticles = () => {
      API.getArticles()
          .then(res =>
              this.setState({ articles: res.data })
          )
          .catch(err => console.log(err));
    };

  deleteArticles = id => {
    API.deleteArticle(id)
      .then(res => this.loadArticles())
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
    if (this.state.topic && this.state.startYear && this.state.endYear) {
      API.getArticles({
        title: this.state.topic,
        startYear: this.state.startYear,
        endYear: this.state.endYear
      })
        .then(res => this.loadArticles())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>

            <form>
              <Input
                value={this.state.topic}
                onChange={this.handleInputChange}
                name="topic"
                placeholder="Topic"
              />
              <Input
                value={this.state.startYear}
                onChange={this.handleInputChange}
                name="start-year"
                placeholder="Start Year"
              />
              <TextArea
                value={this.state.endYear}
                onChange={this.handleInputChange}
                name="end-year"
                placeholder="End Year"
              />
              <FormBtn
                disabled={!(this.state.startYear && this.state.endYear && this.state.endYear)}
                onClick={this.handleFormSubmit}
              >
                Search for Article
              </FormBtn>
            </form>

        </Row>

        <Row>
            {this.state.articles.length ? (
                <List>
                    {this.state.articles.map(article => (
                        <ListItem key={article._id}>
                            <strong>
                                {article.topic}
                            </strong>
                          {/*</Link>*/}
                          <DeleteBtn onClick={() => this.saveArticle()} />
                        </ListItem>
                    ))}
                </List>
            ) : (
                <h3>No Results to Display</h3>
            )}
        </Row>


        <Row>
            {this.state.articles.length ? (
                <List>
                    {this.state.articles.map(article => (
                        <ListItem key={article._id}>
                          <strong>
                              {article.topic}
                          </strong>
                            {/*</Link>*/}
                          <DeleteBtn onClick={() => this.deleteArticles(articl._id)} />
                        </ListItem>
                    ))}
                </List>
            ) : (
                <h3>No Results to Display</h3>
            )}
        </Row>
      </Container>
    );
  }
}

export default Articles;

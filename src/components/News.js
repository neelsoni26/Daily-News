import React, { Component } from "react";
import NewsItem from "./NewsItem";
import apiKey from "./APIkey.mjs"; //Add your api key in this file.
import Loading from "./loading";
import PropTypes from "prop-types";
export default class News extends Component {
  static defaultProps = {
    country: "in",
    category: "general",
    pageSize: 9,
  };

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number,
  };

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${apiKey}&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    //console.log(url);
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
    });
  }

  handlePrevClick = async () => {
    console.log("Previous");
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${this.props.category}&apiKey=${apiKey}&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    // console.log(url);
    this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      page: this.state.page - 1,
      articles: parseData.articles,
      loading: false,
    });
  };

  handleNextClick = async () => {
    // console.log("Next");
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${this.props.category}&apiKey=${apiKey}&page=${
      this.state.page + 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();
    // console.log(parseData);
    this.setState({
      page: this.state.page + 1,
      articles: parseData.articles,
      loading: false,
    });
  };

  render() {
    return (
      <>
        <div className="container my-3">
          <h1 className="text-center my-3">Top News Headlines</h1>
          {this.state.loading && <Loading />}
          <div className="row">
            {!this.state.loading &&
              this.state.articles.map((element) => {
                return (
                  <div className="col-lg-4 col-md-6" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title : ""}
                      description={
                        element.description ? element.description : ""
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                    />
                  </div>
                );
              })}
          </div>
          <div className="container d-flex justify-content-between">
            <button
              disabled={this.state.page <= 1 ? true : false}
              type="button"
              className="btn btn-primary"
              onClick={this.handlePrevClick}
            >
              &larr; Previous
            </button>
            <button
              disabled={
                this.state.page + 1 >
                Math.ceil(this.state.totalResults / this.props.pageSize)
                  ? true
                  : false
              }
              type="button"
              className="btn btn-primary"
              onClick={this.handleNextClick}
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </>
    );
  }
}

import React, { Component } from "react";
import NewsItem from "./NewsItem";
import apiKey from "./APIkey.mjs";

export default class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
    };
  }

  async componentDidMount() {
    let url =
      "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=" +
      apiKey;
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({ articles: parseData.articles });
  }

  render() {
    return (
      <>
        <div className="container my-3">
          <h1 className="my-3 mx-auto" style={{ width: "370px" }}>
            Top News Headlines
          </h1>
          <div className="row">
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

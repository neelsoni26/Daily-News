import React, { Component } from "react";
import imgUnavailable from "./img_not_available.png";

export default class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, date, author, source } =
      this.props;
    return (
      <>
        <div className="card my-3">
          <img
            src={imageUrl == null ? imgUnavailable : imageUrl}
            className="card-img-top"
            alt="News"
          />
          <div className="card-body">
            <span
              className="position-absolute top-0 translate-middle badge text-bg-secondary rounded-pill"
              style={{ left: "50%", ZIndex: 1 }}
            >
              {source}
            </span>
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
              <small className="text-muted">
                By {!author ? "Unknown" : author} on{" "}
                {new Date(date).toUTCString()}
              </small>
            </p>
            <p className="card-text">{description}</p>
            <a
              rel="noreferrer"
              href={newsUrl}
              target="_blank"
              className="btn-primary"
            >
              Read More
            </a>
          </div>
        </div>
      </>
    );
  }
}

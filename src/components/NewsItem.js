import React from 'react';

const NewsItem = (props) => {
  let { title, description, imageUrl, newsUrl, author, date, source } = props;
  
  return (
    <div className="card w-100 h-100 d-flex flex-column position-relative">
      <span className="position-absolute top-0 end-0 badge rounded-pill bg-danger" style={{ zIndex: "1" }}>
        {source}
      </span>
      <img src={imageUrl} className="card-img-top img-fluid" alt="..." />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{title}...</h5>
        <p className="card-text">{description}...</p>
        <p className='card-text mt-auto'>
          <small className="text-muted">
            By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}
          </small>
        </p>
        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
      </div>
    </div>
  );
};

export default NewsItem;

import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setpage] = useState(1);

  const capitalizeFirstLetter
    = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

  const updateNews = async () => {
    props.setProgress(15);
    setLoading(true); 
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;

    let data = await fetch(url);
    props.setProgress(35);
    let parsedData = await data.json();
    props.setProgress(75);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);

    props.setProgress(100);
  }
  useEffect(() => {
    updateNews();
    document.title = `PressPoint - ${capitalizeFirstLetter(props.category)}`;
    // eslint-disable-next-line
  }, [props.category])


  const fetchMoreData = async () => {
    const nextPage = page + 1;
    setpage(nextPage);

    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${nextPage}&pageSize=${props.pageSize}`;

    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles((prev) => prev.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };


  return (
    <div>

      <h1 className="text-center" style={{ margin: "20px " }}>PressPoint-Top Headlines from {capitalizeFirstLetter
        (props.category)}</h1>
      {loading && articles.length === 0 && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container ">
          <div className="row">

            {articles.map((element) => {
              return (<div className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch mb-4 " key={element.url}>
                <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://groups.google.com/group/digital-services-2024/attach/25a9aa043ccfb/6.jpg?part=0.1&view=1"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
              </div>);
            })}


          </div></div>
      </InfiniteScroll>

    </div>
  )
}


News.defaultProps = {
  country: 'us',
  pageSize: 8,
  category: 'business'
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string.isRequired,
  setProgress: PropTypes.func.isRequired
}

export default News;

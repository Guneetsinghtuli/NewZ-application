import React, { useState, useEffect, useCallback } from "react";
import Newsitem from "./Newsitem";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./Loader";

const News = (props) => {
  const [data, setData] = useState([]);
  const [currentPage, setPage] = useState(1);
  const [page, settotalPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const capitalise = (str) => {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
  };

  const { setProgress } = props
  const _setProgress = useCallback(
    (val) => {
      setProgress(val);
    },
    [setProgress]
  );
  
  const updateNews = useCallback(async () => {
    _setProgress(30);
    setLoading(true);
    const url = `https://newsapi.org/v2/top-headlines?q=${props.country}&apiKey=${props.apiKey}&page=1&pageSize=10&language=en&category=${props.category}`;
    const data = await fetch(url);
    const { status, code, articles, totalResults } = await data.json();
    if (status === "error") {
      console.log("[Network error] code:", code);
    } else {
      settotalPage(totalResults);
        _setProgress(70);

      setData(articles);
    }
    setLoading(false);
    _setProgress(100);
    document.title = `NewZ-${capitalise(props.category)}`;
  }, [props.country, props.category, _setProgress, props.apiKey]);

  useEffect(() => {
    updateNews();
  }, [updateNews]);
  // async componentDidMount() {

  // }

  const fetchMoreData = async () => {
    _setProgress(30);
    setLoading(false);
    const url = `https://newsapi.org/v2/top-headlines?q=${
      props.country
    }&apiKey=${props.apiKey}&page=${
      currentPage + 1
    }&pageSize=10&language=en&category=${props.category}`;

    let newdata = await fetch(url);
    const { status, code, articles } = await newdata.json();
    if (status === "error") {
      console.log("[Network error] code:", code);
    } else {
      _setProgress(70);
      setData(data.concat(articles));
      setPage(currentPage + 1);
    }
    setLoading(false);
    _setProgress(100);
  };

  return (
    <>
      <div className="container" style={{ marginTop: "100px" }}>
        <h1>Trending News</h1>
        {loading && <Loader />}
        <InfiniteScroll
          dataLength={data.length - 1}
          next={fetchMoreData}
          hasMore={data.length > page}
          loader={<Loader />}
        >
          <div className="row my-3">
            {data.map((da) => {
              return (
                <div className="col-md-4 my-3 " key={da.url}>
                  <Newsitem
                    title={da.title}
                    content={da.description}
                    img={da.urlToImage}
                    url={da.url}
                    author={da.author}
                    time={da.publishedAt}
                    source={da.source.name}
                  />
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
};

News.protoype = {
  country: PropTypes.string,
  category: PropTypes.string,
};

export default News;

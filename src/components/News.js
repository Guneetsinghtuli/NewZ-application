import React, { useState, useEffect, useCallback } from "react";
import Newsitem from "./Newsitem";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./Loader";
import { API_KEY, BASE_API_URL } from "../constants";
import { capitalize } from "../utils";

const News = React.memo((props) => {
    const { setProgress, country, category } = props;
    const [news, setNews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const _setProgress = useCallback((val) => setProgress(val), [setProgress]),
        incrementCurrentPage = useCallback(
            () => setCurrentPage((prev) => prev + 1),
            []
        ),
        getNews = useCallback(async () => {
            _setProgress(30);
            const url = `${BASE_API_URL}?q=${country}&apiKey=${API_KEY}&page=${currentPage}&pageSize=10&language=en&category=${category}`;
            const data = await fetch(url);
            const { status, code, articles, totalResults } = await data.json();
            if (status === "error") {
                console.log("[Network error] code:", code);
            } else {
                _setProgress(70);
                setTotalPages(totalResults);
                setNews((prev) => prev.concat(articles));
            }
            _setProgress(100);
            document.title = `NewZ-${capitalize(category)}`;
        }, [country, currentPage, category, _setProgress]);

    useEffect(() => {
        getNews();
    }, [getNews]);

    return (
        <>
            <div className="container" style={{ marginTop: "100px" }}>
                <h1>Trending News</h1>
                <InfiniteScroll
                    dataLength={news.length - 1}
                    next={incrementCurrentPage}
                    hasMore={news.length < totalPages}
                    loader={<Loader />}
                >
                    <div className="row my-3">
                        {news.map(
                            (
                                {
                                    title,
                                    description,
                                    urlToImage,
                                    url,
                                    author,
                                    publishedAt,
                                    source: { name },
                                },
                                index
                            ) => {
                                return (
                                    <div
                                        className="col-md-4 my-3 "
                                        key={index.toString()}
                                    >
                                        <Newsitem
                                            title={title}
                                            content={description}
                                            img={urlToImage}
                                            url={url}
                                            author={author}
                                            time={publishedAt}
                                            source={name}
                                        />
                                    </div>
                                );
                            }
                        )}
                    </div>
                </InfiniteScroll>
            </div>
        </>
    );
});

News.protoype = {
    country: PropTypes.string,
    category: PropTypes.string,
};

export default News;

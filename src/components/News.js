import React, { Component } from 'react'
import Newsitem from './Newsitem'
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component'

export class News extends Component {

    constructor() {
        super()
        this.state = {
            data: [],
            currentPage: 1,
            loading: true,
        }
    }
    capitalise = (str)=>{
        return (str.slice(0,1)).toUpperCase() + str.slice(1)
    }
    async componentDidMount() {
        this.props.setProgress(30)
        this.setState({ loading: true })
        const url = `https://newsapi.org/v2/top-headlines?q=${this.props.country}&apiKey=${this.props.apiKey}&page=1&pageSize=10&language=en&category=${this.props.category}`;
        const data = await fetch(url);
        const { articles, totalResults } = await data.json();
        this.props.setProgress(70)
        this.setState({
            data: articles,
            page: totalResults,
            loading: false,
        })
        this.props.setProgress(100)
        document.title= `NewZ-${this.capitalise(this.props.category)}`
    }

    fetchMoreData = async() => {
        this.props.setProgress(30)
        this.setState({ loading: false })
        const url = `https://newsapi.org/v2/top-headlines?q=${this.props.country}&apiKey=${this.props.apiKey}&page=${this.state.currentPage + 1}&pageSize=10&language=en&category=${this.props.category}`;
        let data = await fetch(url);
        let parsedData = await data.json()
        this.props.setProgress(70)
        this.setState({
            data: this.state.data.concat(parsedData.articles),
            currentPage: this.state.currentPage + 1,
            loading: false
        })
        this.props.setProgress(100);
        
    };



    render() {
        return (
            <>
                <div className="container" style={{marginTop:'100px'}}>
                    <h1>Trending News</h1>

                    
                    <InfiniteScroll
                    dataLength={this.state.data.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.data.length !== this.state.page}
                    loader={<div className=" container my-4 d-flex justify-content-center">
                        <div className="spinner-border text-secondary" style={{ width: '3rem', height: '3rem' }} role="status">
                            <span className="sr-only"></span>
                        </div>
                    </div>}
                    >
                    <div className="row my-3">
                    {this.state.data.map((da) => {
                            return (
                                <div className="col-md-4 my-3 " key={da.url}>
                                    <Newsitem title={da.title} content={da.description} img={da.urlToImage} url={da.url} author={da.author} time={da.publishedAt} source={da.source.name} />
                                </div>
                            )
                        })}
                        </div>
                </InfiniteScroll>


                </div>
            </>

        )
    }
}


News.protoype = {
    country: PropTypes.string,
    category: PropTypes.string,
}

export default News

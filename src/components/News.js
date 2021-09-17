import React, { Component } from 'react'
import Newsitem from './Newsitem'
import PropTypes from 'prop-types';

export class News extends Component {

    constructor() {
        super()
        console.log("I am constructor");
        this.state = {
            data: [],
            currentPage: 1,
            loading: true,
        }
    }
    async componentDidMount() {
        this.setState({ loading: true })
        console.log(this.state.loading)
        const url = `https://newsapi.org/v2/top-headlines?q=${this.props.country}&apiKey=9e413e78e02d4317abb174f503a09325&page=1&pageSize=10&language=en&category=${this.props.category}`;
        const data = await fetch(url);
        const { articles, totalResults } = await data.json();
        const a = Math.ceil(totalResults/10)
        console.log("total page" +a)
        this.setState({
            data: articles,
            page: a,
            currentPage: 1,
            loading: false,
        })
    }

    increase = async () => {
        console.log("inc")
        this.setState({ loading: true });
        const url = `https://newsapi.org/v2/top-headlines?q=${this.props.country}&apikey=9e413e78e02d4317abb174f503a09325&page=${this.state.currentPage + 1}&pageSize=10&language=en&category=${this.props.category}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            data: parsedData.articles,
            loading: false,
            currentPage : this.state.currentPage + 1
        });
    }





    decrease = async() => {
        console.log("desc")
        this.setState({ loading: true });
        const url = `https://newsapi.org/v2/top-headlines?q=${this.props.country}&category=${this.props.category}&apikey=9e413e78e02d4317abb174f503a09325&page=${this.state.currentPage - 1}&pageSize=10`;
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            data: parsedData.articles,
            loading: false,
            currentPage: this.state.currentPage -1,
        })
    }



    render() {
        return (
            <>
                { this.state.loading ?
                    <div className=" container my-4 d-flex justify-content-center">
                        <div className="spinner-border text-secondary" style={{ width: '3rem', height: '3rem' }} role="status">
                            <span className="sr-only"></span>
                        </div>
                    </div>
                    :
                    <div className="container my-4">
                        <h1>Trending News</h1>
                        <div className="row my-3">
                            {this.state.data.map((da) => {
                                return (
                                    <div className="col-md-4 my-3 " key={da.url}>
                                        <Newsitem title={da.title} content={da.description} img={da.urlToImage} url={da.url} author={da.author} time={da.publishedAt} source={da.source.name} />
                                    </div>
                                )
                            })}
                        </div>
                        <div className="d-flex justify-content-between">
                            <button type="button" onClick={this.decrease} className={`btn ${1 === this.state.currentPage ? "disabled" : ""}  btn-dark`}> &larr; Back</button>
                            <button type="button" onClick={this.increase} className={`btn ${this.state.page > this.state.currentPage ? "" : "disabled"} btn-dark`}>Next &rarr;</button>
                        </div>
                    </div>
                }
            </>

        )
    }
}


News.protoype = {
    country: PropTypes.string,
    category: PropTypes.string,
}

export default News

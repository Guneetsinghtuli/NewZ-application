import React, { Component } from 'react'

export class Newsitem extends Component {



    render() {

        const { title, img, content, url, author, time,source } = this.props;
        let date = new Date(time)
        return (
            <div>
                <div className="card">
                    <span className="position-absolute top-0 translate-middle badge rounded-pill bg-info text-dark" style={{zIndex:'1',left:'86%'}}>
                        {source}
                    <span className="visually-hidden">unread messages</span>
                    </span>
                    <img src={img} className="card-img-top" alt="..." />
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">By {author ? author : "Unknown"} </li>
                        <li className="list-group-item">On: {time ? date.toLocaleDateString() : "Unknown"} </li>
                    </ul>
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{content}</p>

                        <a href={url} className="btn btn-sm btn-dark">Read More</a>
                    </div>

                </div>
            </div>
        )
    }
}

export default Newsitem

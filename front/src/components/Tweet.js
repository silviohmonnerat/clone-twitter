import React, { Component } from 'react'
import Api from '../services/api'

import "./Tweet.css"
import iconLinke from '../like.svg'

class Tweet extends Component {
    constructor() {
        super()

        this.handleLike = this.handleLike.bind(this)
    }

    handleLike = async () => {
        const { _id } = this.props.tweet

        await Api.post(`likes/${_id}`)
    }

    render() {
        const { tweet } = this.props
        return (
            <li className="tweet">
                <strong>{tweet.author}</strong>
                <p>{tweet.content}</p>
                <button type="button" onClick={this.handleLike}>
                    <img src={iconLinke} alt="Curtir" />
                    {tweet.likes}
                </button>
            </li>
        );
    }
}

export default Tweet;

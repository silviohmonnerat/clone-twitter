import React, { Component } from 'react'
import Api from '../services/api'
import socket from 'socket.io-client'

import logoTwitter from '../twitter.svg'
import './Timeline.css'

import Tweet from '../components/Tweet'

class Timeline extends Component {
    constructor() {
        super()

        this.state = {
            tweets: [],
            newTweet: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleNewTweet = this.handleNewTweet.bind(this)
    }

    async componentDidMount() {
        this.subscribeToEvents()
        
        const response = await Api.get("tweets")

        this.setState({
            tweets: response.data
        })
    }

    subscribeToEvents = () => {
        const io = socket("http://localhost:3000")

        io.on("tweet", data => {
            this.setState({
                tweets: [data, ...this.state.tweets]
            })
        })

        io.on("like", data => {
            this.setState({
                tweets: this.state.tweets.map(tweet => (
                    tweet._id === data._id ? data : tweet
                ))
            })
        })
    }

    handleNewTweet = async event => {
        if (event.keyCode !== 13) {
            return
        }

        const content = this.state.newTweet
        const author = localStorage.getItem("@GoTwitter:username")

        await Api.post(
            "tweets", 
            {
                content, 
                author
            }
        )

        this.setState({
            newTweet: ""
        })
    }

    handleInputChange = event => {
        this.setState({
            newTweet: event.target.value
        })
    }

    render() {
        return (
            <div className="timeline-wrapper">
                <img height={24} src={logoTwitter} alt="GoTwitter" />
                <form onSubmit={this.handleSubmit}>
                    <textarea
                            value={this.state.newTweet}
                            onChange={this.handleInputChange}
                            onKeyDown={this.handleNewTweet}
                            placeholder="O que está acontecendo?"
                    />
                </form>
                <ul className="tweet-list">
                    { this.state.tweets.map(tweet => (
                        <Tweet key={tweet._id} tweet={tweet} />
                    ))}
                </ul>
            </div>
        )
    }
}

export default Timeline

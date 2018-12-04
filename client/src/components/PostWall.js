import React, { Component } from 'react';
import axios from 'axios';
//import { Card, CardHeader, CardMedia } from '@material-ui/core';
import styles from '../styles/RedditCard.scss';

const RedditCardImg = (props) => {
    const fullPermaLink = `https://reddit.com${props.permalink}`;
    const testImg = `https://images.pexels.com/photos/20787/pexels-photo.jpg`;
    return(
        <div className="reddit_card">
            <h3>{props.title}</h3> 
            <a style={{margin: 0}} href={props.url}><img src={props.url} /></a>
            <div className="reddit_card_content">
                <p>{props.author}</p>
                <p>{props.subreddit}</p>
                <a href= {fullPermaLink}>comment</a>
            </div>
        </div>
    )
}

const RedditCardGif = props => {
    return (
        <div className="reddit_card">
            <h3>{props.title}</h3> 
            <video preload="auto" autoPlay="autoplay" loop="loop" className="video">
                <source src={mediaUrl} type="video/mp4"/>
            </video>
            <div className="reddit_card_content">
                <p>{props.author}</p>
                <p>{props.subreddit}</p>
                <a href= {fullPermaLink}>comment</a>
            </div>
        </div>
    )
}

const RedditCardGfycat = props => {
    const fullPermaLink = `https://reddit.com${props.permalink}`;
    const samplegfyCat = "https://gfycat.com/BountifulWearyBluefintuna";
    const gfycat = `${props.url}`;
    var gfycatLink = `${gfycat.slice(0, 19)}ifr/${gfycat.slice(19)}?autoplay=0`;
    return (
        <div className="reddit_card">
            <h3>{props.title}</h3> 
            {/* Responsive iframe for gfycat */}
            <div style={{position:'relative', paddingBottom:'70.80%'}}>
                <iframe src={gfycatLink}
                    frameBorder='0' 
                    scrolling='no' 
                    width='100%' 
                    height='100%' 
                    style={{position:'absolute', top:'0', left:'0'}}
                    allowFullScreen>
                </iframe>
            </div>
            <div className="reddit_card_content">
                <p>{props.author}</p>
                <p>{props.subreddit}</p>
                <a href= {fullPermaLink}>comment</a>
            </div>
        </div>
    )
}

const RedditCardLink = props => {
    return (
        <div>
        </div>
    )
}

const RedditCardDefault = props => {
    return (
        <div>
        </div>
    )
}


class PostWall extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postArray: [],
            postTitle: "",
            op: "",
            img: null
        }
    }
    
    componentDidMount() {
        axios.get('http://localhost:5000/reddit')
          .then((res) => {
              this.setState({ 
                  postArray: res.data
              },() => console.log(this.state.postArray))
          })
          .catch((err) => console.log(err));
    }

    render() {
        return(
            <div>
                {this.state.postArray.map((post, index) => {
                    let card;
                    if (post.domain === 'gfycat.com') {
                        card = <RedditCardGfycat title={post.title} author={post.author} subreddit={post.subreddit} permalink={post.permaLink} url={post.url}/>
                    } else {
                        card = <RedditCardImg title={post.title} author={post.author} subreddit={post.subreddit} permalink={post.permaLink} url={post.url}/>
                    }
                    return (
                        <div key={index}>
                            {card}
                        </div>
                    )
                })}     
            </div>
        )
    };
};
export default PostWall;